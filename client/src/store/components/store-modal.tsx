import * as React from 'react';
import ModalField from '../../common/components/modal-field';
import { Modal } from 'react-bootstrap';
import { Tabs, Tab } from 'react-bootstrap';
import ModalPicture from '../../common/components/modal-picture';
import { Store } from '../types/store';
import { isPhone } from '../../common/components/input-validation/validators';
import IndexStore from '../stores';
const AvatarDefault = require('../../common/resources/pictures/avatar-default.svg');
import '../styles/stores-modal.css';

interface EditModalProps {
    store: IndexStore;
    show: boolean;
    shop: Store;
    onClose: () => void;
    onSave: (shop: Store) => void;
    showError: boolean;
}

interface EditModalState {
    errors: { [valueName: string]: boolean };
    forceVerify: boolean;
    wantSubmit: boolean;
    activeTab: number;
}

enum TABS { GENERAL, PLACE }

export default class EditModal extends React.Component<EditModalProps, EditModalState> {

    state = {
        errors: {},
        forceVerify: false,
        wantSubmit: false,
        activeTab: TABS.GENERAL
    };

    shouldComponentUpdate(nextProps: EditModalProps, nextState: EditModalState) {
        const fieldsToVerify = 1;
        if (nextState.wantSubmit && Object.keys(nextState.errors).length === fieldsToVerify) {
            this.trySubmit();
        }
        return true;
    }

    componentWillUnmount() {
        this.props.store.stores.resetAccounts();
    }

    trySubmit = (fromButton?: boolean) => {
        if (fromButton && !this.state.forceVerify) {
            this.setState({ forceVerify: true, wantSubmit: true });
        } else {
            const valueKeys = Object.keys(this.state.errors);
            const canSubmit = !valueKeys.some(key => this.state.errors[key]);
            if (canSubmit) {
                this.props.onSave(this.props.shop);
                this.setState({ wantSubmit: false });
            } else {
                this.setState({ wantSubmit: false });
            }
        }
    }


    handleInputErrors = (valueKey: string, error?: string | JSX.Element) => {
        const haveError = !!error;
        const { errors } = this.state;
        errors[valueKey] = haveError;
        this.setState({ errors });
    }

    handleValueChanges = (change: number | string, valueName: string) => {
        this.props.store.stores.store = { ...this.props.shop, [valueName]: change };
    }

    handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.props.onClose();
    }

    handleSubmit = () => {
        this.state.activeTab !== TABS.PLACE ? this.props.onSave(this.props.shop) : this.trySubmit(true);
    }

    handleChangeTab = (activeTab: any) => { this.setState({ activeTab }); };

    renderHeader = () => (
        <Modal.Header closeButton={true}>
            <Modal.Title>
                <span> Información de la Tienda </span>
                {'ID' + `${this.props.shop.storeId}`}
            </Modal.Title>
        </Modal.Header>
    )

    renderFooter = () => (
        <Modal.Footer>
            <div className="update-preferences-button">
                <button className="btn btn-default" onClick={this.handleClose}>
                    Cancelar
                </button>
                <button className="btn btn-primary" onClick={this.handleSubmit}>
                    Guardar
                </button>
            </div>
        </Modal.Footer>
    )

    renderStaticFields = () => (
        <div className="col-sm-12">
            <div className="row veh-general-form acc-tab-content">
                <ModalPicture
                    valueName="picture"
                    picture={this.props.shop.picture!}
                    picturePlaceholder={AvatarDefault}
                    labelClassNames="col-sm-5"
                />
            </div>
        </div>
    )

    renderGeneral = () => (
        <div className="col-sm-12">
            <div className="row veh-general-form acc-tab-content">
                <ModalField
                    onChange={this.handleValueChanges}
                    labelText="Nombre de la Tienda"
                    valueName="name"
                    inputValue={this.props.shop.name}
                    inputClassNames="col-sm-7 input-style"
                    labelClassNames="col-sm-5"
                    disabled={true}
                />
                <ModalField
                    valueName="phone"
                    onChange={this.handleValueChanges}
                    labelText="Teléfono"
                    inputValue={this.props.shop.phone}
                    validators={[isPhone]}
                    forceVerify={this.state.forceVerify}
                    inputPlaceholder="24739702"
                />
            </div>
        </div>
    )

    renderPlaces = () => (
        <div className="col-sm-12">
            <div className="row veh-general-form acc-tab-content">
                <ModalPicture
                    valueName="map"
                    picture={this.props.shop.picture!}
                    picturePlaceholder={AvatarDefault}
                    labelClassNames="col-sm-5"
                />
                <ModalField
                    valueName="address"
                    onChange={this.handleValueChanges}
                    labelText="Dirección"
                    inputValue={this.props.shop.address}
                    inputPlaceholder="Colonia Miraflores zona 11"
                />
                <ModalField
                    valueName="placeName"
                    onChange={this.handleValueChanges}
                    labelText="Lugar"
                    inputValue={this.props.shop.placeName}
                    inputPlaceholder="Ciudad de Guatemala"
                />

            </div>
        </div>
    )

    renderBody = () => (
        <Modal.Body>
            <div className="row">{this.renderStaticFields()}</div>
            <div className="row" style={{ marginLeft: '5px', marginRight: '5px' }}>
                <Tabs activeKey={this.state.activeTab} onSelect={this.handleChangeTab} id="acc-prefs-tabs">
                    <Tab eventKey={TABS.GENERAL} title="Información General">
                        {this.state.activeTab === TABS.GENERAL && this.renderGeneral()}
                    </Tab>
                    <Tab eventKey={TABS.PLACE} title="Ubicaciones">
                        {this.state.activeTab === TABS.PLACE && this.renderPlaces()}
                    </Tab>
                </Tabs>
            </div>
        </Modal.Body>
    )

    render() {
        return (
            <Modal bsSize="lg" show={true} onHide={this.props.onClose}>
                {this.renderHeader()}
                {this.renderBody()}
                {this.renderFooter()}
            </Modal>
        );
    }
} 