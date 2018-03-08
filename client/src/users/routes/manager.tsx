import * as React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import UsersManager from './users-manager';
import { IndexStore } from '../types';
import { ContextMessage } from '../../common/components/context-message';
import { observer } from 'mobx-react';

export interface ManagerProps {
    store: IndexStore;
}

interface ManagerState {
    selectedTab: number;
}

enum ActiveTab { User }

@observer
class Manager extends React.Component<ManagerProps, ManagerState> {

    state = {
        selectedTab: ActiveTab.User
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
                        eventKey={ActiveTab.User}
                        title="Usuarios"
                    >
                        {
                            this.state.selectedTab === ActiveTab.User && (
                                <UsersManager
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