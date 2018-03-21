import * as React from 'react';
import { Modal, Tabs, Tab } from 'react-bootstrap';
// import ModalField from '../../common/components/modal-field';
import { observer } from 'mobx-react';
import { Purchases } from '../types/purchases';
import PurchasesStore from '../stores/purchases-store';


interface PurModalProps {
    show: boolean;
    pur: Purchases;
    purStore: PurchasesStore;
    onClose: () => void;
    onSubmit: () => void;
}
// fijar estructura s
interface PurModalState {
    errors: { [valueName: string]: boolean };
    forceVerify: boolean;
    wantSubmit: boolean;
    purDetail: Purchases;
}

enum TABS { DEFAULT, INTEGRATIONS }

@observer
export default class PurchasesModal extends React.Component<PurModalProps, PurModalState> {

    state = {
        errors: {},
        forceVerify: false,
        wantSubmit: false,
        purDetail: {} as Purchases
    };

    componentDidMount() {
        this.setState({ purDetail: this.props.purStore.purchase });
    }

    shouldComponentUpdate(nextProps: PurModalProps, nextState: PurModalState) {
        const requiredFields = nextProps.pur.id === -1 ? 4 : 4;
        if (nextState.wantSubmit && Object.keys(nextState.errors).length === requiredFields) {
            this.trySubmit();
        }
        return true;
    }

    isEditing = () => this.props.pur.id !== -1;

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
        this.props.purStore.purchase = { ...this.props.purStore.purchase, [valueName]: change };
    }

    renderHeader = () => (
        <Modal.Header closeButton={true}>
            <Modal.Title>
                {this.props.pur.id !== -1
                    ?
                    <span>
                        Editar Compra {this.state.purDetail.id + this.state.purDetail.documentNumber!}
                    </span>
                    : <span> Nueva Compra </span>}
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
                {this.chooseRender(this.props.pur.id !== -1)}
                {this.renderFooter()}
            </Modal>
        );
    }
} 