import * as React from 'react';
import { Modal, Tabs, Tab } from 'react-bootstrap';
import ModalField from '../../common/components/modal-field';
import {
    required, isEmail, isPhone, noNumbers, noAccents
} from '../../common/components/input-validation/validators';
import { observer } from 'mobx-react';
import { Provider } from '../types/provider';
import ProviderStore from '../stores/provider-store';

interface ProviderModalProps {
    show: boolean;
    provider: Provider;
    providerStore: ProviderStore;
    onClose: () => void;
    onSubmit: () => void;
}

interface ProviderModalState {
    errors: { [valueName: string]: boolean };
    forceVerify: boolean;
    wantSubmit: boolean;
    provider: Provider;
}

enum TABS { DEFAULT, INTEGRATIONS }

@observer
export default class ProviderModal extends React.Component<ProviderModalProps, ProviderModalState> {

    state = {
        errors: {},
        forceVerify: false,
        wantSubmit: false,
        provider: {} as Provider
    };

    componentDidMount() {
        this.setState({ provider: this.props.providerStore.provider });
    }

    shouldComponentUpdate(nextProps: ProviderModalProps, nextState: ProviderModalState) {
        const requiredFields = nextProps.provider.id === -1 ? 4 : 4;
        if (nextState.wantSubmit && Object.keys(nextState.errors).length === requiredFields) {
            this.trySubmit();
        }
        return true;
    }

    isEditing = () => this.props.provider.id !== -1;

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
        this.props.providerStore.provider = { ...this.props.providerStore.provider, [valueName]: change };
    }

    renderHeader = () => (
        <Modal.Header closeButton={true}>
            <Modal.Title>
                {this.props.provider.id !== -1
                    ?
                    <span>
                        Editar Provedor {this.state.provider.name}
                    </span>
                    : <span> Nuevo Provedor </span>}
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
                    <ModalField
                        valueName="name"
                        onChange={this.handleValueChanges}
                        labelText="Nombre del Provedor"
                        inputValue={this.props.provider.name}
                        autoFocus={true}
                        externalErrors={this.props.providerStore.errors}
                        isRequired={true}
                        validators={[required, noNumbers, noAccents]}
                        inputPlaceholder="Amazon"
                        onChangeError={this.onInputErrorsChanges}
                        forceVerify={this.state.forceVerify}
                    />
                    <ModalField
                        valueName="address"
                        onChange={this.handleValueChanges}
                        labelText="Dirección de Contacto"
                        inputValue={this.props.provider.address}
                        externalErrors={this.props.providerStore.errors}
                        isRequired={true}
                        validators={[required, noAccents]}
                        inputPlaceholder="14 calle 30-53"
                        onChangeError={this.onInputErrorsChanges}
                        forceVerify={this.state.forceVerify}
                    />
                    <ModalField
                        valueName="location"
                        onChange={this.handleValueChanges}
                        labelText="Ubicación"
                        inputValue={this.props.provider.location}
                        externalErrors={this.props.providerStore.errors}
                        isRequired={true}
                        validators={[required, noAccents]}
                        inputPlaceholder="Guatemala City"
                        onChangeError={this.onInputErrorsChanges}
                        forceVerify={this.state.forceVerify}
                    />
                    <ModalField
                        valueName="countryCode"
                        onChange={this.handleValueChanges}
                        labelText="Código de País"
                        inputValue={this.props.provider.countryCode}
                        externalErrors={this.props.providerStore.errors}
                        validators={[noAccents]}
                        inputPlaceholder="+502"
                        onChangeError={this.onInputErrorsChanges}
                        forceVerify={this.state.forceVerify}
                    />
                    <ModalField
                        valueName="email"
                        onChange={this.handleValueChanges}
                        labelText="Correo"
                        inputValue={this.props.provider.email}
                        externalErrors={this.props.providerStore.errors}
                        isRequired={true}
                        validators={[required, isEmail]}
                        inputPlaceholder="mlam@uvg.com"
                        onChangeError={this.onInputErrorsChanges}
                        forceVerify={this.state.forceVerify}
                    />
                    <ModalField
                        valueName="contactName"
                        onChange={this.handleValueChanges}
                        externalErrors={this.props.providerStore.errors}
                        labelText="Nombre de Contacto"
                        inputValue={this.props.provider.contactName}
                        validators={[noAccents, noNumbers]}
                        forceVerify={this.state.forceVerify}
                        inputPlaceholder="Juan Perez Archila"
                    />
                    <ModalField
                        valueName="phone"
                        onChange={this.handleValueChanges}
                        externalErrors={this.props.providerStore.errors}
                        labelText="Teléfono"
                        inputValue={this.props.provider.phone}
                        validators={[isPhone]}
                        forceVerify={this.state.forceVerify}
                        inputPlaceholder="24739702"
                    />
                    <ModalField
                        valueName="mobile"
                        onChange={this.handleValueChanges}
                        externalErrors={this.props.providerStore.errors}
                        labelText="Celular"
                        inputValue={this.props.provider.mobile}
                        validators={[isPhone]}
                        forceVerify={this.state.forceVerify}
                        inputPlaceholder="54039702"
                    />
                </div>
            </div>
        </div>
    )

    renderEditView = () => (
        <Modal.Body>
            <Tabs defaultActiveKey={TABS.DEFAULT} id="user-modal-tab">
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
                {this.chooseRender(this.props.provider.id !== -1)}
                {this.renderFooter()}
            </Modal>
        );
    }
} 