import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { FilterHandler } from '../../types/react-bootstrap-table/custom';
import Select, { Option, Options } from 'react-select';
import { isPast, addMonths, isWithinRange, addWeeks } from 'date-fns';
import '../../resources/styles/date-filter.css';
import 'react-select/dist/react-select.min.css';

export interface DateFilterProps {
    filterHandler: FilterHandler;
    today: Date;
    filterValue?: DATE_OPTIONS;
}

interface DateFilterState {
    filter: string;
}

enum DATE_OPTIONS { EXPIRED, A_WEEK, A_MONTH, IN_SIX_MONTHS}

export default class DateFilter extends React.Component <DateFilterProps, DateFilterState> {

    state = {
        filter: ''
    };

    selectFilterDates: any;

    options = Object.keys(DATE_OPTIONS)
        .filter(option => !isNaN(parseFloat(option)))
        .map((option: string) => ({value: option, label: DATE_OPTIONS[option]}));

    componentDidMount() {
        this.isFiltered = this.isFiltered.bind(this);
    }
    
    setRef = (select: Select) => {
        this.selectFilterDates = select;
    }

    filter = (value: Option | Options | null) => {
        const filter: string = value ? `${value}` : '';
        this.setState({filter});
        if (filter === '') {
            this.props.filterHandler();
        } else {
            this.props.filterHandler({callback: this.isFiltered});
        }
    }

    isFiltered = (date: string) => {
        if (!date) {
            return false;
        }
        switch (this.selectFilterDates.state.focusedOption.value) {
            case DATE_OPTIONS.EXPIRED.toString():
                return isPast(date);
            case DATE_OPTIONS.A_WEEK.toString():
                const weekFuture = addWeeks(this.props.today, 1);
                return isWithinRange(date, this.props.today, weekFuture);
            case DATE_OPTIONS.A_MONTH.toString():
                const monthFuture = addMonths(this.props.today, 1);
                return isWithinRange(date, this.props.today, monthFuture);
            case DATE_OPTIONS.IN_SIX_MONTHS.toString():
                const sixMonthsFuture = addMonths(this.props.today, 6);
                return isWithinRange(date, this.props.today, sixMonthsFuture);
            default:
                return true;
        }
    }

    renderOption = (option: Option) => {
        return (<FormattedMessage id={`global.bootstrap_table.date_filter.${option.label || ''}`} />);
    }

    render() {
        return (
            <div className="date-filter-container " data-width="auto">
                <Select
                    options={this.options}
                    value={this.state.filter}
                    placeholder={<FormattedMessage id="global.bootstrap_table.date_filter.placeholder" />}
                    optionRenderer={this.renderOption}
                    valueRenderer={this.renderOption}
                    onChange={this.filter}
                    simpleValue={true}
                    ref={this.setRef}
                    clearable={this.state.filter !== ''}
                    tabSelectsValue={false}
                />
            </div>
        );
    }
}