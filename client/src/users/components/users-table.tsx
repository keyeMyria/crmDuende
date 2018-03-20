import * as React from 'react';
import { User } from '../types';
import { BootstrapTable, TableHeaderColumn, SortOrder } from 'react-bootstrap-table';
import DeleteIcon from '../../common/components/delete-icon';
import pictureCellFormat from '../../common/components/bootstrap-table/picture-cell-format';
import { observer } from 'mobx-react';
import { Https } from '../../common/util/https';
import Loading from '../../common/components/labels/loading';

require('../styles/users.css');
const AvatarDefault: NodeRequire = require('../../common/resources/pictures/avatar-default.svg');
const defaultSortOrder: SortOrder = 'asc';

const TABLE_OPTIONS = {
    defaultSortName: 'name',
    sizePerPageList: [50],
    sizePerPage: 50,
    defaultSortOrder
};

interface UserTableProps {
    users: User[];
    onUserClick: (user: User) => void;
    onDeleteUser: (id: number, user: User) => void;
    isFetching: boolean;
    https: Https;
}

@observer
export default class UserTable extends React.Component<UserTableProps> {

    sortText = (a: string, b: string) => {
        if (a > b) { return 1; }
        if (a < b) { return -1; }
        return 0;
    }

    sortName = (a: User, b: User, order: 'desc' | 'asc') => {
        const aName = (a.name || '').toLowerCase();
        const bName = (b.name || '').toLowerCase();
        if (order === 'asc') {
            return this.sortText(aName, bName);
        } else {
            return this.sortText(bName, aName);
        }
    }

    filterValuePhone = (mobile: string, user: User) => (
        `${mobile} ${user.phone}`
    )

    filterValueName = (name: string, user: User) => `${user.name} ${user.userName}`;

    renderActionsCell = (id: number, user?: User) => {
        return (
            <span className="table-options">
                <DeleteIcon id={id} onDelete={this.props.onDeleteUser} extra={user} />
            </span>
        );
    }

    renderCellName = (name: string, user: User) => (
        <span>
            <div>
                {user.name} {user.lastName}
            </div>
            <div className="description">
                <span>@{user.userName}</span>
            </div>
        </span>
    )

    renderPhoneFormatter = (mobile: string, user: User) => (
        <div>
            {user.phone && <i className="icon-phone" />} {user.phone}
            <br />
            {user.mobile && <i className="icon-phone2" />} {user.mobile}
        </div>
    )

    renderTable = () => {
        const { onUserClick } = this.props;
        const users = this.props.users;
        return (
            <div>
                <BootstrapTable
                    data={users}
                    striped={true}
                    hover={true}
                    pagination={true}
                    ignoreSinglePage={true}
                    options={{
                        ...TABLE_OPTIONS,
                        noDataText: 'No hay información que mostrar',
                        onRowClick: onUserClick
                    }}
                >
                    <TableHeaderColumn
                        dataField="picture"
                        width="6%"
                        dataFormat={pictureCellFormat}
                        formatExtraData={{ picturePlaceholder: AvatarDefault }}
                    />
                    <TableHeaderColumn
                        width="28%"
                        dataField="name"
                        dataSort={true}
                        filterValue={this.filterValueName}
                        sortFunc={this.sortName}
                        filter={{
                            type: 'TextFilter',
                            delay: 0,
                            placeholder: 'id, username, name'
                        }}
                        dataFormat={this.renderCellName}
                        headerText="name"
                    >
                        Nombre
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
                        dataField="userId"
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