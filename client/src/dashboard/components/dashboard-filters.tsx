import * as React from 'react';
import CellphonesFilter, { FilterProps } from '../../reports/common/filters/cellphones-filter';
import { RANGE_DAYS } from '../types/constants';
import { ToggleSelector, ToggleSelectorOptions } from './toggle-selector';
import '../styles/dashboard-filters.css';
import { FormattedMessage } from 'react-intl';

const rangeOptions = [
  {
    value: RANGE_DAYS.WEEK,
    label: <FormattedMessage id="last_seven_days" />
  },
  {
    value: RANGE_DAYS.MONTH,
    label: <FormattedMessage id="last_thirty_days" />
  }
] as ToggleSelectorOptions;

export interface DashboardFiltersProps {
  cellphones: FilterProps['cellphonesItems'];
  isCellphonesLoading: boolean;
  onChange(cellphones: string[], range: RANGE_DAYS): void;
}

interface DashboardFiltersState {
  selectedCellphones: string[];
  range: RANGE_DAYS;
}

export default class DashboardFilters extends React.Component<DashboardFiltersProps, DashboardFiltersState> {

  state = {
    selectedCellphones: [],
    range: RANGE_DAYS.WEEK
  };

  handleCellphonesChange = (selectedCellphones: string[]) => {
    this.setState({ selectedCellphones });
  }

  handleRangeChange = (range: number) => {
    this.setState({ range });
    this.props.onChange(this.state.selectedCellphones, range);
  }

  handleUpdate = () => { this.props.onChange(this.state.selectedCellphones, this.state.range); };

  render() {
    return (
      <div className="row">
        <div className="col-md-9 col-sm-8 col-xs-12">
          <div className="col-sm-12">
            <div className="row df-title"><FormattedMessage id="select_cellphones" />:</div>
            <div className="row df-select">
              <CellphonesFilter
                onChange={this.handleCellphonesChange}
                onClose={this.handleUpdate}
                value={this.state.selectedCellphones}
                cellphonesItems={this.props.cellphones}
                isLoading={this.props.isCellphonesLoading}
              />
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-4 col-xs-12 df-item">
          <div className="col-sm-12">
            <div className="row df-title">
            <FormattedMessage id="select_date" />:
          </div>
            <div className="row df-selector">
              <ToggleSelector
                options={rangeOptions}
                value={this.state.range}
                onChange={this.handleRangeChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
