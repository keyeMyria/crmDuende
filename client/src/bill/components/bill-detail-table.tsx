import * as React from 'react';
import { BootstrapTable, TableHeaderColumn, SortOrder } from 'react-bootstrap-table';
import { observer } from 'mobx-react';
import { Https } from '../../common/util/https';
import Loading from '../../common/components/labels/loading';
import { BillDetail } from '../types/bill';

const defaultSortOrder: SortOrder = 'asc';

const TABLE_OPTIONS = {
    defaultSortName: 'id',
    sizePerPageList: [50],
    sizePerPage: 50,
    defaultSortOrder
};
// fijar estructura s
interface BillDetailTableProps {
    billsDetail: BillDetail[];
    onBillDetailClick: (pur: BillDetail) => void;
    isFetching: boolean;
    https: Https;
}

@observer
export default class BillDetailTable extends React.Component<BillDetailTableProps> {

    renderTable = () => {
        const { onBillDetailClick } = this.props;
        const billDetail = this.props.billsDetail;
        return (
            <div>
                <BootstrapTable
                    data={billDetail}
                    striped={true}
                    hover={true}
                    pagination={true}
                    ignoreSinglePage={true}
                    options={{
                        ...TABLE_OPTIONS,
                        noDataText: 'No hay información que mostrar',
                        onRowClick: onBillDetailClick
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