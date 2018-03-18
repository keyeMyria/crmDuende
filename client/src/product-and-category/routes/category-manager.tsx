import * as React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { IndexStore } from '../stores';
import { Category } from '../types/category';
import CategoryModal from '../components/category-modal';
import CategoryTable from '../components/category-table';

interface CategoryRouteState {
    showModal: boolean;
}

interface CategoryProps {
    store: IndexStore;
}

@observer
export default class CategoryManagerRoute extends React.Component<CategoryProps, CategoryRouteState> {
    state = {
        showModal: false,
        showTraces: false,
        showPassword: false
    };

    componentDidMount() {
       // this.props.store.user.fetchUsersIfNeed();
    }

    onCategoryClick = async (category: Category) => {
        const success = await this.props.store.categoryStore.fetchCategory(category.categoryId);
        if (success) { this.setState({ showModal: true }); }
    }

    onHideModal = () => {
        const showModal = false;
        this.props.store.categoryStore.errors = {};
        this.setState({ showModal });
    }

    onSubmitCategory = async () => {
        const category = toJS(this.props.store.categoryStore.category);
        const create = category.categoryId === -1;
        if (create) {
            this.handleCreateCategory(category);
        } else {
            const isOk = await this.props.store.categoryStore.updateCategory(category);
            const name = `${category.name || ''}`;
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

    handleCreateCategory = async (category: Category) => {
        const wasCreated = await this.props.store.categoryStore.createCategory(toJS(category));
        const { name = '' } = category;
        if (wasCreated) {
            const message = 'Se ha creado correctamente';
            this.props.store.messages.add(message.replace('{name}', name), 'success');
            this.onHideModal();
        } else {
            const message = 'Ha ocurrido un error al actualizar al usuario';
            this.props.store.messages.add(message.replace('{name}', name), 'error');
        }
    }

    handleNewCategory = () => {
        this.props.store.categoryStore.category = { categoryId: -1 } as Category;
        this.setState({ showModal: true });
    }

    render() {
        return (
            <div>
                <div className="table-action-buttons">
                    <div className="right-header-app">
                        <button className="btn btn-primary" onClick={this.handleNewCategory}>
                            Nuevo Usuario
                            </button>
                    </div>
                </div>
                <CategoryTable
                    categories={toJS(this.props.store.categoryStore.categories)}
                    onCategoryClick={this.onCategoryClick}
                    isFetching={this.props.store.categoryStore.isFetching}
                    https={this.props.store.https}
                />
                {this.state.showModal && (
                    <CategoryModal
                        category={toJS(this.props.store.categoryStore.category)}
                        store={this.props.store}
                        show={this.state.showModal}
                        onClose={this.onHideModal}
                        onSubmit={this.onSubmitCategory}
                    />
                )}
            </div>
        );
    }
}