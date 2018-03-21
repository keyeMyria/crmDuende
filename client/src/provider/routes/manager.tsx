import * as React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { ContextMessage } from '../../common/components/context-message';
import { observer } from 'mobx-react';
import { IndexStore } from '../stores';
import ProviderManagerRoute from './provider-manager';

export interface ManagerProps {
    store: IndexStore;
}

interface ManagerState {
    selectedTab: number;
}

enum ActiveTab { Provider }

@observer
class Manager extends React.Component<ManagerProps, ManagerState> {

    state = {
        selectedTab: ActiveTab.Provider
    };

    handleTab = (selectedTab: any): void => {
        this.setState({ selectedTab });
    }

    render(): JSX.Element {
        return (
            <div>
                <ContextMessage messages={this.props.store.messages.messages} store={this.props.store.messages} />
                <Tabs activeKey={this.state.selectedTab} onSelect={this.handleTab} id="prov-manager-tabs" >
                    <Tab
                        eventKey={ActiveTab.Provider}
                        title="Provedores"
                    >
                        {
                            this.state.selectedTab === ActiveTab.Provider && (
                                <ProviderManagerRoute
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