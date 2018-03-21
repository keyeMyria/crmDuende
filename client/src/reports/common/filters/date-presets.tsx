import * as React from 'react';
import * as moment from 'moment';
import '../../common/resources/styles/react-dates-presets.css';
import format from '../../../common/util/format-date';
import { InjectedIntl } from 'react-intl';
import { DateRangePicker, DateRangePickerShape } from 'react-dates';
import { DatePreset as PresetButton } from '../buttons/date-preset';
import { subDays, isSameDay } from 'date-fns';

export interface DatePresetsProps {
    startDate: string;
    endDate: string;
    intl: InjectedIntl;
    onChange?(startDate: string, endDate: string): void;
}

interface DatesPresetsState {
    focusedInput: DateRangePickerShape['focusedInput'];
}

const DATE_FORMAT = 'YYYY-MM-DD';

export class DatePresets extends React.Component<DatePresetsProps, DatesPresetsState> {

    state: DatesPresetsState = {
        focusedInput: null
    };

    arrowIcon = (<i className="icon-arrow_forward" />);

    calendarIcon = (<i className="icon-event" />);

    weekPreset: [Date, Date] = [subDays(new Date(), 7), new Date()];

    monthPreset: [Date, Date] = [subDays(new Date(), 30), new Date()];

    componentWillMount() {
        moment.locale(this.props.intl.locale);
    }

    monthAgo = () => moment().subtract(1, 'month');

    parseDate = (date: string) => date ? moment(date) : null;

    isOustideRange = (date: moment.Moment) => {
        const day = date.startOf('day');
        if (window.startLimit && moment(window.startLimit).startOf('day') > day) {
            return true;
        }
        if (window.endLimit && moment(window.endLimit).startOf('day') < day) {
            return true;
        }
        return day > moment().startOf('day');
    }

    isPresetSelected = (range: [Date, Date]) => {
        const [startDate, endDate] = range;
        return isSameDay(startDate, this.props.startDate) && isSameDay(endDate, this.props.endDate);
    }

    handlePreset = ([startDate, endDate]: [Date, Date]) => {
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(format(startDate, DATE_FORMAT), format(endDate, DATE_FORMAT));
        }
    }

    handleChanges = ({ startDate, endDate }: { startDate: moment.Moment | null, endDate: moment.Moment | null }) => {
        if (typeof this.props.onChange === 'function') {
            const formatedStartDate = startDate ? startDate.format(DATE_FORMAT) : '';
            const formatedEndDate = endDate ? endDate.format(DATE_FORMAT) : '';
            this.props.onChange(formatedStartDate, formatedEndDate);
        }
    }

    handleFocus = (focusedInput: DateRangePickerShape['focusedInput']) => { this.setState({ focusedInput }); };

    render() {
        return (
            <div>
                <DateRangePicker
                    isOutsideRange={this.isOustideRange}
                    startDate={this.parseDate(this.props.startDate)}
                    endDate={this.parseDate(this.props.endDate)}
                    onDatesChange={this.handleChanges}
                    focusedInput={this.state.focusedInput}
                    onFocusChange={this.handleFocus}
                    customArrowIcon={this.arrowIcon}
                    keepOpenOnDateSelect={true}
                    hideKeyboardShortcutsPanel={true}
                    initialVisibleMonth={this.monthAgo}
                    startDatePlaceholderText={this.props.intl.messages['common.start_date']}
                    minimumNights={0}
                    endDatePlaceholderText={this.props.intl.messages['common.end_date']}
                    customInputIcon={this.calendarIcon}
                    displayFormat={this.props.intl.messages['global.dateDefaultFormat'] || DATE_FORMAT}
                />
                {
                    !this.isOustideRange(moment(this.weekPreset[0])) && (
                        <PresetButton
                            intlId="common.last_seven_days"
                            onClick={this.handlePreset}
                            range={this.weekPreset}
                            isSelected={this.isPresetSelected(this.weekPreset)}
                        />
                    )
                }
                {
                    !this.isOustideRange(moment(this.monthPreset[0])) && (
                        <PresetButton
                            intlId="common.last_thirty_days"
                            onClick={this.handlePreset}
                            range={this.monthPreset}
                            isSelected={this.isPresetSelected(this.monthPreset)}
                            isLast={true}
                        />
                    )
                }
            </div>
        );
    }
}
