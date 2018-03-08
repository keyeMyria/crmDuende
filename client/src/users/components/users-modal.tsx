import * as React from 'react';
import User from '../types/user';
import { Modal, Tabs, Tab } from 'react-bootstrap';
import ModalField from '../../common/components/modal-field';
import ModalPicture from '../../common/components/modal-picture';
import {
    required, isEmail, isUnique, isPhone, noNumbers, noAccents
} from '../../common/components/input-validation/validators';
import UserStore from '../stores/users-store';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

const AvatarDefault = require('../../common/resources/pictures/avatar-default.svg');
import '../styles/user-modal.css';

interface UserModalProps {
    show: boolean;
    user: User;
    userStore: UserStore;
    onClose: () => void;
    onSubmit: () => void;
}

interface UserModalState {
    errors: { [valueName: string]: boolean };
    forceVerify: boolean;
    wantSubmit: boolean;
    user: User;
}

enum TABS { DEFAULT, INTEGRATIONS }

@observer
export default class UserModal extends React.Component<UserModalProps, UserModalState> {

    state = {
        errors: {},
        forceVerify: false,
        wantSubmit: false,
        user: {} as User
    };

    componentDidMount() {
        this.setState({ user: this.props.userStore.user });
    }

    shouldComponentUpdate(nextProps: UserModalProps, nextState: UserModalState) {
        const requiredFields = nextProps.user.id === '-1' ? 4 : 4;
        if (nextState.wantSubmit && Object.keys(nextState.errors).length === requiredFields) {
            this.trySubmit();
        }
        return true;
    }

    isEditing = () => this.props.user.id !== '-1';

    getUsernameList = (): string[] => toJS(this.props.userStore.users.map(user => user.username || ''));

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

    handleValueChanges = (change: number | string | string[], valueName: string) => {
        this.props.userStore.user = { ...this.props.userStore.user, [valueName]: change };
    }

    renderHeader = () => (
        <Modal.Header closeButton={true}>
            <Modal.Title>
                {this.props.user.id !== '-1'
                    ?
                    <span>
                        Editar Usuario {this.state.user.name + this.state.user.last_name}
                    </span>
                    : <span> Nuevo Usuario </span>}
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
                <div className="col-sm-3">
                    <ModalPicture
                        valueName="picture"
                        picture={this.props.user.picture}
                        picturePlaceholder={AvatarDefault}
                    />
                </div>
                <div className="col-sm-9">
                    <ModalField
                        valueName="name"
                        onChange={this.handleValueChanges}
                        labelText="Nombre"
                        inputValue={this.props.user.first_name}
                        autoFocus={true}
                        externalErrors={this.props.userStore.errors}
                        isRequired={true}
                        validators={[required, noNumbers, noAccents]}
                        inputPlaceholder="Juana"
                        onChangeError={this.onInputErrorsChanges}
                        forceVerify={this.state.forceVerify}
                    />
                    <ModalField
                        valueName="last_name"
                        onChange={this.handleValueChanges}
                        labelText="Apellido"
                        inputValue={this.props.user.last_name}
                        externalErrors={this.props.userStore.errors}
                        isRequired={true}
                        validators={[required, noNumbers, noAccents]}
                        inputPlaceholder="Argueta"
                        onChangeError={this.onInputErrorsChanges}
                        forceVerify={this.state.forceVerify}
                    />
                    <ModalField
                        valueName="username"
                        onChange={this.handleValueChanges}
                        labelText="Nombre de Usuario"
                        inputValue={this.props.user.username}
                        externalErrors={this.props.userStore.errors}
                        isRequired={true}
                        validators={[required, isUnique(this.getUsernameList(), this.state.user.username || '')]}
                        inputPlaceholder="fresa2000"
                        onChangeError={this.onInputErrorsChanges}
                        forceVerify={this.state.forceVerify}
                    />
                    <ModalField
                        valueName="email"
                        onChange={this.handleValueChanges}
                        labelText="Correo"
                        inputValue={this.props.user.email}
                        externalErrors={this.props.userStore.errors}
                        isRequired={true}
                        validators={[required, isEmail]}
                        inputPlaceholder="mlam@uvg.com"
                        onChangeError={this.onInputErrorsChanges}
                        forceVerify={this.state.forceVerify}
                    />
                    <ModalField
                        valueName="phone"
                        onChange={this.handleValueChanges}
                        externalErrors={this.props.userStore.errors}
                        labelText="Teléfono"
                        inputValue={this.props.user.phone}
                        validators={[isPhone]}
                        forceVerify={this.state.forceVerify}
                        inputPlaceholder="24739702"
                    />
                    <ModalField
                        valueName="mobile"
                        onChange={this.handleValueChanges}
                        externalErrors={this.props.userStore.errors}
                        labelText="Celular"
                        inputValue={this.props.user.mobile}
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
                {this.chooseRender(this.props.user.id !== '-1')}
                {this.renderFooter()}
            </Modal>
        );
    }
} 