import * as React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { IndexStore } from '../stores';
import { ExistenceLine } from '../types/existence-line';
import ExistenceLineTable from '../components/existence-table';
import ExistenceLineModal from '../components/existence-modal';

interface ExistenceRouteState {
    showModal: boolean;
}

interface ExistenceRouteProps {
    store: IndexStore;
}

@observer
export default class ExistenceLineManagerRoute extends React.Component<ExistenceRouteProps, ExistenceRouteState> {
    state = {
        showModal: false
    };

    componentDidMount() {
        this.props.store.existenceLine.fetchExistenceLineIfNeed();
    }

    onExistenceClick = async (existence: ExistenceLine) => {
        const success = await this.props.store.existenceLine.fetchExistence(existence.id);
        if (success) { this.setState({ showModal: true }); }
    }

    onHideModal = () => {
        const showModal = false;
        this.props.store.existenceLine.errors = {};
        this.setState({ showModal });
    }

    onSubmitExistence = async () => {
        const existence = toJS(this.props.store.existenceLine.existence);
        const create = existence.id === -1;
        if (create) {
            this.handleCreateExistence(existence);
        } else {
            const isOk = await this.props.store.existenceLine.updateExistence(existence);
            const id = `${existence.id || ''}`;
            if (isOk) {
                const message = 'Se ha actualizado correctamente';
                this.props.store.messages.add(message.replace('{name}', id), 'success');
                this.onHideModal();
            } else {
                const message = 'Ha ocurrido un error en la actualización';
                this.props.store.messages.add(message.replace('{name}', id), 'error');
            }
        }
    }

    handleCreateExistence = async (existence: ExistenceLine) => {
        const wasCreated = await this.props.store.existenceLine.createExistence(toJS(existence));
        const { id = '' } = existence;
        if (wasCreated) {
            const message = 'Se ha creado correctamente';
            this.props.store.messages.add(message.replace('{name}', id.toLocaleString()), 'success');
            this.onHideModal();
        } else {
            const message = 'Ha ocurrido un error al actualizar al usuario';
            this.props.store.messages.add(message.replace('{name}', id.toLocaleString()), 'error');
        }
    }


    handleNewExistence = () => {
        this.props.store.existenceLine.existence = { id: -1 } as ExistenceLine;
        this.setState({ showModal: true });
    }

    render() {
        return (
            <div>
                <div className="table-action-buttons">
                    <div className="right-header-app">
                        <button className="btn btn-primary" onClick={this.handleNewExistence}>
                            Nueva Línea de Existencia 
                            </button>
                    </div>
                </div>
                <ExistenceLineTable
                    existences={toJS(this.props.store.existenceLine.existences)}
                    onExistenceLineClick={this.onExistenceClick}
                    isFetching={this.props.store.existenceLine.isFetching}
                    https={this.props.store.https}
                />
                {this.state.showModal && (
                    <ExistenceLineModal
                        existence={toJS(this.props.store.existenceLine.existence)}
                        existenceStore={this.props.store.existenceLine}
                        show={this.state.showModal}
                        onClose={this.onHideModal}
                        onSubmit={this.onSubmitExistence}
                    />
                )}
            </div>
        );
    }
}