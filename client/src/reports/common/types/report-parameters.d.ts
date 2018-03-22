export interface ReportParameters {
    format: string;
    date?: string;
    start_date?: string;
    start_time?: string;
    end_date?: string;
    end_time?: string;
    start_of_day?: string;
    end_of_day?: string;
    days_of_week?: string[];
    events?: string[];
    min_stop_len?: number;
    user_ids?: string[];
}