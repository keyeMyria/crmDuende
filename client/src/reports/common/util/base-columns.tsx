import { datetimeFormatter } from '../../../common/components/bootstrap-table/datetime-formatter';
import { User } from '../../../users/types';

const dateFormat = (date: number) => datetimeFormatter(parseInt(`${date}000`, 10));

const getUsers = (id: number, row: {}, { users }: { users: User[] }) => users.find(user => user.id === id)!.name;

export const baseColumns = (users: User[]) => [
    {
        title: "Usuarios",
        dataField: 'user_id',
        dataFormat: getUsers,
        formatExtraData: { users },
        isKey: true
    },
    {
        title: "Fecha",
        dataField: 'date',
        dataFormat: dateFormat,
        dataSort: true,
    }
];