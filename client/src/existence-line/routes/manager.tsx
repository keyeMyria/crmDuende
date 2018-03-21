import * as React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { ContextMessage } from '../../common/components/context-message';
import { observer } from 'mobx-react';
import { IndexStore } from '../stores';
import ExistenceLineManagerRoute from './existence-manager';

export interface ManagerProps {
    store: IndexStore;
}

interface ManagerState {
    selectedTab: number;
}

enum ActiveTab { Existence }

@observer
class Manager extends React.Component<ManagerProps, ManagerState> {

    state = {
        selectedTab: ActiveTab.Existence
    };

    handleTab = (selectedTab: any): void => {
        this.setState({ selectedTab });
    }

    render(): JSX.Element {
        return (
            <div>
                <ContextMessage messages={this.props.store.messages.messages} store={this.props.store.messages} />
                <Tabs activeKey={this.state.selectedTab} onSelect={this.handleTab} id="user-manager-tabs" >
                    <Tab
                        eventKey={ActiveTab.Existence}
                        title="Linea de Existencia"
                    >
                        {
                            this.state.selectedTab === ActiveTab.Existence && (
                                <ExistenceLineManagerRoute
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