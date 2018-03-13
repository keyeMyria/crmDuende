import * as React from 'react';
import { BootstrapTable, TableHeaderColumn, SortOrder } from 'react-bootstrap-table';
import DeleteIcon from '../../common/components/delete-icon';
import pictureCellFormat from '../../common/components/bootstrap-table/picture-cell-format';
import { observer } from 'mobx-react';
import { Https } from '../../common/util/https';
import { Client } from '../types/clients';
import { Loading } from '../../common/components/labels';
const AvatarDefault: NodeRequire = require('../../common/resources/pictures/avatar-default.svg');
const defaultSortOrder: SortOrder = 'asc';

interface ClientsTableProps {
    clients: Client[];
    onClientClick: (clients: Client) => void;
    onDeleteClient: (id: number, client: Client) => void;
    isFetching: boolean;
    https: Https;
}
@observer
export default class ClientTable extends React.Component<ClientsTableProps> {

    nameFilterValue = (name: string, client: Client) => (
        `${name} ${client.email} ${client.lastName} ${client.clientId}`
    )

    getDescription = (client: Client): any => {
        if (!client.email && !client.userName) {
            return '';
        } else if (!client.email && client.location) {
            return <span>Nombre de usuario</span> + ': ' + `${client.location}`;
        } else if (!client.userName && client.email) {
            return `${client.email}`;
        }
        return (
            <div>
                {client.email}
                &nbsp;&bull;&nbsp;
                        {<span> Nombre de usuario</span> + ':' + client.userName}
            </div>
        );
    }

    renderActionsCell = (id: number, client: Client) => {
        return (
            <span className="table-options">
                <DeleteIcon id={id} extra={client} onDelete={this.props.onDeleteClient} />
            </span>
        );
    }

    renderCellName = (name: string, driver: Client) => {
        return (
            <span>
                <div>
                    {name} {driver.lastName}
                </div>
                <div className="description">
                    {this.getDescription(driver)}
                </div>
            </span>
        );
    }

    renderTable = () => {
        const { clients, onClientClick } = this.props;
        const options = {
            onRowClick: onClientClick,
            defaultSortName: 'name',
            sizePerPageList: [50],
            sizePerPage: 50,
            noDataText: "No hay información para mostrar",
            defaultSortOrder
        };

        return (
            <BootstrapTable
                data={clients}
                striped={true}
                hover={true}
                options={options}
            >
                <TableHeaderColumn
                    dataField="picture"
                    width="5%"
                    dataFormat={pictureCellFormat}
                    formatExtraData={{
                        picturePlaceholder: AvatarDefault
                    }}
                />
                <TableHeaderColumn
                    width="31%"
                    dataField="name"
                    dataSort={true}
                    filter={{
                        type: 'TextFilter',
                        placeholder: "Filtrar cliente"
                    }}
                    headerText="name"
                    dataFormat={this.renderCellName}
                    filterValue={this.nameFilterValue}
                >
                    Nombre
                </TableHeaderColumn>
                <TableHeaderColumn
                    width="15%"
                    dataField="mobile"
                    dataSort={true}
                >
                    Teléfono
                </TableHeaderColumn>
                <TableHeaderColumn
                    width="7%"
                    dataField="clientId"
                    isKey={true}
                    dataFormat={this.renderActionsCell}
                />
            </BootstrapTable>
        );
    }

    render() {
        return this.props.isFetching ? <Loading /> : this.renderTable();
    }
}