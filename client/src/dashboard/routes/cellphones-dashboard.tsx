import * as React from 'react';
import DashboardFilters from '../components/dashboard-filters';
import { IndexStore } from '../store';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { ContextMessage } from '../../common/components/context-message/index';
import { RANGE_DAYS } from '../types/constants';
import { RANGES } from '../util/comparator-ranges';
import { DashboardSummary } from '../components/dashboard-summary';
import CheckinsByPhoneBox from '../components/checins-by-phone-box';
import CheckinsByDateBox from '../components/checkins-by-date-box';
import Loading from '../../common/components/labels/loading';

export interface CellphonesDashboardProps {
  store: IndexStore;
}

@observer
export default class CellphonesDashboard extends React.Component<CellphonesDashboardProps> {

  componentWillMount() {
    this.props.store.cellphones.fetchIfNeeded();
    this.props.store.dashboard.liveData();
  }

  parseRange = () => this.props.store.dashboard.params.days === RANGE_DAYS.WEEK
    ? RANGES.WEEK : RANGES.MONTH

  handleChange = async (cellphones: string[], days: number) => {
    const params = {
      ...this.props.store.dashboard.params,
      cellphones,
      days
    };
    this.props.store.dashboard.params = params;
    this.props.store.dashboard.isFetching = true;
    await this.props.store.dashboard.fetchData(params);
    this.props.store.dashboard.isFetching = false;
  }

  render() {

    const range = this.parseRange();

    return (
      <div className="container cellphones-dashboard-container">
        <ContextMessage store={this.props.store.messages} messages={this.props.store.messages.messages} />
        <DashboardFilters
          isCellphonesLoading={toJS(this.props.store.cellphones.isLoading)}
          cellphones={toJS(this.props.store.cellphones.getCellphonesFilterItems)}
          onChange={this.handleChange}
        />
        {this.props.store.dashboard.isFetching
          ? (
            <Loading />
          )
          : (
            <div>
              <DashboardSummary
                range={range}
                createdPois={toJS(this.props.store.dashboard.createdPois)}
                rulesBroken={toJS(this.props.store.dashboard.rulesBroken)}
                madeCheckins={toJS(this.props.store.dashboard.madeCheckins)}
              />
              {
                (this.props.store.dashboard.data.current && this.props.store.dashboard.data.previous) && (
                  <div>
                    <CheckinsByDateBox
                      range={range}
                      currentData={toJS(this.props.store.dashboard.data.current.by_date)}
                      previousData={toJS(this.props.store.dashboard.data.previous.by_date)}
                    />
                    <CheckinsByPhoneBox
                      range={range}
                      currentData={toJS(this.props.store.dashboard.data.current.by_cellphone)}
                      prevData={toJS(this.props.store.dashboard.data.previous.by_cellphone)}
                      cellphones={toJS(this.props.store.cellphones.cellphoneStore.getCellphones)}
                    />
                  </div>

                )
              }
            </div>
          )
        }
      </div>
    );
  }
}
