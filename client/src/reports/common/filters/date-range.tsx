import * as React from 'react';
import { DatePicker } from 'antd';
import * as moment from 'moment';
import '../../../common/resources/styles/date-picker.css';

export interface DateRangeProps {
    startDate: string;
    endDate: string;
    startValueName: string;
    endValueName: string;
    onChange(value: { [valueKey: string]: string }): void;
}

const DATE_FORMAT = 'DD MMM YYYY';
const DATE = 'es_ES'; 

export class DateRange extends React.Component<DateRangeProps> {

    locale = require(`antd/lib/date-picker/locale/${DATE}.js`);

    presetRanges = {
        "Hoy": [moment(), moment()],
        "Últ. 7 Días": [moment().subtract(7, 'days'), moment()],
        "Últ. 30 Días": [moment().subtract(30, 'days'), moment()]
    };

    getValue = (): [moment.Moment, moment.Moment] => [moment(this.props.startDate), moment(this.props.endDate)];

    disabledDate = (current: moment.Moment) => current && current.valueOf() > Date.now();

    handleChange = (dates: [moment.Moment, moment.Moment], stringDates: [string, string]) => {
        this.props.onChange({
            [this.props.startValueName]: dates[0].format(DATE_FORMAT),
            [this.props.endValueName]: dates[1].format(DATE_FORMAT)
        });
    }

    render() {
        moment.locale('es');
        return (
            <div className="date-range-picker-selector">
                <DatePicker.RangePicker
                    ranges={this.presetRanges}
                    value={this.getValue()}
                    format={DATE_FORMAT}
                    onChange={this.handleChange}
                    disabledDate={this.disabledDate}
                    allowClear={false}
                    size="large"
                    locale={this.locale}
                />
            </div>);
    }
}
