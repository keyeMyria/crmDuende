import * as React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { IndexStore } from '../stores';
import { Bill } from '../types/bill';
import BillTable from '../components/bill-table';
import BillModal from '../components/bill-modal';


interface BillRouteState {
    showModal: boolean;
}
// fijar estructura s
interface BillRouteProps {
    store: IndexStore;
}

@observer
export default class BillManagerRoute extends React.Component<BillRouteProps, BillRouteState> {
    state = {
        showModal: false,
    };

    componentDidMount() {
        this.props.store.bills.fetchBillIfNeed();
        this.props.store.billsDetail.fetchBillDetailIfNeed();
    }

    onBillClick = async (bll: Bill) => {
        const success = await this.props.store.bills.fetchBill(bll.id);
        if (success) { this.setState({ showModal: true }); }
    }

    onHideModal = () => {
        const showModal = false;
        this.props.store.bills.errors = {};
        this.setState({ showModal });
    }

    onSubmitBill = async () => {
        const bll = toJS(this.props.store.bills.bill);
        const create = bll.id === -1;
        if (create) {
            this.handleCreateBill(bll);
        } else {
            const isOk = await this.props.store.bills.updateBill(bll);
            const name = `${bll.id || ''}`;
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

    handleCreateBill = async (bll: Bill) => {
        const wasCreated = await this.props.store.bills.createBill(toJS(bll));
        const { id = '' } = bll;
        if (wasCreated) {
            const message = 'Se ha creado correctamente';
            this.props.store.messages.add(message.replace('{name}', id.toString()), 'success');
            this.onHideModal();
        } else {
            const message = 'Ha ocurrido un error al crear la compra';
            this.props.store.messages.add(message.replace('{name}', id.toString()), 'error');
        }
    }

    handleNewBill = () => {
        this.props.store.bills.bill = { id: -1 } as Bill;
        this.setState({ showModal: true });
    }

    render() {
        return (
            <div>
                <div className="table-action-buttons">
                    <div className="right-header-app">
                        <button className="btn btn-primary" onClick={this.handleNewBill}>
                            Nueva Compra
                            </button>
                    </div>
                </div>
                <BillTable
                    bills={toJS(this.props.store.bills.bills)}
                    onBillClick={this.onBillClick}
                    isFetching={this.props.store.bills.isFetching}
                    https={this.props.store.https}
                />
                {this.state.showModal && (
                    <BillModal
                        bill={toJS(this.props.store.bills.bill)}
                        billStore={this.props.store.bills}
                        show={this.state.showModal}
                        onClose={this.onHideModal}
                        onSubmit={this.onSubmitBill}
                    />
                )}
            </div>
        );
    }
}