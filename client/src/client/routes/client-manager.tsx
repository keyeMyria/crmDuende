import * as React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { RootStore } from '../types/';
import { Client } from '../types/clients';
import ClientsTable from '../components/client-table';
import ClientsModal from '../components/client-modal';

interface ClientProps {
    store: RootStore;
}
interface ClientRouteState {
    showModal: boolean;
    showError: boolean;
}
@observer
export default class ClientsManagerRoute extends React.Component<ClientProps, ClientRouteState> {
    state = {
        showModal: false,
        showError: false
    };

    // componentDidMount() {
    //     this.props.store.clientStore.fetchClientsIfNeeded();
    // }

    onDeleteClient = (id: number, client: Client) => {
        this.props.store.messages.confirm({
            content: 'Eliminar a ',
            contentValues: { client: client.name },
            onResponse: this.handleDeleteClient,
            dismissible: true,
            extra: client,
            declineButtonText: 'No',
            confirmButtonText: 'Si',
            status: 'warning'
        });
    }

    onClientClick = async (client: Client) => {
        const showModal = !this.state.showModal;
        const success = await this.props.store.clientStore.fetchClient(client.clientId);
        if (success) { this.setState({ showModal }); }
    }

    onHideModal = () => {
        this.setState({ showModal: false, showError: false });
    }

    onSubmitClient = async () => {
        const client = await this.props.store.clientStore.client;
        const create = client.clientId === -1;
        if (create) {
            this.handleCreateClient(client);
        } else {
            this.handleUpdateClient(client);
        }
    }

    handleCreateClient = async (client: Client) => {
        const name = client.name || '';
        const created = await this.props.store.clientStore.createClient(client);
        if (created) {
            const message = 'Se ha creadocorrectamente';
            this.props.store.messages.add(message.replace('{name}', name), 'success');
            this.onHideModal();
        } else {
            const message = 'Ha ocurrido un error al crear a';
            this.props.store.messages.add(message.replace('{name}', name), 'error');
        }
    }

    handleUpdateClient = async (client: Client) => {
        const name = client.name || '';
        const updated = await this.props.store.clientStore.updateClient(client);
        if (updated) {
            const message = 'Se ha actualizado correctamente';
            this.props.store.messages.add(message.replace('{name}', name), 'success');
            this.onHideModal();
        } else {
            const message = 'No se ha podido actualizar';
            this.props.store.messages.add(message.replace('{name}', name), 'error');
        }
    }

    handleDeleteClient = async (shouldDelete: boolean, client: Client) => {
        if (shouldDelete) {
            const clientName = client.name || '';
            const deleted = await this.props.store.clientStore.deleteClient(client.clientId);
            if (deleted) {
                const message = 'Se ha eliminado correctamente a' + clientName;
                this.props.store.messages.add(message, 'success');
                this.onHideModal();
            } else {
                const message = 'Error al tratar de eliminar a' + clientName;
                this.props.store.messages.add(message, 'error');
            }
        }
    }

    handleNewClient = () => {
        this.props.store.clientStore.client = { clientId: -1 };
        this.setState({ showModal: true });
    }

    render() {
        return (
            <div>
                <div className="table-action-buttons">
                    <div className="right-header-app">
                        <button className="btn btn-primary" onClick={this.handleNewClient}>
                            <i className="icon-add" />  Crear Nuevo Cliente
                        </button>
                    </div>
                </div>
                <ClientsTable
                    clients={this.props.store.clientStore.clients}
                    onClientClick={this.onClientClick}
                    onDeleteClient={this.onDeleteClient}
                    isFetching={toJS(this.props.store.clientStore.isFetching)}
                    https={this.props.store.https}
                />
                {this.state.showModal && (
                    <ClientsModal
                        client={this.props.store.clientStore.client}
                        store={this.props.store}
                        show={this.state.showModal}
                        onClose={this.onHideModal}
                        onSubmit={this.onSubmitClient}
                        showError={this.state.showError}
                    />
                )}
            </div>
        );
    }
}