-- Sample data for testing the Predictive Maintenance app
-- Run after create_predictive_maintenance_tables.sql

-- NASA sample (5 rows as per spec)
INSERT INTO main.predictive_maintenance.nasa_train_test
(id, cycle, op_set1, op_set2, op_set3, sensor_measure1, sensor_measure2, sensor_measure3, remaining_useful_life)
VALUES
(1, 1, 0.0, 0.0, 100.0, 518.67, 641.82, 1589.70, 191),
(1, 2, 0.0, 0.0, 100.0, 518.67, 641.82, 1589.70, 190),
(1, 3, 0.0, 0.0, 100.0, 518.67, 641.82, 1589.70, 189),
(2, 1, 0.0, 0.0, 100.0, 518.67, 641.82, 1589.70, 191),
(2, 2, 0.0, 0.0, 100.0, 518.67, 641.82, 1589.70, 190);

-- Transformer sample (5 rows)
INSERT INTO main.predictive_maintenance.transformer_validation
(device_time_stamp, oti, wti, ati, oli, vl1, vl2, vl3, il1, il2, il3)
VALUES
('2019-06-01 00:00:00', 29.8, 0.2, 28.2, 0.5, 220.0, 220.0, 220.0, 10.0, 10.0, 10.0),
('2019-06-01 01:00:00', 30.0, 0.3, 28.0, 0.5, 219.0, 221.0, 220.0, 10.0, 10.0, 10.0),
('2019-06-01 02:00:00', 29.5, 0.2, 27.8, 0.5, 220.0, 220.0, 219.0, 10.0, 10.0, 10.0),
('2019-06-01 03:00:00', 29.8, 0.2, 28.2, 0.5, 220.0, 220.0, 220.0, 10.0, 10.0, 10.0),
('2019-06-01 04:00:00', 30.2, 0.3, 28.5, 0.5, 221.0, 220.0, 220.0, 10.0, 10.0, 10.0);

-- Electrical fault sample (5 rows)
INSERT INTO main.predictive_maintenance.electrical_fault_validation
(g, a, b, c, ia, ib, ic, va, vb, vc)
VALUES
(0, 0, 0, 0, 5.0, 5.0, 5.0, 220.0, 220.0, 220.0),
(1, 0, 0, 0, 15.0, 5.0, 5.0, 200.0, 220.0, 220.0),
(0, 1, 0, 0, 5.0, 15.0, 5.0, 220.0, 200.0, 220.0),
(0, 0, 1, 0, 5.0, 5.0, 15.0, 220.0, 220.0, 200.0),
(0, 0, 0, 1, 5.0, 5.0, 5.0, 220.0, 220.0, 220.0);
