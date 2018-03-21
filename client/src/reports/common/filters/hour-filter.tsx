import * as React from 'react';
import { TimePicker } from 'antd';
import * as moment from 'moment';
import '../../../common/resources/styles/time-picker.css';
import 'antd/lib/time-picker/style/index.css';
import { parseHour } from '../util/parseHour';
export interface HourFilterProps {
    value: string;
    startDate?: string;
    endDate?: string;
    disableBefore?: string;
    disableAfter?: string;
    valueName?: string;
    format?: string;
    onChange(time: string, valueName?: string): void;
}

const defaultFormat = 'HH:mm';

export function HourFilter(props: HourFilterProps) {

    const { format = defaultFormat } = props;

    const disabledTime = props.disableAfter || props.disableBefore || '00:00';

    const getDisabledHour = () => parseInt(disabledTime.split(':')[0], 10);

    const shouldDisableHours = () =>  props.startDate === props.endDate && (
        !!props.disableAfter || !!props.disableBefore);

    const generateHours = () => {
        const hours: number[] = [] as number[];
        for (let i = 0; i < 24; i++) { hours.push(i); }
        return hours;
    };

    const generateMinutes = () => {
        const minutes: number[] = [] as number[];
        for (let i = 0; i < 60; i++) { minutes.push(i); }
        return minutes;
    };

    const disabledHours = () => {
        if (shouldDisableHours()) {
            const hours = generateHours();
            const hour = getDisabledHour();

            if (props.disableAfter) {
                hours.splice(0, hour);
            } else { hours.splice(hour); }

            return hours;

        } else { return [] as number[]; }
    };

    const disabledMinutes = (hour: number) => {
        if (shouldDisableHours() && hour === getDisabledHour()) {
            const minutes = generateMinutes();
            const minute = parseInt(disabledTime.split(':')[1], 10);

            if (props.disableAfter) {
                minutes.splice(0, minute);
            } else { minutes.splice(minute); }
            return minutes;
        } else { return [] as number[]; }
    };

    const handleChange = (time: moment.Moment, timeString: string) => {
        props.onChange(timeString, props.valueName);
    };

    const renderTimePicker = (tpProps: any) => <TimePicker {...tpProps} />;

    return (renderTimePicker({
        value: moment(parseHour(props.value), format),
        format: format,
        onChange: handleChange,
        disabledHours: disabledHours,
        disabledMinutes: disabledMinutes,
        allowEmpty: false,
        className: 'ts-timepicker'
    })
    );
}
// TODO: Use timepicker types after changes been merged on master
