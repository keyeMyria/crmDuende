import { User } from '../../../users-manager/types';

export default function userFormatter (userId: string, row: any, data: { users: User[]}): string {
    const selectedUser = data.users.find( user => user.id === userId);
    return selectedUser ? selectedUser.name : '';
}
