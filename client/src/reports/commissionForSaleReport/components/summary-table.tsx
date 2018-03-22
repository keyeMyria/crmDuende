import * as React from 'react';
import { BootstrapTable, TableHeaderColumn, SortOrder } from 'react-bootstrap-table';
import { Https } from '../../../common/util/https';
import { observer } from 'mobx-react';
import { Loading } from '../../../common/components/labels/index';

const defaultSortOrder: SortOrder = 'asc';

const TABLE_OPTIONS = {
    defaultSortName: 'driver_id',
    defaultSortOrder
};

interface SummaryTableProps {
    summaryData: any[];
    usersList: { [id: number]: string };
    isFetching: boolean;
    https: Https;
}

@observer
export default class SummaryTable extends React.Component<SummaryTableProps> {
    
    getDrivers = (id: number) => this.props.usersList[id];

    renderTable = () => {
        const dataReport = this.props.summaryData;
        return (
            <div>
                <BootstrapTable
                    key="summary-report-table"
                    data={dataReport}
                    striped={true}
                    pagination={false}
                    bordered={false}
                    options={{
                        ...TABLE_OPTIONS,
                        noDataText: "No hay información que mostrar",
                    }}
                >
                    <TableHeaderColumn
                        width="15%"
                        isKey={true}
                        dataField="usersId"
                        dataSort={true}
                        headerText="usersId"
                    >
                        Usuarios
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        width="14%"
                        dataField="date"
                        dataSort={true}
                        headerText="date"
                    >
                      Fecha
                    </TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }

    render() {
        return (this.props.isFetching ? <Loading /> : this.renderTable());
    }
}