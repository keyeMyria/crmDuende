import * as React from 'react';
import { BootstrapTable, TableHeaderColumn, SortOrder } from 'react-bootstrap-table';
import { observer } from 'mobx-react';
import { Https } from '../../common/util/https';
import Loading from '../../common/components/labels/loading';
import { ExistenceLine } from '../types/existence-line';


const defaultSortOrder: SortOrder = 'asc';

const TABLE_OPTIONS = {
    defaultSortName: 'id',
    sizePerPageList: [50],
    sizePerPage: 50,
    defaultSortOrder
};
// fijar estructura s
interface ExistenceTableProps {
    existences: ExistenceLine[];
    onExistenceLineClick: (existence: ExistenceLine) => void;
    isFetching: boolean;
    https: Https;
}

@observer
export default class ExistenceLineTable extends React.Component<ExistenceTableProps> {

    renderTable = () => {
        const { onExistenceLineClick } = this.props;
        const existence = this.props.existences;
        return (
            <div>
                <BootstrapTable
                    data={existence}
                    striped={true}
                    hover={true}
                    pagination={true}
                    ignoreSinglePage={true}
                    options={{
                        ...TABLE_OPTIONS,
                        noDataText: 'No hay información que mostrar',
                        onRowClick: onExistenceLineClick
                    }}
                >
                    <TableHeaderColumn
                        width="28%"
                        dataField="name"
                        dataSort={true}
                    >
                        Nombre
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        width="28%"
                        dataField="email"
                    >
                        Correo
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        width="28%"
                        dataField="mobile"
                        dataSort={true}
                    >
                        Teléfono
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        width="10%"
                        dataField="id"
                        isKey={true}
                    />
                </BootstrapTable>
            </div>
        );
    }

    render() {
        return (this.props.isFetching ? <Loading /> : this.renderTable());
    }
}