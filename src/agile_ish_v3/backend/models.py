from datetime import datetime

from pydantic import BaseModel, ConfigDict

from .. import __version__


class VersionOut(BaseModel):
    version: str

    @classmethod
    def from_metadata(cls):
        return cls(version=__version__)


# --- Predictive Maintenance Models ---


class NasaEquipmentOut(BaseModel):
    """NASA equipment degradation tracking with sensor measurements."""

    model_config = ConfigDict(populate_by_name=True)

    id: int
    cycle: int
    op_set1: float | None = None
    op_set2: float | None = None
    op_set3: float | None = None
    sensor_measure1: float | None = None
    sensor_measure2: float | None = None
    sensor_measure3: float | None = None
    sensor_measure4: float | None = None
    sensor_measure5: float | None = None
    sensor_measure6: float | None = None
    sensor_measure7: float | None = None
    sensor_measure8: float | None = None
    sensor_measure9: float | None = None
    sensor_measure10: float | None = None
    sensor_measure11: float | None = None
    sensor_measure12: float | None = None
    sensor_measure13: float | None = None
    sensor_measure14: float | None = None
    sensor_measure15: float | None = None
    sensor_measure16: float | None = None
    sensor_measure17: float | None = None
    sensor_measure18: float | None = None
    sensor_measure19: float | None = None
    sensor_measure20: float | None = None
    sensor_measure21: float | None = None
    remaining_useful_life: int


class TransformerReadingOut(BaseModel):
    """Electrical transformer monitoring readings."""

    model_config = ConfigDict(populate_by_name=True)

    device_time_stamp: datetime | None = None
    oti: float | None = None
    wti: float | None = None
    ati: float | None = None
    oli: float | None = None
    oti_a: float | None = None
    oti_t: float | None = None
    vl1: float | None = None
    vl2: float | None = None
    vl3: float | None = None
    il1: float | None = None
    il2: float | None = None
    il3: float | None = None
    vl12: float | None = None
    vl23: float | None = None
    vl31: float | None = None
    inut: float | None = None


class ElectricalFaultOut(BaseModel):
    """Electrical fault detection with phase measurements."""

    model_config = ConfigDict(populate_by_name=True)

    g: int = 0
    a: int = 0
    b: int = 0
    c: int = 0
    ia: float | None = None
    ib: float | None = None
    ic: float | None = None
    va: float | None = None
    vb: float | None = None
    vc: float | None = None


class PredictiveMaintenanceSummaryOut(BaseModel):
    """Dashboard summary for predictive maintenance data."""

    nasa_row_count: int
    nasa_unique_units: int
    transformer_row_count: int
    electrical_fault_row_count: int
    ground_fault_count: int
    a_phase_fault_count: int
    b_phase_fault_count: int
    c_phase_fault_count: int
