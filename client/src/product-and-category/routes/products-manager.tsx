import * as React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { IndexStore } from '../stores';
import { Product } from '../types/product';
import ProductTable from '../components/products-table';
import ProductModal from '../components/products-modal';

interface ProductRouteState {
    showModal: boolean;
}

interface ProductProps {
    store: IndexStore;
}

@observer
export default class ProductManagerRoute extends React.Component<ProductProps, ProductRouteState> {
    state = {
        showModal: false
    };

    componentDidMount() {
     this.props.store.productsStore.fetchProductsIfNeed();
    }

    onProductClick = async (product: Product) => {
        const success = await this.props.store.productsStore.fetchProduct(product.id);
        if (success) { this.setState({ showModal: true }); }
    }

    onHideModal = () => {
        const showModal = false;
        this.props.store.productsStore.errors = {};
        this.setState({ showModal });
    }

    onSubmitProduct = async () => {
        const product = toJS(this.props.store.productsStore.product);
        const create = product.id === -1;
        if (create) {
            this.handleCreateProduct(product);
        } else {
            const isOk = await this.props.store.productsStore.updateProduct(product);
            const name = `${product.name || ''}`;
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

    handleCreateProduct = async (product: Product) => {
        const wasCreated = await this.props.store.productsStore.createProduct(toJS(product));
        const { name = '' } = product;
        if (wasCreated) {
            const message = 'Se ha creado correctamente';
            this.props.store.messages.add(message.replace('{name}', name), 'success');
            this.onHideModal();
        } else {
            const message = 'Ha ocurrido un error al actualizar al usuario';
            this.props.store.messages.add(message.replace('{name}', name), 'error');
        }
    }

    handleNewProduct = () => {
        this.props.store.productsStore.product = { id: -1 } as Product;
        this.setState({ showModal: true });
    }

    render() {
        return (
            <div>
                <div className="table-action-buttons">
                    <div className="right-header-app">
                        <button className="btn btn-primary" onClick={this.handleNewProduct}>
                            Ingreso de Nuevo Producto
                            </button>
                    </div>
                </div>
                <ProductTable
                    products={toJS(this.props.store.productsStore.products)}
                    onProductsClick={this.onProductClick}
                    isFetching={this.props.store.productsStore.isFetching}
                    https={this.props.store.https}
                />
                {this.state.showModal && (
                    <ProductModal
                        product={toJS(this.props.store.productsStore.product)}
                        store={this.props.store.productsStore}
                        show={this.state.showModal}
                        onClose={this.onHideModal}
                        onSubmit={this.onSubmitProduct}
                    />
                )}
            </div>
        );
    }
}