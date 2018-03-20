import * as React from 'react';
import { RootStore } from '../stores';
import { Modal } from 'react-bootstrap';
import ModalField from '../../common/components/modal-field';
import {
    required, isEmail, noNumbers, noAccents, isPhone
} from '../../common/components/input-validation/validators';
import { observer } from 'mobx-react';
import { Client } from '../types/clients';
import ModalPicture from '../../common/components/modal-picture';
import ModalDate from '../../common/components/modal-date';
const AvatarDefault = require('../../common/resources/pictures/avatar-default.svg');

interface ClientModalProps {
    store: RootStore;
    client: Client;
    show: boolean;
    onClose: () => void;
    onSubmit: () => void;
    showError: boolean;
}

interface ClientModalState {
    errors: { [valueName: string]: boolean };
    forceVerify: boolean;
    wantSubmit: boolean;
    client: Client;

}

@observer
export default class ClientModal extends React.Component<ClientModalProps, ClientModalState> {

    state = {
        errors: {},
        forceVerify: false,
        wantSubmit: false,
        client: {} as Client
    };

    componentDidMount() {
        this.setState({ client: this.props.client });
    }

    componentWillUnmount() {
        this.props.store.clientStore.resetClient();
    }

    shouldComponentUpdate(nextProps: ClientModalProps, nextState: ClientModalState) {
        const requiredFields = nextProps.client.id === -1 ? 3 : 3;
        if (nextState.wantSubmit && Object.keys(nextState.errors).length === requiredFields) {
            this.trySubmit();
        }
        return true;
    }

    isEditing = () => this.props.client.id !== -1;

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

    handlePictureChange = (path: FileReader, valueName: string, picture: string) => {
        this.props.store.clientStore.client = {
            ...this.props.store.clientStore.client, [valueName]: path, picture: picture
        };
    }

    handleValueChanges = (change: number | string | string[], valueName: string) => {
        this.props.store.clientStore.client = { ...this.props.store.clientStore.client, [valueName]: change };
    }

    renderHeader = () => (
        <Modal.Header closeButton={true}>
            <Modal.Title>
                {
                    this.isEditing()
                        ? <span> Editando Cliente </span>
                        : <span> Agregando Nuevo Cliente al Sistema </span>
                }
            </Modal.Title>
        </Modal.Header>
    )

    renderFooter = () => (
        <Modal.Footer>
            <div className="delete-vehicles-button">
                <button className="btn btn-default" onClick={this.props.onClose}>
                    Cancelar
                </button>
                <button className="btn btn-primary" onClick={this.handleSubmit}>
                    Guardar
                </button>
            </div>
        </Modal.Footer>
    )

    renderDefault = () => (
        <div className="col-sm-12" style={{ marginTop: 15 }}>
            <div className="row" >
                <div className="col-xs-3 col-sm-3">
                    <div className="row">
                        <ModalPicture
                            valueName="picture"
                            picture={this.props.client.picture}
                            // onChangePicture={this.handlePictureChange}
                            //  buttonText="Cambiar Fotografía"
                            picturePlaceholder={AvatarDefault}
                        />
                    </div>
                </div>
                <div className="col-sm-9">
                    <ModalField
                        valueName="name"
                        onChange={this.handleValueChanges}
                        labelText="Nombre"
                        inputValue={this.props.client.name}
                        isRequired={true}
                        validators={[required, noNumbers, noAccents]}
                        onChangeError={this.onInputErrorsChanges}
                        forceVerify={this.state.forceVerify}
                        autoFocus={true}
                        labelClassNames={'col-sm-4'}
                        inputClassNames={'col-sm-8'}
                    />
                    <ModalField
                        valueName="lastName"
                        onChange={this.handleValueChanges}
                        labelText="Apellido"
                        inputValue={this.props.client.lastName}
                        isRequired={true}
                        validators={[required, noNumbers, noAccents]}
                        onChangeError={this.onInputErrorsChanges}
                        forceVerify={this.state.forceVerify}
                        labelClassNames={'col-sm-4'}
                        inputClassNames={'col-sm-8'}
                    />
                    <ModalField
                        valueName="userName"
                        onChange={this.handleValueChanges}
                        labelText="Nombre de usuario"
                        isRequired={true}
                        validators={[required]}
                        onChangeError={this.onInputErrorsChanges}
                        forceVerify={this.state.forceVerify}
                        inputValue={this.props.client.userName}
                        labelClassNames={'col-sm-4'}
                        inputClassNames={'col-sm-8'}
                    />
                    <ModalField
                        valueName="mobile"
                        onChange={this.handleValueChanges}
                        labelText="Celular"
                        validators={[isPhone]}
                        onChangeError={this.onInputErrorsChanges}
                        forceVerify={this.state.forceVerify}
                        inputValue={this.props.client.mobile}
                        labelClassNames={'col-sm-4'}
                        inputClassNames={'col-sm-8'}
                    />
                    <ModalField
                        valueName="phone"
                        onChange={this.handleValueChanges}
                        labelText="Teléfono"
                        validators={[isPhone]}
                        onChangeError={this.onInputErrorsChanges}
                        forceVerify={this.state.forceVerify}
                        inputValue={this.props.client.phone}
                        labelClassNames={'col-sm-4'}
                        inputClassNames={'col-sm-8'}
                    />
                    <ModalField
                        valueName="email"
                        onChange={this.handleValueChanges}
                        labelText="Correo"
                        inputValue={this.props.client.email}
                        validators={[isEmail]}
                        onChangeError={this.onInputErrorsChanges}
                        forceVerify={this.state.forceVerify}
                        labelClassNames={'col-sm-4'}
                        inputClassNames={'col-sm-8'}
                    />
                    <ModalDate
                        valueName="birthayDate"
                        onChange={this.handleValueChanges}
                        labelText="Ingrese Fecha de Cumpleaños"
                        isRequired={true}
                        validators={[required]}
                        locale="es"
                        format="DD MMM YYYY"
                        labelClassNames={'col-sm-4'}
                        inputClassNames={'col-sm-8'}
                    />
                    <ModalDate
                        valueName="firstBuy"
                        onChange={this.handleValueChanges}
                        labelText="Primera Compra"
                        isRequired={true}
                        validators={[required]}
                        locale="es"
                        format="DD MMM YYYY"
                        labelClassNames={'col-sm-4'}
                        inputClassNames={'col-sm-8'}
                    />
                    <ModalDate
                        valueName="lastBuy"
                        onChange={this.handleValueChanges}
                        labelText="Última Compra"
                        isRequired={true}
                        validators={[required]}
                        locale="es"
                        format="DD MMM YYYY"
                        labelClassNames={'col-sm-4'}
                        inputClassNames={'col-sm-8'}
                    />
                    <ModalField
                        valueName="address"
                        onChange={this.handleValueChanges}
                        labelText="Dirección"
                        inputValue={this.props.client.address}
                        labelClassNames={'col-sm-4'}
                        inputClassNames={'col-sm-8'}
                    />
                    <ModalField
                        valueName="countryCode"
                        onChange={this.handleValueChanges}
                        labelText="Codigo de País"
                        inputValue={this.props.client.countryCode}
                        labelClassNames={'col-sm-4'}
                        inputClassNames={'col-sm-8'}
                    />
                    <ModalField
                        valueName="location"
                        onChange={this.handleValueChanges}
                        labelText="Ubicación"
                        inputValue={this.props.client.location}
                        labelClassNames={'col-sm-4'}
                        inputClassNames={'col-sm-8'}
                    />
                </div>
            </div>
        </div>
    )

    renderCreateView = () => (
        <Modal.Body>
            <div className="veh-general-form">
                {this.renderDefault()}
            </div>
        </Modal.Body>
    )

    renderEditView = () => (
        <Modal.Body>
            <div className="veh-general-form">
                {this.renderDefault()}
            </div>
        </Modal.Body>
    )

    chooseRender = (isEditing: boolean) => (
        isEditing ? this.renderEditView() : this.renderCreateView()
    )

    render() {
        return (
            <Modal show={true} onHide={this.props.onClose}>
                {this.renderHeader()}
                {this.chooseRender(this.props.client.id !== -1)}
                {this.renderFooter()}
            </Modal>
        );
    }
}