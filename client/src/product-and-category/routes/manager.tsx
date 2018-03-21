import * as React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { ContextMessage } from '../../common/components/context-message';
import { observer } from 'mobx-react';
import { IndexStore } from '../stores';
import ProductManagerRoute from './products-manager';
import CategoryManagerRoute from './category-manager';

export interface ManagerProps {
    store: IndexStore;
}

interface ManagerState {
    selectedTab: number;
}

enum ActiveTab { Products, Category }

@observer
class Manager extends React.Component<ManagerProps, ManagerState> {

    state = {
        selectedTab: ActiveTab.Products
    };

    handleTab = (selectedTab: any): void => {
        this.setState({ selectedTab });
    }

    render(): JSX.Element {
        return (
            <div>
                <ContextMessage messages={this.props.store.messages.messages} store={this.props.store.messages} />
                <Tabs activeKey={this.state.selectedTab} onSelect={this.handleTab} id="pc-manager-tabs" >
                    <Tab
                        eventKey={ActiveTab.Products}
                        title="Productos"
                    >
                        {
                            this.state.selectedTab === ActiveTab.Products && (
                                <ProductManagerRoute
                                    store={this.props.store}
                                />
                            )
                        }
                    </Tab>
                    <Tab
                        eventKey={ActiveTab.Category}
                        title="Categorías"
                    >
                        {
                            this.state.selectedTab === ActiveTab.Category && (
                                <CategoryManagerRoute
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
// fijar estructura s
