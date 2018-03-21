import * as React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { IndexStore } from '../stores';
import { PurchasesDetail } from '../types/purchases';
import PurchasesDetailTable from '../components/purchases-detail-table';
import PurchasesDetailModal from '../components/purchases-detail-modal';

interface PurchasesDetailRouteState {
    showModal: boolean;
}

interface PurchasesDetailProps {
    store: IndexStore;
}
// fijar estructura s
@observer
export default class PurchasesDetailManagerRoute extends
    React.Component<PurchasesDetailProps, PurchasesDetailRouteState> {
    state = {
        showModal: false,
    };

    componentDidMount() {
        this.props.store.purchases.fetchPurchasesIfNeed();
        this.props.store.purchasesDetail.fetchPurchasesDetailIfNeed();
    }

    onPurchaseDetailClick = async (pur: PurchasesDetail) => {
        const success = await this.props.store.purchasesDetail.fetchPurchaseDetail(pur.id);
        if (success) { this.setState({ showModal: true }); }
    }

    onHideModal = () => {
        const showModal = false;
        this.props.store.purchasesDetail.errors = {};
        this.setState({ showModal });
    }

    onSubmitPurchases = async () => {
        const pur = toJS(this.props.store.purchasesDetail.purchaseDetail);
        const create = pur.id === -1;
        if (create) {
            this.handleCreatePurchase(pur);
        } else {
            const isOk = await this.props.store.purchasesDetail.updatePurchaseDetail(pur);
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

    handleCreatePurchase = async (pur: PurchasesDetail) => {
        const wasCreated = await this.props.store.purchasesDetail.createPurchasesDetail(toJS(pur));
        const { id = '' } = pur;
        if (wasCreated) {
            const message = 'Se ha creado correctamente';
            this.props.store.messages.add(message.replace('{name}', id.toString()), 'success');
            this.onHideModal();
        } else {
            const message = 'Ha ocurrido un error al crear el detalle de compra';
            this.props.store.messages.add(message.replace('{name}', id.toString()), 'error');
        }
    }

    handleNewPurchase = () => {
        this.props.store.purchasesDetail.purchaseDetail = { id: -1 } as PurchasesDetail;
        this.setState({ showModal: true });
    }

    render() {
        return (
            <div>
                <div className="table-action-buttons">
                    <div className="right-header-app">
                        <button className="btn btn-primary" onClick={this.handleNewPurchase}>
                            Nuevo Detalle de Compra
                            </button>
                    </div>
                </div>
                <PurchasesDetailTable
                    purchasesDetail={toJS(this.props.store.purchasesDetail.purchasesDetail)}
                    onPurchaseDetailClick={this.onPurchaseDetailClick}
                    isFetching={this.props.store.purchasesDetail.isFetching}
                    https={this.props.store.https}
                />
                {this.state.showModal && (
                    <PurchasesDetailModal
                        purDetail={toJS(this.props.store.purchasesDetail.purchaseDetail)}
                        purDetailStore={this.props.store.purchasesDetail}
                        show={this.state.showModal}
                        onClose={this.onHideModal}
                        onSubmit={this.onSubmitPurchases}
                    />
                )}
            </div>
        );
    }
}