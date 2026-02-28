"""Helpers for executing SQL via Databricks Statement Execution API."""

from __future__ import annotations

import re
from typing import Any

from databricks.sdk.service.sql import Format


def _to_snake_case(name: str) -> str:
    """Convert CamelCase or mixed case to snake_case."""
    s1 = re.sub("(.)([A-Z][a-z]+)", r"\1_\2", name)
    return re.sub("([a-z0-9])([A-Z])", r"\1_\2", s1).lower()


def parse_sql_result_to_dicts(
    result: Any,
    manifest: Any,
) -> list[dict[str, Any]]:
    """Parse StatementExecution result into list of dicts with snake_case keys.

    Result format is JSON_ARRAY: list of rows, each row is list of values.
    Manifest has schema.columns with name for each column.
    """
    if not result or not hasattr(result, "data_array") or not result.data_array:
        return []

    columns = []
    if manifest and hasattr(manifest, "schema") and manifest.schema:
        cols = getattr(manifest.schema, "columns", None) or []
        columns = [_to_snake_case(getattr(c, "name", "") or "") for c in cols]

    if not columns:
        return []

    rows: list[dict[str, Any]] = []
    for row_values in result.data_array:
        row_dict: dict[str, Any] = {}
        for i, col_name in enumerate(columns):
            if i < len(row_values):
                val = row_values[i]
                if val is not None and val != "null":
                    try:
                        if isinstance(val, str) and val.lstrip("-").replace(".", "").isdigit():
                            row_dict[col_name] = float(val) if "." in val else int(val)
                        else:
                            row_dict[col_name] = val
                    except (ValueError, TypeError):
                        row_dict[col_name] = val
                else:
                    row_dict[col_name] = None
            else:
                row_dict[col_name] = None
        rows.append(row_dict)

    return rows


def run_sql(
    sql: Any,
    statement: str,
    wait_timeout: str = "30s",
) -> tuple[list[dict[str, Any]], Any]:
    """Execute SQL via Sql dependency and return parsed rows plus raw response."""
    if not sql.config.warehouse_id:
        raise ValueError(
            "DATABRICKS_SQL_WAREHOUSE_ID is not set. Configure a SQL warehouse in app.yaml env."
        )
    resp = sql.execute_statement(
        statement=statement,
        format=Format.JSON_ARRAY,
        wait_timeout=wait_timeout,
    )

    if not resp.status or getattr(resp.status, "state", None) != "SUCCEEDED":
        state = getattr(resp.status, "state", "UNKNOWN")
        err = getattr(resp.status, "error", None)
        msg = str(err) if err else f"SQL execution failed with state: {state}"
        raise RuntimeError(msg)

    result = getattr(resp, "result", None)
    manifest = getattr(resp, "manifest", None)
    rows = parse_sql_result_to_dicts(result, manifest)
    return rows, resp
