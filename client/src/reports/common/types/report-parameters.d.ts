import { CheckinType } from './checkin-type';
import { FIND_BY } from './find-by';

export interface ReportParameters {
    format: string;
    date?: string;
    start_date?: string;
    start_time?: string;
    end_date?: string;
    end_time?: string;
    routeid?: string;
    checkin_type?: CheckinType;
    pois?: string[];
    start_of_day?: string;
    end_of_day?: string;
    cellphone_ids?: string[];
    driver_ids?: string[];
    vehicle_ids?: string[];
    refpoints?: string[];
    use_gps?: string;
    use_cells?: string;
    days_of_week?: string[];
    events?: string[];
    fuel_cost?: number;
    fuel_efficiency?: number;
    min_stop_len?: number;
    findBy?: FIND_BY;
    findby?: FIND_BY; // se debe de cambiar a snakeCase en PHP 
    user_ids?: string[];
    forms_ids?: string[];
    form_id?: string;
}