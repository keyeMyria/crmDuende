import * as React from 'react';
import { Modal } from 'react-bootstrap';
import ModalField from '../../common/components/modal-field';
import { observer } from 'mobx-react';
import {
    required, noNumbers, noAccents
} from '../../common/components/input-validation/validators';
import { Product } from '../types/product';

interface ProductsModalProps {
    store: IndexStore;
    product: Product;
    show: boolean;
    onClose: () => void;
    onSubmit: () => void;
    showError: boolean;
}

interface ProductsModalState {
    errors: { [valueName: string]: boolean };
    forceVerify: boolean;
    wantSubmit: boolean;
    product: Product;

}

@observer
export default class ProductModal extends React.Component<ProductsModalProps, ProductsModalState> {

    state = {
        errors: {},
        forceVerify: false,
        wantSubmit: false,
        product: {} as Product
    };

    componentDidMount() {
        this.setState({ product: this.props.product });
    }

    componentWillUnmount() {
        this.props.store.driverStore.resetDriver();
    }

    shouldComponentUpdate(nextProps: ProductsModalProps, nextState: ProductsModalState) {
        const requiredFields = nextProps.product.productId === -1 ? 1 : 1;
        if (nextState.wantSubmit && Object.keys(nextState.errors).length === requiredFields) {
            this.trySubmit();
        }
        return true;
    }

    isEditing = () => this.props.product.productId !== -1;

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
        this.props.store.driverStore.driver = { ...this.props.store.driverStore.driver, [valueName]: change };
    }

    renderHeader = () => (
        <Modal.Header closeButton={true}>
            <Modal.Title>
                {
                    this.isEditing()
                        ? <span> Editando Categoría-ID: + {this.props.store.driver.}</span>
                        : <span> Nueva Categoría</span>
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
                <div className="col-sm-9">
                    <ModalField
                        valueName="name"
                        onChange={this.handleValueChanges}
                        labelText="Nombre"
                        inputValue={this.props.product.name}
                        isRequired={true}
                        validators={[required, noNumbers, noAccents]}
                        onChangeError={this.onInputErrorsChanges}
                        forceVerify={this.state.forceVerify}
                        autoFocus={true}
                    />
                    <ModalField
                        valueName="barCode"
                        onChange={this.handleValueChanges}
                        labelText="Código de Barras"
                        inputValue={this.props.product.barCode}
                        validators={[noAccents]}
                        onChangeError={this.onInputErrorsChanges}
                        forceVerify={this.state.forceVerify}
                    />
                    <ModalField
                        valueName="serialCode"
                        onChange={this.handleValueChanges}
                        labelText="Número de Serie"
                        inputValue={this.props.product.serialCode}
                        validators={[noAccents]}
                        onChangeError={this.onInputErrorsChanges}
                        forceVerify={this.state.forceVerify}
                    />
                    <ModalField
                        valueName="placeName"
                        onChange={this.handleValueChanges}
                        labelText="Lugar del Producto"
                        inputValue={this.props.product.placeName}
                        validators={[noAccents]}
                        onChangeError={this.onInputErrorsChanges}
                        forceVerify={this.state.forceVerify}
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
            <Modal bsSize="lg" show={true} onHide={this.props.onClose}>
                {this.renderHeader()}
                {this.chooseRender(this.props.product.categoryId !== -1)}
                {this.renderFooter()}
            </Modal>
        );
    }
}