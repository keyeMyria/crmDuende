import * as React from 'react';
import { BootstrapTable, TableHeaderColumn, SortOrder } from 'react-bootstrap-table';
import { observer } from 'mobx-react';
import { Https } from '../../common/util/https';
import Loading from '../../common/components/labels/loading';
import { PurchasesDetail } from '../types/purchases';


const defaultSortOrder: SortOrder = 'asc';

const TABLE_OPTIONS = {
    defaultSortName: 'id',
    sizePerPageList: [50],
    sizePerPage: 50,
    defaultSortOrder
};
// fijar estructura s
interface PurchasesTableProps {
    purchasesDetail: PurchasesDetail[];
    onPurchaseDetailClick: (pur: PurchasesDetail) => void;
    isFetching: boolean;
    https: Https;
}

@observer
export default class PurchasesDetailTable extends React.Component<PurchasesTableProps> {

    renderTable = () => {
        const { onPurchaseDetailClick } = this.props;
        const purDetail = this.props.purchasesDetail;
        return (
            <div>
                <BootstrapTable
                    data={purDetail}
                    striped={true}
                    hover={true}
                    pagination={true}
                    ignoreSinglePage={true}
                    options={{
                        ...TABLE_OPTIONS,
                        noDataText: 'No hay información que mostrar',
                        onRowClick: onPurchaseDetailClick
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