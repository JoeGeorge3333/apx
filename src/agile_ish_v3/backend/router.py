from databricks.sdk.service.iam import User as UserOut

from .core import Dependencies, create_router
from .models import (
    ElectricalFaultOut,
    NasaEquipmentOut,
    PredictiveMaintenanceSummaryOut,
    TransformerReadingOut,
    VersionOut,
)
from .sql_helpers import run_sql

router = create_router()


@router.get("/version", response_model=VersionOut, operation_id="version")
async def version():
    return VersionOut.from_metadata()


@router.get("/current-user", response_model=UserOut, operation_id="currentUser")
def me(user_ws: Dependencies.UserClient):
    return user_ws.current_user.me()


# --- Predictive Maintenance ---


def _nasa_table(config: Dependencies.Config) -> str:
    cat = config.predictive_maintenance_catalog
    schema = config.predictive_maintenance_schema
    tbl = config.nasa_table
    return f"{cat}.{schema}.{tbl}"


def _transformer_table(config: Dependencies.Config) -> str:
    cat = config.predictive_maintenance_catalog
    schema = config.predictive_maintenance_schema
    tbl = config.transformer_table
    return f"{cat}.{schema}.{tbl}"


def _electrical_fault_table(config: Dependencies.Config) -> str:
    cat = config.predictive_maintenance_catalog
    schema = config.predictive_maintenance_schema
    tbl = config.electrical_fault_table
    return f"{cat}.{schema}.{tbl}"


@router.get(
    "/nasa-equipment",
    response_model=list[NasaEquipmentOut],
    operation_id="listNasaEquipment",
)
def list_nasa_equipment(
    sql: Dependencies.Sql,
    config: Dependencies.Config,
    equipment_id: int | None = None,
    limit: int = 100,
):
    """List NASA equipment degradation data with optional equipment filter."""
    table = _nasa_table(config)
    where = f"WHERE id = {equipment_id}" if equipment_id is not None else ""
    query = f"SELECT * FROM {table} {where} ORDER BY id, cycle LIMIT {limit}"
    rows, _ = run_sql(sql, query)
    return [NasaEquipmentOut.model_validate(r) for r in rows]


@router.get(
    "/transformer-readings",
    response_model=list[TransformerReadingOut],
    operation_id="listTransformerReadings",
)
def list_transformer_readings(
    sql: Dependencies.Sql,
    config: Dependencies.Config,
    limit: int = 100,
):
    """List transformer validation readings (temperature, voltage, current)."""
    table = _transformer_table(config)
    query = f"SELECT * FROM {table} ORDER BY DeviceTimeStamp DESC LIMIT {limit}"
    rows, _ = run_sql(sql, query)
    return [TransformerReadingOut.model_validate(r) for r in rows]


@router.get(
    "/electrical-faults",
    response_model=list[ElectricalFaultOut],
    operation_id="listElectricalFaults",
)
def list_electrical_faults(
    sql: Dependencies.Sql,
    config: Dependencies.Config,
    fault_type: str | None = None,
    limit: int = 100,
):
    """List electrical fault data. fault_type: ground, a, b, or c."""
    table = _electrical_fault_table(config)
    where = ""
    if fault_type == "ground":
        where = "WHERE G = 1"
    elif fault_type == "a":
        where = "WHERE A = 1"
    elif fault_type == "b":
        where = "WHERE B = 1"
    elif fault_type == "c":
        where = "WHERE C = 1"
    query = f"SELECT * FROM {table} {where} ORDER BY 1 LIMIT {limit}"
    rows, _ = run_sql(sql, query)
    return [ElectricalFaultOut.model_validate(r) for r in rows]


@router.get(
    "/predictive-maintenance-summary",
    response_model=PredictiveMaintenanceSummaryOut,
    operation_id="getPredictiveMaintenanceSummary",
)
def get_predictive_maintenance_summary(
    sql: Dependencies.Sql,
    config: Dependencies.Config,
):
    """Get dashboard summary counts for all predictive maintenance tables."""
    nasa_t = _nasa_table(config)
    trans_t = _transformer_table(config)
    fault_t = _electrical_fault_table(config)

    nasa_rows, _ = run_sql(
        sql,
        f"SELECT COUNT(*) as cnt, COUNT(DISTINCT id) as units FROM {nasa_t}",
    )
    trans_rows, _ = run_sql(sql, f"SELECT COUNT(*) as cnt FROM {trans_t}")
    fault_rows, _ = run_sql(
        sql,
        f"SELECT COUNT(*) as cnt, SUM(G) as g, SUM(A) as a, SUM(B) as b, SUM(C) as c FROM {fault_t}",
    )

    nasa_cnt = nasa_rows[0].get("cnt", 0) or 0 if nasa_rows else 0
    nasa_units = nasa_rows[0].get("units", 0) or 0 if nasa_rows else 0
    trans_cnt = trans_rows[0].get("cnt", 0) or 0 if trans_rows else 0
    fault_cnt = fault_rows[0].get("cnt", 0) or 0 if fault_rows else 0
    g_cnt = fault_rows[0].get("g", 0) or 0 if fault_rows else 0
    a_cnt = fault_rows[0].get("a", 0) or 0 if fault_rows else 0
    b_cnt = fault_rows[0].get("b", 0) or 0 if fault_rows else 0
    c_cnt = fault_rows[0].get("c", 0) or 0 if fault_rows else 0

    return PredictiveMaintenanceSummaryOut(
        nasa_row_count=int(nasa_cnt),
        nasa_unique_units=int(nasa_units),
        transformer_row_count=int(trans_cnt),
        electrical_fault_row_count=int(fault_cnt),
        ground_fault_count=int(g_cnt),
        a_phase_fault_count=int(a_cnt),
        b_phase_fault_count=int(b_cnt),
        c_phase_fault_count=int(c_cnt),
    )
