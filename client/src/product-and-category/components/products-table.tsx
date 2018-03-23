import * as React from 'react';
import { BootstrapTable, TableHeaderColumn, SortOrder } from 'react-bootstrap-table';
import { observer } from 'mobx-react';
import { Https } from '../../common/util/https';
import { Loading } from '../../common/components/labels';
import { Product } from '../types/product';

const defaultSortOrder: SortOrder = 'asc';

interface ProductsTableProps {
    products: Product[];
    onProductsClick: (clients: Product) => void;
    isFetching: boolean;
    https: Https;
}
@observer
export default class ProductTable extends React.Component<ProductsTableProps> {

    nameFilterValue = (name: string, catego: Product) => (
        `${name} ${catego.serialCode} ${catego.categoryId}`
    )

    renderCellName = (name: string, prdu: Product) => {
        return (
            <span>
                <div>
                    {name} {prdu.name}
                </div>
                <div className="description">
                    Código de Categoría {prdu.categoryId}
                </div>
            </span>
        );
    }

    renderTable = () => {
        const { products, onProductsClick } = this.props;
        const options = {
            onRowClick: onProductsClick,
            defaultSortName: 'name',
            sizePerPageList: [50],
            sizePerPage: 50,
            noDataText: "No hay información para mostrar",
            defaultSortOrder
        };

        return (
            <BootstrapTable
                data={products}
                striped={true}
                hover={true}
                options={options}
            >
                <TableHeaderColumn
                    dataField="categoryId"
                    width="5%"
                >
                    ID De Categoría
                </TableHeaderColumn>
                <TableHeaderColumn
                    width="31%"
                    dataField="name"
                    dataSort={true}
                    filter={{
                        type: 'TextFilter',
                        placeholder: "Filtrar Categoría"
                    }}
                    headerText="name"
                    dataFormat={this.renderCellName}
                    filterValue={this.nameFilterValue}
                >
                    Nombre De Categoría
                </TableHeaderColumn>
                <TableHeaderColumn
                    width="15%"
                    dataField="description"
                    dataSort={true}
                    isKey={true}
                >
                    Descripción de Categoría
                </TableHeaderColumn>
            </BootstrapTable>
        );
    }

    render() {
        return this.props.isFetching ? <Loading /> : this.renderTable();
    }
}