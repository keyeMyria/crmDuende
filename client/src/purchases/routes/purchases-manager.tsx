import * as React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { IndexStore } from '../stores';
import { Purchases } from '../types/purchases';
import PurchasesTable from '../components/purchases-table';
import PurchasesModal from '../components/purchases-modal';

interface PurchasesRouteState {
    showModal: boolean;
}
// fijar estructura s
interface PurchasesProps {
    store: IndexStore;
}

@observer
export default class PurchasesManagerRoute extends React.Component<PurchasesProps, PurchasesRouteState> {
    state = {
        showModal: false,
    };

    componentDidMount() {
        this.props.store.purchases.fetchPurchasesIfNeed();
        this.props.store.purchasesDetail.fetchPurchasesDetailIfNeed();
    }

    onPurchaseClick = async (pur: Purchases) => {
        const success = await this.props.store.purchases.fetchPurchase(pur.id);
        if (success) { this.setState({ showModal: true }); }
    }

    onHideModal = () => {
        const showModal = false;
        this.props.store.purchases.errors = {};
        this.setState({ showModal });
    }

    onSubmitPurchases = async () => {
        const pur = toJS(this.props.store.purchases.purchase);
        const create = pur.id === -1;
        if (create) {
            this.handleCreatePurchase(pur);
        } else {
            const isOk = await this.props.store.purchases.updatePurchase(pur);
            const name = `${pur.id || ''}`;
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

    handleCreatePurchase = async (pur: Purchases) => {
        const wasCreated = await this.props.store.purchases.createPurchases(toJS(pur));
        const { id = '' } = pur;
        if (wasCreated) {
            const message = 'Se ha creado correctamente';
            this.props.store.messages.add(message.replace('{name}', id.toString()), 'success');
            this.onHideModal();
        } else {
            const message = 'Ha ocurrido un error al crear la compra';
            this.props.store.messages.add(message.replace('{name}', id.toString()), 'error');
        }
    }

    handleNewPurchase = () => {
        this.props.store.purchases.purchase = { id: -1 } as Purchases;
        this.setState({ showModal: true });
    }

    render() {
        return (
            <div>
                <div className="table-action-buttons">
                    <div className="right-header-app">
                        <button className="btn btn-primary" onClick={this.handleNewPurchase}>
                            Nueva Compra
                            </button>
                    </div>
                </div>
                <PurchasesTable
                    purchases={toJS(this.props.store.purchases.purchases)}
                    onPurchaseClick={this.onPurchaseClick}
                    isFetching={this.props.store.purchases.isFetching}
                    https={this.props.store.https}
                />
                {this.state.showModal && (
                    <PurchasesModal
                        pur={toJS(this.props.store.purchases.purchase)}
                        purStore={this.props.store.purchases}
                        show={this.state.showModal}
                        onClose={this.onHideModal}
                        onSubmit={this.onSubmitPurchases}
                    />
                )}
            </div>
        );
    }
}
