import * as React from 'react';
import { BootstrapTable, TableHeaderColumn, SortOrder } from 'react-bootstrap-table';
import DeleteIcon from '../../common/components/delete-icon';
import { observer } from 'mobx-react';
import { Https } from '../../common/util/https';
import Loading from '../../common/components/labels/loading';
import { Provider } from '../types/provider';

const defaultSortOrder: SortOrder = 'asc';

const TABLE_OPTIONS = {
    defaultSortName: 'name',
    sizePerPageList: [50],
    sizePerPage: 50,
    defaultSortOrder
};

interface ProviderTableProps {
    providers: Provider[];
    onProviderClick: (user: Provider) => void;
    onDeleteProvider: (id: number, provider: Provider) => void;
    isFetching: boolean;
    https: Https;
}

@observer
export default class ProviderTable extends React.Component<ProviderTableProps> {

    sortText = (a: string, b: string) => {
        if (a > b) { return 1; }
        if (a < b) { return -1; }
        return 0;
    }

    sortName = (a: Provider, b: Provider, order: 'desc' | 'asc') => {
        const aName = (a.name || '').toLowerCase();
        const bName = (b.name || '').toLowerCase();
        if (order === 'asc') {
            return this.sortText(aName, bName);
        } else {
            return this.sortText(bName, aName);
        }
    }

    filterValuePhone = (mobile: string, provider: Provider) => (
        `${mobile} ${provider.phone}`
    )

    filterValueName = (name: string, provider: Provider) => `${provider.name} ${provider.contactName}`;

    renderActionsCell = (id: number, provider?: Provider) => {
        return (
            <span className="table-options">
                <DeleteIcon id={id} onDelete={this.props.onDeleteProvider} extra={provider} />
            </span>
        );
    }

    renderCellName = (name: string, provider: Provider) => (
        <span>
            <div>
                ID : {provider.id} - ({provider.name})
            </div>
            <div className="description">
                <span>>>{provider.contactName}</span>
            </div>
        </span>
    )

    renderPhoneFormatter = (mobile: string, provider: Provider) => (
        <div>
            {provider.phone && <i className="icon-phone" />} {provider.phone}
            <br />
            {provider.mobile && <i className="icon-phone2" />} {provider.mobile}
        </div>
    )

    renderTable = () => {
        const { onProviderClick } = this.props;
        const providers = this.props.providers;
        return (
            <div>
                <BootstrapTable
                    data={providers}
                    striped={true}
                    hover={true}
                    pagination={true}
                    ignoreSinglePage={true}
                    options={{
                        ...TABLE_OPTIONS,
                        noDataText: 'No hay información que mostrar',
                        onRowClick: onProviderClick
                    }}
                >
                    <TableHeaderColumn
                        width="28%"
                        dataField="name"
                        dataSort={true}
                        filterValue={this.filterValueName}
                        sortFunc={this.sortName}
                        filter={{
                            type: 'TextFilter',
                            delay: 0,
                            placeholder: 'id, Nombre de contacto, Nombre del Provedor'
                        }}
                        dataFormat={this.renderCellName}
                        headerText="name"
                    >
                        Nombre del Provedor
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        width="28%"
                        dataField="email"
                        dataSort={true}
                        filter={{
                            type: 'TextFilter',
                            delay: 0,
                            placeholder: 'Filtrar por correo'
                        }}
                        headerText="email"
                    >
                        Correo
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        width="28%"
                        dataField="mobile"
                        dataSort={true}
                        dataFormat={this.renderPhoneFormatter}
                        filterValue={this.filterValuePhone}
                        filter={{
                            type: 'TextFilter',
                            delay: 0,
                            placeholder: 'Filtrar por teléfono'
                        }}
                        headerText="mobile"
                    >
                        Teléfono
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        width="10%"
                        dataField="id"
                        isKey={true}
                        dataFormat={this.renderActionsCell}
                        columnClassName="action-column"
                    />
                </BootstrapTable>
            </div>
        );
    }

    render() {
        return (this.props.isFetching ? <Loading /> : this.renderTable());
    }
}