import * as React from 'react';
import { BootstrapTable, TableHeaderColumn, SortOrder } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { Https } from '../../common/util/https';
import { Store } from '../types/store';
import Loading from '../../common/components/labels/loading';
const defaultSortOrder: SortOrder = 'asc';

interface StoresTableProps {
    stores: Store[];
    onStoresClick: (stre: Store) => void;
    isFetching: boolean;
    https: Https;
}

export default class StoresTable extends React.Component<StoresTableProps, {}> {

    tableOptions = {
        onRowClick: this.props.onStoresClick,
        sort: 'storeId',
        defaultSortName: 'storeId',
        noDataText: "No hay información que mostrar",
        sizePerPageList: [50],
        sizePerPage: 50,
        defaultSortOrder
    };

    renderTable = (): JSX.Element => (
        <BootstrapTable
            data={this.props.stores}
            options={this.tableOptions}
            hover={true}
            striped={true}
            pagination={true}
            ignoreSinglePage={true}
        >
            <TableHeaderColumn
                width="5%"
                dataField="storeId"
                isKey={true}
                dataSort={true}
                headerText="storeId"
            >
                Número de Tienda
            </TableHeaderColumn>
            <TableHeaderColumn width="15%" dataField="name" headerText="name">
                Nombre de Tienda
            </TableHeaderColumn>
            <TableHeaderColumn
                dataField="address"
                width="20%"
                dataSort={true}
                headerText="address"
            >
                Dirección
            </TableHeaderColumn>
            <TableHeaderColumn
                dataField="placeName"
                width="25%"
                dataSort={true}
                headerText="placeName"
            >
                Ubicación
            </TableHeaderColumn>
        </BootstrapTable>
    )

    render() {
        return this.props.isFetching ? <Loading /> : this.renderTable();
    }
} 