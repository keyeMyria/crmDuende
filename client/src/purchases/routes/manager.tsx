import * as React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { ContextMessage } from '../../common/components/context-message';
import { observer } from 'mobx-react';
import { IndexStore } from '../stores';
import PurchasesDetailManagerRoute from './purchasesDetail-manager';
import PurchasesManagerRoute from './purchases-manager';
export interface ManagerProps {
    store: IndexStore;
}

interface ManagerState {
    selectedTab: number;
}
// fijar estructura s
enum ActiveTab { Purchases, PurchasesDetail }

@observer
class Manager extends React.Component<ManagerProps, ManagerState> {

    state = {
        selectedTab: ActiveTab.Purchases
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
                        eventKey={ActiveTab.Purchases}
                        title="Compras"
                    >
                        {
                            this.state.selectedTab === ActiveTab.Purchases && (
                                <PurchasesManagerRoute
                                    store={this.props.store}
                                />
                            )
                        }
                    </Tab>
                    <Tab
                        eventKey={ActiveTab.PurchasesDetail}
                        title="Detalle de Compra"
                    >
                        {
                            this.state.selectedTab === ActiveTab.PurchasesDetail && (
                                <PurchasesDetailManagerRoute
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
