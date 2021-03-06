import * as React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { ContextMessage } from '../../common/components/context-message';
import { observer } from 'mobx-react';
import { IndexStore } from '../stores';
import BillManagerRoute from './bill-manager';
import BillDetailManagerRoute from './bill-detail-manager';


export interface ManagerProps {
    store: IndexStore;
}

interface ManagerState {
    selectedTab: number;
}
// fijar estructura s
enum ActiveTab { Bill, BillDetail }

@observer
class Manager extends React.Component<ManagerProps, ManagerState> {

    state = {
        selectedTab: ActiveTab.Bill
    };

    handleTab = (selectedTab: any): void => {
        this.setState({ selectedTab });
    }

    render(): JSX.Element {
        return (
            <div>
                <ContextMessage messages={this.props.store.messages.messages} store={this.props.store.messages} />
                <Tabs activeKey={this.state.selectedTab} onSelect={this.handleTab} id="bill-manager-tabs" >
                    <Tab
                        eventKey={ActiveTab.Bill}
                        title="Ventas"
                    >
                        {
                            this.state.selectedTab === ActiveTab.Bill && (
                                <BillManagerRoute
                                    store={this.props.store}
                                />
                            )
                        }
                    </Tab>
                    <Tab
                        eventKey={ActiveTab.BillDetail}
                        title="Detalle de Venta"
                    >
                        {
                            this.state.selectedTab === ActiveTab.BillDetail && (
                                <BillDetailManagerRoute
                                    store={this.props.store}
                                />
                            )
                        }
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default Manager;