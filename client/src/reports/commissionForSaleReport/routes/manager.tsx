import * as React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { ReportParameters } from '../../common/types/report-parameters';
import { ContextMessage } from '../../../common/components/context-message/index';
import { IndexStore } from '../stores/index';
import { UserReportFilters as Filters } from '../components/filters';
import TablesManager from './tables-manager';
import { Tabs, Tab } from 'react-bootstrap';
import Loading from '../../../common/components/labels/loading';

export interface ManagerProps {
    store: IndexStore;
}
interface ManagerState {
    selectedTab: number;
    showTables: boolean;
    showSchedTable: boolean;
}
enum TABS { FILTERS, SCHED_REPORT }

@observer
class Manager extends React.Component<ManagerProps, ManagerState> {

    state = {
        showTables: false,
        showSchedTable: false,
        selectedTab: TABS.FILTERS
    };

    componentDidMount() {
    //    this.props.store.users.fetchIfNeeded();
    }

    canPrint = () => (
        !!(this.state.showTables
            && this.props.store.report.data.detail
            && this.props.store.report.data.summary
            && this.props.store.report.data.detailAlerts
            && this.props.store.report.data.sumByRule)
    )

    isFetchingDrivers = () => (
       // toJS(this.props.store.users.driverStore.isFetching
           // || this.props.store.users.driverGroupStore.isFetching)
           false
    )

    handleTab = (selectedTab: any) => {
        this.setState({ selectedTab });
    }

    handleSubmit = (parameters: ReportParameters) => {
        this.setState({ showTables: true });
        this.props.store.report.fetchDriverReport(parameters);
    }

    handleShowSchedTable = () => {
        this.setState({ showSchedTable: true });
    }

    render(): JSX.Element {
        return (
            <div>
                <ContextMessage messages={this.props.store.messages.messages} store={this.props.store.messages} />
                <div className="row">
                    <Tabs activeKey={this.state.selectedTab} onSelect={this.handleTab} id="report-header">
                        <Tab eventKey={TABS.FILTERS} title="Parámetros de Informe">
                            <Filters
                                dateFormat="DD MMM YYYY"
                                onSubmit={this.handleSubmit}
                                disabledSubmit={toJS(this.props.store.report.isFetching)}
                                userItems={toJS(this.props.store.users.getUsers)}
                                isFetchingUsers={this.isFetchingDrivers()}
                                isFetchingReport={toJS(this.props.store.report.isFetching)}
                                canPrint={this.canPrint()}
                                store={this.props.store}
                            />
                        </Tab>
                    </Tabs>
                </div>
                <div className="row">
                    {this.state.showTables && (
                        this.props.store.report.isFetching
                            ? <Loading />
                            : <TablesManager store={this.props.store} />
                    )}
                </div>
            </div>
        );
    }
}

export default Manager;