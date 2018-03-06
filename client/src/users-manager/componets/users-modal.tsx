import * as React from 'react';
import User from '../types/user';
import UserGroups from '../types/user-group';
import { Modal, Tabs, Tab } from 'react-bootstrap';
import ModalField from '../../common/components/modal-field';
import ModalPicture from '../../common/components/modal-picture';
import { ModalSelect } from '../../common/components/modal';
import ModalFieldInformation from '../../common/components/modal-field-information';
import {
    required, isEmail, minMaxLength, isUnique, isPhone, matchPassword, noNumbers, noAccents
} from '../../common/components/input-validation/validators';
import UserStore from '../stores/users-store';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { FormattedMessage, InjectedIntl } from 'react-intl';
import { ModalGeneric } from '../../common/components/modal';
import Toggle from '../../common/components/toggle';
const AvatarDefault = require('../../common/resources/pictures/avatar-default.svg');
import '../styles/user-modal.css';

interface UserModalProps {
    show: boolean;
    user: User;
    userStore: UserStore;
    userGroups: UserGroups[];
    onClose: () => void;
    onSubmit: () => void;
    intl: InjectedIntl;
}

interface UserModalState {
    errors: { [valueName: string]: boolean };
    forceVerify: boolean;
    wantSubmit: boolean;
    user: User;
}

const LANGUAGE = [
    { label: 'Español', value: 'es_GT' },
    { label: 'English', value: 'en_US' },
    { label: 'Deustch', value: 'de_CH' },
];

enum TABS { DEFAULT, SECURITY, INTEGRATIONS }

@observer
export default class UserModal extends React.Component<UserModalProps, UserModalState> {

    ALERT_OPTIONS = [
        { label: this.props.intl.messages['users.disabled'], value: '0' },
        { label: this.props.intl.messages['users.limited'], value: '1' }
    ];

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
        const requiredFields = nextProps.user.id === '-1' ? 8 : 6;
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

    handlePictureChange = (path: FileReader, valueName: string, pictureObj: File) => {
        this.props.userStore.user = { ...this.props.userStore.user, [valueName]: path, picture_obj: pictureObj };
    }

    handleValueChanges = (change: number | string | string[], valueName: string) => {
        this.props.userStore.user = { ...this.props.userStore.user, [valueName]: change };
    }

    handleQuotaChange = (quota: number | string | string[], valueName: string) => {
        if (quota < 0) {
            this.props.userStore.user = { ...this.props.userStore.user, [valueName]: 0 };
        } else if (quota > 1000) {
            this.props.userStore.user = { ...this.props.userStore.user, [valueName]: 1000 };
        } else {
            this.props.userStore.user = { ...this.props.userStore.user, [valueName]: quota };
        }
    }

    updatePermission = () => (this.isEditing() && !this.props.userStore.permissions.update);

    createPermission = () => (!this.isEditing() && !this.props.userStore.permissions.create);

    noPermissions = () => (this.isEditing() ? this.updatePermission() : this.createPermission());

    renderToggle = (checked: number | string , valueName: string) => {
        const onChange = () => this.handleValueChanges((checked === 1 || checked === '1') ? 0 : 1, valueName);

        return (
            <Toggle
                onClick={onChange}
                checked={checked === 1 || checked === '1'}
                disabled={this.noPermissions()}
            />
        );
    }

    renderHeader = () => (
        <Modal.Header closeButton={true}>
            <Modal.Title>
                {this.props.user.id !== '-1'
                    ? <FormattedMessage
                        id="global.edit_users"
                        values={{ name: `${this.state.user.first_name} ${this.state.user.last_name}` }}
                    />
                    : <FormattedMessage id="users.new_user" />}
            </Modal.Title>
        </Modal.Header>
    )

    renderFooter = () => (
        <Modal.Footer>
            <button className="btn btn-default" onClick={this.props.onClose}>
                {this.props.intl.messages['global.cancel']}
            </button>
            <button className="btn btn-primary" onClick={this.handleSubmit}>
                {this.props.intl.messages['global.save']}
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
                        onChangePicture={this.handlePictureChange}
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
                        inputPlaceholder={this.props.intl.messages['users.example_name']}
                        onChangeError={this.onInputErrorsChanges}
                        forceVerify={this.state.forceVerify}
                    />
                    <ModalField
                        valueName="lastName"
                        onChange={this.handleValueChanges}
                        labelText="Apellido"
                        inputValue={this.props.user.last_name}
                        externalErrors={this.props.userStore.errors}
                        isRequired={true}
                        validators={[required, noNumbers, noAccents]}
                        inputPlaceholder={this.props.intl.messages['users.example_last_name']}
                        onChangeError={this.onInputErrorsChanges}
                        forceVerify={this.state.forceVerify}
                    />
                    <ModalField
                        valueName="username"
                        onChange={this.handleValueChanges}
                        labelText={this.props.intl.messages['users.username']}
                        inputValue={this.props.user.username}
                        externalErrors={this.props.userStore.errors}
                        isRequired={true}
                        validators={[required, isUnique(this.getUsernameList(), this.state.user.username || '')]}
                        inputPlaceholder={this.props.intl.messages['users.example_user']}
                        onChangeError={this.onInputErrorsChanges}
                        forceVerify={this.state.forceVerify}
                        disabled={this.noPermissions()}
                    />
                    <ModalField
                        valueName="email"
                        onChange={this.handleValueChanges}
                        labelText="Correo"
                        inputValue={this.props.user.email}
                        externalErrors={this.props.userStore.errors}
                        isRequired={true}
                        validators={[required, isEmail]}
                        inputPlaceholder={this.props.intl.messages['users.example_mail']}
                        onChangeError={this.onInputErrorsChanges}
                        forceVerify={this.state.forceVerify}
                        disabled={this.noPermissions()}
                    />
                    <ModalField
                        valueName="phone"
                        onChange={this.handleValueChanges}
                        externalErrors={this.props.userStore.errors}
                        labelText="Telèfono"
                        inputValue={this.props.user.phone}
                        validators={[isPhone]}
                        forceVerify={this.state.forceVerify}
                        inputPlaceholder={this.props.intl.messages['users.example_phone']}
                        disabled={this.noPermissions()}
                    />
                    <ModalField
                        valueName="mobile"
                        onChange={this.handleValueChanges}
                        externalErrors={this.props.userStore.errors}
                        labelText="Celular"
                        inputValue={this.props.user.mobile}
                        validators={[isPhone]}
                        forceVerify={this.state.forceVerify}
                        inputPlaceholder={this.props.intl.messages['users.example_cellphone']}
                        disabled={this.noPermissions()}
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
