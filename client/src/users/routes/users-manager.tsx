import * as React from 'react';
import { User, IndexStore } from '../types';
import UsersTable from '../components/users-table';
import UsersModal from '../components/users-modal';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

interface UsersRouteState {
    showModal: boolean;
}

interface UserProps {
    store: IndexStore;
}

@observer
export default class UsersManagerRoute extends React.Component<UserProps, UsersRouteState> {
    state = {
        showModal: false,
        showTraces: false,
        showPassword: false
    };

    componentDidMount() {
        this.props.store.user.fetchUsersIfNeed();
    }

    onDeleteUser = async (id: string, user: User) => {
        this.props.store.messages.confirm({
            content: 'Eliminar a',
            contentValues: { user: user.name },
            onResponse: this.handleDeleteUser,
            dismissible: true,
            extra: user,
            declineButtonText: 'No',
            confirmButtonText: 'Sí',
            status: 'warning'
        });
    }

    onUserClick = async (user: User) => {
        const success = await this.props.store.user.fetchUser(user.userId);
        if (success) { this.setState({ showModal: true }); }
    }

    onHideModal = () => {
        const showModal = false;
        this.props.store.user.errors = {};
        this.setState({ showModal });
    }

    onSubmitUser = async () => {
        const user = toJS(this.props.store.user.user);
        const create = user.userId === -1;
        if (create) {
            this.handleCreateUser(user);
        } else {
            const isOk = await this.props.store.user.updateUser(user);
            const name = `${user.name || ''} ${user.lastName || ''}`;
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

    handleCreateUser = async (user: User) => {
        const wasCreated = await this.props.store.user.createUser(toJS(user));
        const { name = '' } = user;
        if (wasCreated) {
            const message = 'Se ha creado correctamente';
            this.props.store.messages.add(message.replace('{name}', name), 'success');
            this.onHideModal();
        } else {
            const message = 'Ha ocurrido un error al actualizar al usuario';
            this.props.store.messages.add(message.replace('{name}', name), 'error');
        }
    }

    handleDeleteUser = async (shouldDelete: boolean, user: User) => {
        if (shouldDelete) {
            const wasDeleted = await this.props.store.user.deleteUser(user.userId);
            const { name = '' } = user;
            if (wasDeleted) {
                const message = 'Se ha eliminado correctamente al usuario ' + name;
                this.props.store.messages.add(message, 'success');
            } else {
                const message = 'Ha ocurrido un error al eliminar al usuario ' + name;
                this.props.store.messages.add(message, 'error');
            }

        }
    }

    handleNewUser = () => {
        this.props.store.user.user = { userId: -1 } as User;
        this.setState({ showModal: true });
    }

    render() {
        return (
            <div>
                <div className="table-action-buttons">
                    <div className="right-header-app">
                        <button className="btn btn-primary" onClick={this.handleNewUser}>
                            Nuevo Usuario
                            </button>
                    </div>
                </div>
                <UsersTable
                    users={toJS(this.props.store.user.users)}
                    onUserClick={this.onUserClick}
                    onDeleteUser={this.onDeleteUser}
                    isFetching={this.props.store.user.isFetching}
                    https={this.props.store.https}
                />
                {this.state.showModal && (
                    <UsersModal
                        user={toJS(this.props.store.user.user)}
                        userStore={this.props.store.user}
                        show={this.state.showModal}
                        onClose={this.onHideModal}
                        onSubmit={this.onSubmitUser}
                    />
                )}
            </div>
        );
    }
}