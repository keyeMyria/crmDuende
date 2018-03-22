import * as React from 'react';
import DetailTable from '../components/detail-table';
import SummaryTable from '../components/summary-table';
import NoParams from '../../common/formatters/bootstrap-table/no data/no-parameters';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { IndexStore } from '../stores/index';
import { Tabs, Tab } from 'react-bootstrap';
import '../styles/tables-manager.css';
export interface TablesManagerProps {
  store: IndexStore;
}
interface TablesManagerState {
  selectedTab: number;
}

enum TABS { Summary, Detail}
@observer
export default class TablesManager extends React.Component<TablesManagerProps, TablesManagerState> {
  state = {
    selectedTab: TABS.Summary
  };

  // Receive a number, types don't allow use it explicit.
  handleTab = (selectedTab: any): void => this.setState({ selectedTab });

  isEmptyTab = (tab: (any | any)[]) => !tab || tab.length === 0;

  isEmpty = () => this.isEmptyTab(this.props.store.report.data.detail)
    && this.isEmptyTab(this.props.store.report.data.summary)

  renderResults = () => (
    <Tabs
      id="dt-report-manager-tabs"
      className="tabs-container"
      activeKey={this.state.selectedTab}
      onSelect={this.handleTab}
    >
      {this.props.store.report.data.summary && this.props.store.report.data.summary.length > 0 && (
        <Tab
          eventKey={TABS.Summary}
          title="Resumen"
        >
          {this.state.selectedTab === TABS.Summary && (
            <SummaryTable
              summaryData={this.props.store.report.data.summary}
              usersList={this.props.store.report.data.drivers || {}}
              isFetching={toJS(this.props.store.report.isFetching)}
              https={this.props.store.https}
            />
          )}
        </Tab>
      )}
      {this.props.store.report.data.detail && this.props.store.report.data.detail.length > 0 && (
        <Tab
          eventKey={TABS.Detail}
          title="Detallado"
        >
          {this.state.selectedTab === TABS.Detail && (
            <DetailTable
              detailData={this.props.store.report.data.detail}
              usersList={this.props.store.report.data.drivers || {}}
              isFetching={toJS(this.props.store.report.isFetching)}
              https={this.props.store.https}
            />
          )}
        </Tab>
      )}
    </Tabs>
  )

  render() {
    return this.isEmpty() ? <NoParams /> : this.renderResults();
  }
}