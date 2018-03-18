import * as React from 'react';
import { Modal } from 'react-bootstrap';
import ModalField from '../../common/components/modal-field';
import { observer } from 'mobx-react';
import {
    required, noNumbers, noAccents
} from '../../common/components/input-validation/validators';
import { Category } from '../types/category';
import { IndexStore } from '../stores';

interface CategoryModalProps {
    store: IndexStore;
    category: Category;
    show: boolean;
    onClose: () => void;
    onSubmit: () => void;
}

interface CategoryModalState {
    errors: { [valueName: string]: boolean };
    forceVerify: boolean;
    wantSubmit: boolean;
    category: Category;

}

@observer
export default class CategoryModal extends React.Component<CategoryModalProps, CategoryModalState> {

    state = {
        errors: {},
        forceVerify: false,
        wantSubmit: false,
        category: {} as Category
    };

    componentDidMount() {
        this.setState({ category: this.props.category });
    }

    shouldComponentUpdate(nextProps: CategoryModalProps, nextState: CategoryModalState) {
        const requiredFields = nextProps.category.categoryId === -1 ? 1 : 1;
        if (nextState.wantSubmit && Object.keys(nextState.errors).length === requiredFields) {
            this.trySubmit();
        }
        return true;
    }

    isEditing = () => this.props.category.categoryId !== -1;

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
        this.props.store.categoryStore.category = { ...this.props.store.categoryStore.category, [valueName]: change };
    }

    renderHeader = () => (
        <Modal.Header closeButton={true}>
            <Modal.Title>
                {
                    this.isEditing()
                        ? <span> Editando Categoría-ID: + {this.props.store.categoryStore.category.categoryId}</span>
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
                        inputValue={this.props.category.name}
                        isRequired={true}
                        validators={[required, noNumbers, noAccents]}
                        onChangeError={this.onInputErrorsChanges}
                        forceVerify={this.state.forceVerify}
                        autoFocus={true}
                        labelClassNames={'col-sm-4'}
                        inputClassNames={'col-sm-8'}
                    />
                    <ModalField
                        valueName="description"
                        onChange={this.handleValueChanges}
                        labelText="Descripción"
                        inputValue={this.props.category.description}
                        validators={[noAccents]}
                        onChangeError={this.onInputErrorsChanges}
                        forceVerify={this.state.forceVerify}
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
            <Modal bsSize="lg" show={true} onHide={this.props.onClose}>
                {this.renderHeader()}
                {this.chooseRender(this.props.category.categoryId !== -1)}
                {this.renderFooter()}
            </Modal>
        );
    }
}