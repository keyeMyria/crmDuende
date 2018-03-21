
import * as React from 'react';
import { HourFilter } from './hour-filter';
export interface HourRangeProps {
    startValue: string;
    endValue: string; 
    startValueName?: string;
    endValueName?: string; 
    startDate?: string;
    endDate?: string;
    disableBefore?: string;
    disableAfter?: string;
    format?: string;
    onChange(time: string, valueName?: string): void;
}
export default function HourRange(props: HourRangeProps) {

    return (
        <div className="hour-range-picker-selector">
            <HourFilter
                valueName={props.startValueName}
                startDate={props.startDate}
                endDate={props.endDate}
                value={props.startValue}
                onChange={props.onChange}
                disableAfter={props.disableAfter}
            />
            <HourFilter
                valueName={props.endValueName}
                startDate={props.startDate}
                endDate={props.endDate}
                value={props.endValue}
                onChange={props.onChange}
                disableBefore={props.disableBefore}
            />
        </div>
    );
}