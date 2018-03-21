import * as React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { IndexStore } from '../stores';
import { Provider } from '../types/provider';
import ProviderTable from '../components/provider-table';
import ProviderModal from '../components/provider-modal';

interface ProviderRouteState {
    showModal: boolean;
}

interface ProviderProps {
    store: IndexStore;
}

@observer
export default class ProviderManagerRoute extends React.Component<ProviderProps, ProviderRouteState> {
    state = {
        showModal: false,
        showTraces: false,
        showPassword: false
    };

    componentDidMount() {
       this.props.store.provider.fetchProviderIfNeed();
    }

    onDeleteProvider = async (id: number, provider: Provider) => {
        this.props.store.messages.confirm({
            content: 'Eliminar a',
            contentValues: { provider: provider.name },
            onResponse: this.handleDeleteProvider,
            dismissible: true,
            extra: provider,
            declineButtonText: 'No',
            confirmButtonText: 'Sí',
            status: 'warning'
        });
    }

    onProviderClick = async (provider: Provider) => {
        const success = await this.props.store.provider.fetchProvider(provider.id);
        if (success) { this.setState({ showModal: true }); }
    }

    onHideModal = () => {
        const showModal = false;
        this.props.store.provider.errors = {};
        this.setState({ showModal });
    }

    onSubmitProvider = async () => {
        const provider = toJS(this.props.store.provider.provider);
        const create = provider.id === -1;
        if (create) {
            this.handleCreateProvider(provider);
        } else {
            const isOk = await this.props.store.provider.updateProvider(provider);
            const name = `${provider.name || ''}`;
            if (isOk) {
                const message = 'Se ha actualizado correctamente';
                this.props.store.messages.add(message.replace('{name}', name), 'success');
                this.onHideModal();
            } else {
                const message = 'Ha ocurrido un error en la actualización';
                this.props.store.messages.add(message.replace('{name}', name), 'error');
            }
        }
    }

    handleCreateProvider = async (provider: Provider) => {
        const wasCreated = await this.props.store.provider.createProvider(toJS(provider));
        const { name = '' } = provider;
        if (wasCreated) {
            const message = 'Se ha creado correctamente';
            this.props.store.messages.add(message.replace('{name}', name), 'success');
            this.onHideModal();
        } else {
            const message = 'Ha ocurrido un error al actualizar al usuario';
            this.props.store.messages.add(message.replace('{name}', name), 'error');
        }
    }

    handleDeleteProvider = async (shouldDelete: boolean, provider: Provider) => {
        if (shouldDelete) {
            const wasDeleted = await this.props.store.provider.deleteProvider(provider.id);
            const { name = '' } = provider;
            if (wasDeleted) {
                const message = 'Se ha eliminado correctamente al usuario ' + name;
                this.props.store.messages.add(message, 'success');
            } else {
                const message = 'Ha ocurrido un error al eliminar al usuario ' + name;
                this.props.store.messages.add(message, 'error');
            }

        }
    }

    handleNewProvider = () => {
        this.props.store.provider.provider = { id: -1 } as Provider;
        this.setState({ showModal: true });
    }

    render() {
        return (
            <div>
                <div className="table-action-buttons">
                    <div className="right-header-app">
                        <button className="btn btn-primary" onClick={this.handleNewProvider}>
                            Nuevo Provedor
                            </button>
                    </div>
                </div>
                <ProviderTable
                    providers={toJS(this.props.store.provider.providers)}
                    onProviderClick={this.onProviderClick}
                    onDeleteProvider={this.onDeleteProvider}
                    isFetching={this.props.store.provider.isFetching}
                    https={this.props.store.https}
                />
                {this.state.showModal && (
                    <ProviderModal
                        provider={toJS(this.props.store.provider.provider)}
                        providerStore={this.props.store.provider}
                        show={this.state.showModal}
                        onClose={this.onHideModal}
                        onSubmit={this.onSubmitProvider}
                    />
                )}
            </div>
        );
    }
}