export interface ByDate {
    [date: string]: Totals;
}

export interface ByPhone {
    [phone: string]: Totals;
}

export interface Totals {
    effective: number;
    'not-effective': number;
    isSyntethic?: boolean; // Is applied when JS create the day data
}

