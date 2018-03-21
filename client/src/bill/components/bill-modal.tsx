import * as React from 'react';
import { Modal, Tabs, Tab } from 'react-bootstrap';
// import ModalField from '../../common/components/modal-field';
import { observer } from 'mobx-react';
import { Bill } from '../types/bill';
import BillStore from '../stores/bill-store';


interface BillModalProps {
    show: boolean;
    bill: Bill;
    billStore: BillStore;
    onClose: () => void;
    onSubmit: () => void;
}

interface BillModalState {
    errors: { [valueName: string]: boolean };
    forceVerify: boolean;
    wantSubmit: boolean;
    bill: Bill;
}

enum TABS { DEFAULT, INTEGRATIONS }

@observer
export default class BillModal extends React.Component<BillModalProps, BillModalState> {

    state = {
        errors: {},
        forceVerify: false,
        wantSubmit: false,
        bill: {} as Bill
    };
// fijar estructura s
    componentDidMount() {
        this.setState({ bill: this.props.billStore.bill });
    }

    shouldComponentUpdate(nextProps: BillModalProps, nextState: BillModalState) {
        const requiredFields = nextProps.bill.id === -1 ? 4 : 4;
        if (nextState.wantSubmit && Object.keys(nextState.errors).length === requiredFields) {
            this.trySubmit();
        }
        return true;
    }

    isEditing = () => this.props.bill.id !== -1;

    onInputErrorsChanges = (valueKey: string, error?: string | JSX.Element) => {
        const haveError = !!error;
        const { errors } = this.state;
        errors[valueKey] = haveError;
        this.setState({ errors });
    }

    trySubmit = (fromButton?: boolean) => {
        if (fromButton && !this.state.forceVerify) {
            this.setState({ forceVerify: true, wantSubmit: true });
        } else {
            const valueKeys = Object.keys(this.state.errors);
            const canSubmit = !valueKeys.some(valueKey => this.state.errors[valueKey]);
            if (canSubmit) {
                this.setState({ wantSubmit: false });
                this.props.onSubmit();
            } else {
                this.setState({ wantSubmit: false });
            }
        }
    }

    handleSubmit = () => {
        this.trySubmit(true);
    }

    handleValueChanges = (change: number | number[] | string | string[], valueName: string) => {
        this.props.billStore.bill = { ...this.props.billStore.bill, [valueName]: change };
    }

    renderHeader = () => (
        <Modal.Header closeButton={true}>
            <Modal.Title>
                {this.props.bill.id !== -1
                    ?
                    <span>
                        Editar Factura {this.state.bill.id + this.state.bill.userId!}
                    </span>
                    : <span> Nuevo Ingreso de Factura </span>}
            </Modal.Title>
        </Modal.Header>
    )

    renderFooter = () => (
        <Modal.Footer>
            <button className="btn btn-default" onClick={this.props.onClose}>
                Cancelar
            </button>
            <button className="btn btn-primary" onClick={this.handleSubmit}>
                Guardar
            </button>
        </Modal.Footer>
    )

    renderDefault = (isNew?: boolean) => (
        <div className="col-sm-12">
            <div className="row">
                <div className="col-sm-9">
                    {/* <ModalField
                        valueName="mobile"
                        onChange={this.handleValueChanges}
                        externalErrors={this.props.purDetailStore.errors}
                        labelText="Celular"
                        inputValue={this.props.user.mobile}
                        validators={[isPhone]}
                        forceVerify={this.state.forceVerify}
                        inputPlaceholder="54039702"
                    /> */}
                </div>
            </div>
        </div>
    )

    renderEditView = () => (
        <Modal.Body>
            <Tabs defaultActiveKey={TABS.DEFAULT} id="pd-modal-tab">
                <Tab eventKey={TABS.DEFAULT} title="General">
                    <div className="veh-general-form marg-top-15">
                        {this.renderDefault()}
                    </div>
                </Tab>
            </Tabs>
        </Modal.Body>
    )

    renderCreateView = () => (
        <Modal.Body>
            <div className="veh-general-form">
                {this.renderDefault(true)}
            </div>
        </Modal.Body>
    )

    chooseRender = (isEditing: boolean) => (
        isEditing ? this.renderEditView() : this.renderCreateView()
    )

    render() {
        return (
            <Modal bsSize="lg" show={true} onHide={this.props.onClose}>
                {this.renderHeader()}
                {this.chooseRender(this.props.bill.id !== -1)}
                {this.renderFooter()}
            </Modal>
        );
    }
} 