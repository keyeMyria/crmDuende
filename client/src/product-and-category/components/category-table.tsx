import * as React from 'react';
import { BootstrapTable, TableHeaderColumn, SortOrder } from 'react-bootstrap-table';
import { observer } from 'mobx-react';
import { Https } from '../../common/util/https';
import { Loading } from '../../common/components/labels';
import { Category } from '../types/category';


const defaultSortOrder: SortOrder = 'asc';

interface CategoryTableProps {
    categories: Category[];
    onCategoryClick: (clients: Category) => void;
    isFetching: boolean;
    https: Https;
}
@observer
export default class CategoryTable extends React.Component<CategoryTableProps> {

    nameFilterValue = (name: string, catego: Category) => (
        `${name} ${catego.id}` 
    )

    renderCellName = (name: string, prdu: Category) => {
        return (
            <span>
                <div>
                    {name} {prdu.name}
                </div>
                <div className="description">
                    Código de Categoría {prdu.id}
                </div>
            </span>
        );
    }

    renderTable = () => {
        const { categories, onCategoryClick } = this.props;
        const options = {
            onRowClick: onCategoryClick,
            defaultSortName: 'name',
            sizePerPageList: [50],
            sizePerPage: 50,
            noDataText: "No hay información para mostrar",
            defaultSortOrder
        };

        return (
            <BootstrapTable
                data={categories}
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