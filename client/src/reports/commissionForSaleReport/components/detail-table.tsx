import * as React from 'react';
import { BootstrapTable, TableHeaderColumn, SortOrder } from 'react-bootstrap-table';
import { sortDate } from '../../common/sorts/date-sort';
import { dateFormatter } from '../../../common/components/bootstrap-table/date-formatter';
import { Https } from '../../../common/util/https';
import { observer } from 'mobx-react';
import { Loading } from '../../../common/components/labels/index';
import { Detail } from '../../common/types'; // Temporal

const defaultSortOrder: SortOrder = 'asc';

const TABLE_OPTIONS = {
    defaultSortName: 'date',
    defaultSortOrder
};

interface DetailTableProps {
    detailData: Detail[];
    usersList: { [id: number]: string };
    isFetching: boolean;
    https: Https;
}

@observer
export default class DetailTable extends React.Component<DetailTableProps> {

    sortDates = (a: Detail, b: Detail, order: 'asc' | 'desc') => (
        sortDate(a.date || a.startDate, b.startDate || b.date, order)
    )

    getUsers = (id: number) => this.props.usersList[id];

    renderTable = () => {
        const dataReport = this.props.detailData;
        return (
            <div>
                <BootstrapTable
                    key="cfs-report-table"
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
                        dataFormat={this.getUsers}
                        headerText="usersId"
                    >
                        Usuarios
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        width="14%"
                        dataField="date"
                        dataSort={true}
                        headerText="date"
                        dataFormat={dateFormatter}
                        sortFunc={this.sortDates}
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