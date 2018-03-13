import * as React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { RootStore } from '../types/';
import { observer } from 'mobx-react';
import { ContextMessage } from '../../common/components/context-message';
import ClientsManager from './client-manager';

export interface ManagerProps {
    store: RootStore;
}

interface ManagerState {
    selectedTab: number;
}

enum ActiveTab { CLIENTS }

@observer
class Manager extends React.Component<ManagerProps, ManagerState> {

    state = {
        selectedTab: ActiveTab.CLIENTS
    };

    handleTab = (selectedTab: any): void => this.setState({ selectedTab });

    render(): JSX.Element {
        return (
            <div>
                <ContextMessage
                    messages={this.props.store.messages.messages}
                    store={this.props.store.messages}
                />
                <Tabs activeKey={this.state.selectedTab} onSelect={this.handleTab} id="client-manager-tabs">
                    <Tab
                        eventKey={ActiveTab.CLIENTS}
                        title="Clientes"
                    >
                        {
                            this.state.selectedTab === ActiveTab.CLIENTS && (
                                <ClientsManager
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
