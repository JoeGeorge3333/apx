-- Create Unity Catalog schema and tables for Predictive Maintenance & Asset Management
-- Run in Databricks SQL or a notebook connected to your SQL Warehouse
-- Adjust catalog name if not using 'main'

CREATE SCHEMA IF NOT EXISTS main.predictive_maintenance;

-- Table 1: NASA Data Train/Test
-- Equipment degradation tracking with sensor measurements and remaining useful life
CREATE TABLE IF NOT EXISTS main.predictive_maintenance.nasa_train_test (
  id INT NOT NULL,
  cycle INT NOT NULL,
  op_set1 DOUBLE,
  op_set2 DOUBLE,
  op_set3 DOUBLE,
  sensor_measure1 DOUBLE,
  sensor_measure2 DOUBLE,
  sensor_measure3 DOUBLE,
  sensor_measure4 DOUBLE,
  sensor_measure5 DOUBLE,
  sensor_measure6 DOUBLE,
  sensor_measure7 DOUBLE,
  sensor_measure8 DOUBLE,
  sensor_measure9 DOUBLE,
  sensor_measure10 DOUBLE,
  sensor_measure11 DOUBLE,
  sensor_measure12 DOUBLE,
  sensor_measure13 DOUBLE,
  sensor_measure14 DOUBLE,
  sensor_measure15 DOUBLE,
  sensor_measure16 DOUBLE,
  sensor_measure17 DOUBLE,
  sensor_measure18 DOUBLE,
  sensor_measure19 DOUBLE,
  sensor_measure20 DOUBLE,
  sensor_measure21 DOUBLE,
  remaining_useful_life INT NOT NULL
)
USING DELTA
TBLPROPERTIES ('delta.autoOptimize.optimizeWrite' = 'true');

-- Table 2: Transformer Validation Data
-- Electrical transformer monitoring (temperature, voltage, current)
CREATE TABLE IF NOT EXISTS main.predictive_maintenance.transformer_validation (
  device_time_stamp TIMESTAMP,
  oti DOUBLE,
  wti DOUBLE,
  ati DOUBLE,
  oli DOUBLE,
  oti_a DOUBLE,
  oti_t DOUBLE,
  vl1 DOUBLE,
  vl2 DOUBLE,
  vl3 DOUBLE,
  il1 DOUBLE,
  il2 DOUBLE,
  il3 DOUBLE,
  vl12 DOUBLE,
  vl23 DOUBLE,
  vl31 DOUBLE,
  inut DOUBLE
)
USING DELTA
TBLPROPERTIES ('delta.autoOptimize.optimizeWrite' = 'true');

-- Table 3: Electrical Fault Validation Data
-- Electrical fault detection with phase measurements
CREATE TABLE IF NOT EXISTS main.predictive_maintenance.electrical_fault_validation (
  g BIGINT NOT NULL,
  a BIGINT NOT NULL,
  b BIGINT NOT NULL,
  c BIGINT NOT NULL,
  ia DOUBLE,
  ib DOUBLE,
  ic DOUBLE,
  va DOUBLE,
  vb DOUBLE,
  vc DOUBLE
)
USING DELTA
TBLPROPERTIES ('delta.autoOptimize.optimizeWrite' = 'true');
