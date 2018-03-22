import { ByDate, ByPhone } from "../types/checkin-report";

export interface CellphonesDashboardData {
    current: CellphoneDashboardDataChild;
    previous: CellphoneDashboardDataChild;
}

export interface CellphoneDashboardDataChild {
    new_pois: number;
    rules_broken: number;
    by_date: ByDate;
    by_cellphone: ByPhone;
}