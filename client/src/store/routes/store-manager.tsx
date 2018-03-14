import * as React from 'react';
import EditModal from '../components/store-modal';
import StoreTable from '../components/store-table';
import RootStore from '../stores/';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { Store } from '../types/store';

interface StoresRouteState {
    isLoadingList: boolean;
    showModal: boolean;
    selectedStore: Store | null;
    showError: boolean;
}

interface StoresRouteProps {
    store: RootStore;
}
@observer
export default class StoresRoute extends React.Component<StoresRouteProps, StoresRouteState> {
    state = {
        isLoadingList: false,
        showModal: false,
        showError: false,
        selectedStore: {} as Store
    };

    // componentDidMount() {
    //     this.props.store.stores.fetchDataIfNeeded();
    // }

    closeModal = () => {
        this.setState({ showModal: false });
    }

    onAccountClick = (store: Store) => {
        this.props.store.stores.store = store;
        this.setState({ showModal: true });
    }

    onSave = async (store: Store) => {
        this.props.store.stores.updateStore(store)
            .then(() => {
                this.closeModal();
            });
    }

    render() {
        return (
            <div >
                <StoreTable
                    stores={toJS(this.props.store.stores.stores)}
                    onStoresClick={this.onAccountClick}
                    isFetching={toJS(this.props.store.stores.isFetching)}
                    https={this.props.store.https}
                />
                {this.state.showModal && (
                    <EditModal
                        store={this.props.store}
                        shop={toJS(this.props.store.stores.store)}
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