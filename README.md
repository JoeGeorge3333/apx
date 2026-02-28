# agile-ish-v3 ✨

> A modern full-stack application built with [`apx`](https://github.com/databricks-solutions/apx) 🚀

## 🛠️ Tech Stack

This application leverages a powerful, modern tech stack:

- **Backend** 🐍 Python + [FastAPI](https://fastapi.tiangolo.com/)
- **Frontend** ⚛️ React + [shadcn/ui](https://ui.shadcn.com/)
- **API Client** 🔄 Auto-generated TypeScript client from OpenAPI schema

## 🚀 Quick Start

### Development Mode

Start all development servers (backend, frontend, and OpenAPI watcher) in detached mode:

```bash
apx dev start
```

This will start an apx development server, which in it's turn runs backend, frontend and OpenAPI watcher.
All servers run in the background, with logs kept in-memory of the apx dev server.

### 📊 Monitoring & Logs

```bash
# View all logs
apx dev logs

# Stream logs in real-time
apx dev logs -f

# Check server status
apx dev status

# Stop all servers
apx dev stop
```

## ✅ Code Quality

Run type checking and linting for both TypeScript and Python:

```bash
apx dev check
```

## 📦 Build

Create a production-ready build:

```bash
apx build
```

## 🚢 Deployment

Deploy to Databricks:

```bash
databricks bundle deploy -p <your-profile>
```

## 📈 Predictive Maintenance & Asset Management

This app includes a **Predictive Maintenance** dashboard that reads from Unity Catalog tables:

1. **NASA Train/Test** – Equipment degradation (id, cycle, sensors, remaining useful life)
2. **Transformer Validation** – Temperature, voltage, current readings
3. **Electrical Fault Validation** – Ground/phase fault indicators

### Setup

1. **SQL Warehouse** – Set `DATABRICKS_SQL_WAREHOUSE_ID` in `app.yaml` env (or `.env` for local dev).
2. **Unity Catalog tables** – Run the SQL scripts in `scripts/`:
   ```bash
   # In Databricks SQL or a notebook:
   # 1. Create schema and tables
   -- Run scripts/create_predictive_maintenance_tables.sql

   # 2. (Optional) Seed sample data
   -- Run scripts/seed_sample_data.sql
   ```
3. **Config** – Copy `.env.example` to `.env` and fill in values. Override via env vars if needed:
   - `AGILE_ISH_V3_PREDICTIVE_MAINTENANCE_CATALOG`
   - `AGILE_ISH_V3_PREDICTIVE_MAINTENANCE_SCHEMA`
   - `AGILE_ISH_V3_NASA_TABLE`, `AGILE_ISH_V3_TRANSFORMER_TABLE`, `AGILE_ISH_V3_ELECTRICAL_FAULT_TABLE`

---

<p align="center">Built with ❤️ using <a href="https://github.com/databricks-solutions/apx">apx</a></p>
