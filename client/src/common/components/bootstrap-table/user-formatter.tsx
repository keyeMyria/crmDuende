import User from '../../../users/types/users';

export default function userFormatter(userId: number, row: any, data: { users: User[] }): string {
    const selectedUser = data.users.find(user => user.id === userId);
    return selectedUser ? selectedUser.name! : '';
}
