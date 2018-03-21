import * as React from 'react';
import {
    CheckboxSelect
} from './checkbox-select';
export enum DAYS {
    SUNDAY = '0', MONDAY = '1', TUESDAY = '2', WEDNESDAY = '3', THURSDAY = '4', FRIDAY = '5', SATURDAY = '6'
}
const days = {
    [DAYS.SUNDAY]: 'common.days.sunday',
    [DAYS.MONDAY]: 'common.days.monday',
    [DAYS.TUESDAY]: 'common.days.tuesday',
    [DAYS.WEDNESDAY]: 'common.days.wednesday',
    [DAYS.THURSDAY]: 'common.days.thursday',
    [DAYS.FRIDAY]: 'common.days.friday',
    [DAYS.SATURDAY]: 'common.days.saturday'
};
interface ValidDaysProps {
    value: DAYS[];
    valueName?: string;
    onChange(days: DAYS[], valueName: string): void;
}
export function ValidDays(props: ValidDaysProps) {
    return (
        <CheckboxSelect
            options={days}
            onChange={props.onChange}
            value={props.value}
            valueName={props.valueName}
        />
    );
}