import User from '../types/users';
import { observable, action, toJS } from 'mobx';
import { Https } from '../../common/util/https';
import Store from '../../common/types/store';
import { encodeObject } from '../../common/util/encode-object';

const API_URL = 'nose que ira aqui';

export default class UserStore implements Store {
    @observable isFetching: boolean = false;
    @observable users: User[] = [] as User[];
    @observable user: User = { userId: -1 } as User;
    @observable isFetchingUser: boolean = false;
    @observable errors: { [valueKey: string]: string };
    https: Https;

    constructor(https: Https) {
        this.https = https;
    }

    @action fetchUsersIfNeed() {
        if (this.users.length === 0) { this.fetchUsers(); }
    }

    @action async fetchUsers() {
        this.isFetching = true;
        const response = await this.https.get(`${API_URL}?cmd=list`);
        if (response.success) {
            this.users = response.data || [];
        }
        this.isFetching = false;
        return response.success;
    }

    @action async fetchUser(userId: number) {
        this.isFetchingUser = true;
        const response = await this.https.get(`${API_URL}?cmd=detail&userId=${userId}`);
        if (response.success) {
            this.user = response.data;
        }
        this.isFetchingUser = false;
        return response.success;
    }

    @action async deleteUser(userId: number) {
        const response = await this.https.get(`${API_URL}?cmd=delete&userId=${userId}`);
        if (response.success) {
            this.users = this.users.filter(user => user.userId !== userId);
        } else { this.errors = response.errors; }
        return response.success;
    }

    @action async updateUser(user: User) {
        const form = new FormData();
        const response = await
            this.https.post(`${API_URL}?cmd=update&userId=${user.userId}&${encodeObject(user)}`, form);
        if (response.success) {
            const userList = toJS(this.users);
            const users = userList.map(usr => usr.userId === user.userId
                ? { ...usr, ...user, name: `${user.name} ${user.lastName}` }
                : usr
            );
            this.users = users;
        } else { this.errors = response.errors; }
        return response.success;
    }

    @action async createUser(user: User): Promise<boolean> {
        const form = new FormData();
        const response = await this.https.post(`${API_URL}?cmd=create&${encodeObject(user)}`, form);
        if (response.success) {
            this.users = this.users.concat({
                ...user,
                userId: response.userId,
                name: `${user.name} ${user.lastName}`
            });
        } else {
            if (response.errors.userId) {
                this.errors = { ...response.errors, userName: response.errors.userId };
            } else {
                this.errors = { ...response.errors };
            }
        }
        return response.success;
    }

}