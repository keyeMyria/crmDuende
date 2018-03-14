import * as React from 'react';
import EditModal from '../components/store-modal';
import AccountsTable from '../components/store-table';
import RootStore from '../stores/';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { Store } from '../types/store';

interface AccountsRouteState {
    isLoadingList: boolean;
    showModal: boolean;
    selectedStore: Store | null;
    showError: boolean;
}

interface AccountsRouteProps {
    store: RootStore;
}
@observer
export default class AccountsRoute extends React.Component<AccountsRouteProps, AccountsRouteState> {
    state = {
        isLoadingList: false,
        showModal: false,
        showError: false,
        selectedStore: {} as Store
    };
    componentDidMount() {
        this.props.store.accounts.fetchDataIfNeeded();
        this.props.store.poiGroups.fetchPoiGroupsIfNeeded();
    }

    closeModal = () => {
        this.setState({ showModal: false });
    }

    onAccountClick = (account: Account) => {
        this.props.store.accounts.setAccount(account);
        this.setState({ showModal: true });
    }

    onSave = async (account: Account) => {
        this.props.store.accounts.updateAccount(account)
            .then(() => {
                this.closeModal();
            });
    }

    render() {
        return (
            <div >
                <AccountsTable
                    accounts={toJS(this.props.store.accounts.accounts)}
                    onAccountClick={this.onAccountClick}
                    isFetching={toJS(this.props.store.accounts.isFetching)}
                    https={this.props.store.https}
                />
                {this.state.showModal && (
                    <EditModal
                        store={this.props.store}
                        account={toJS(this.props.store.accounts.account)}
                        show={this.state.showModal}
                        onClose={this.closeModal}
                        onSave={this.onSave}
                        showError={this.state.showError}
                    />
                )}
            </div>
        );
    }
}