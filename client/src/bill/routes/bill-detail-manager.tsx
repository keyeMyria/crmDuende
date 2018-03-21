import * as React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { IndexStore } from '../stores';
import { BillDetail } from '../types/bill';
import BillDetailTable from '../components/bill-detail-table';
import BillDetailModal from '../components/bill-detail-modal';


interface BillDetailRouteState {
    showModal: boolean;
}

interface BillDetailRouteProps {
    store: IndexStore;
}
// fijar estructura s
@observer
export default class BillDetailManagerRoute extends
    React.Component<BillDetailRouteProps, BillDetailRouteState> {
    state = {
        showModal: false,
    };

    componentDidMount() {
        this.props.store.bills.fetchBillIfNeed();
        this.props.store.billsDetail.fetchBillDetailIfNeed();
    }

    onPurchaseDetailClick = async (pur: BillDetail) => {
        const success = await this.props.store.billsDetail.fetchBillDetail(pur.id);
        if (success) { this.setState({ showModal: true }); }
    }

    onHideModal = () => {
        const showModal = false;
        this.props.store.billsDetail.errors = {};
        this.setState({ showModal });
    }

    onSubmitPurchases = async () => {
        const pur = toJS(this.props.store.billsDetail.billDetail);
        const create = pur.id === -1;
        if (create) {
            this.handleCreatePurchase(pur);
        } else {
            const isOk = await this.props.store.billsDetail.updateBillDetail(pur);
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

    handleCreatePurchase = async (pur: BillDetail) => {
        const wasCreated = await this.props.store.billsDetail.createBillDetail(toJS(pur));
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
        this.props.store.billsDetail.billDetail = { id: -1 } as BillDetail;
        this.setState({ showModal: true });
    }

    render() {
        return (
            <div>
                <div className="table-action-buttons">
                    <div className="right-header-app">
                        <button className="btn btn-primary" onClick={this.handleNewPurchase}>
                            Nuevo Detalle de Factura
                            </button>
                    </div>
                </div>
                <BillDetailTable
                    billsDetail={toJS(this.props.store.billsDetail.billsDetail)}
                    onBillDetailClick={this.onPurchaseDetailClick}
                    isFetching={this.props.store.billsDetail.isFetching}
                    https={this.props.store.https}
                />
                {this.state.showModal && (
                    <BillDetailModal
                        billDetail={toJS(this.props.store.billsDetail.billDetail)}
                        billDetailStore={this.props.store.billsDetail}
                        show={this.state.showModal}
                        onClose={this.onHideModal}
                        onSubmit={this.onSubmitPurchases}
                    />
                )}
            </div>
        );
    }
}