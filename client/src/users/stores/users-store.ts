import User from '../types/user';
import { observable, action, toJS } from 'mobx';
import { Https } from '../../common/util/https';
import Store from '../../common/types/store';

const API_URL = 'nose que ira aqui';

export default class UserStore implements Store {
    @observable isFetching: boolean = false;
    @observable users: User[] = [] as User[];
    @observable user: User = { id: '-1' } as User;
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

    @action async fetchUser(id: string) {
        this.isFetchingUser = true;
        const response = await this.https.get(`${API_URL}?cmd=detail&id=${id}`);
        if (response.success) {
            this.user = response.data;
        }
        this.isFetchingUser = false;
        return response.success;
    }

    @action async deleteUser(id: string) {
        const response = await this.https.get(`${API_URL}?cmd=delete&id=${id}`);
        if (response.success) {
            this.users = this.users.filter(user => user.id !== id);
        } else { this.errors = response.errors; }
        return response.success;
    }

    @action async updateUser(user: User) {
        const form = new FormData();
        const response = await
            this.https.post(`${API_URL}?cmd=update&user_id=${user.id}&${encodeObject(user)}`, form);
        if (response.success) {
            const userList = toJS(this.users);
            const users = userList.map(usr => usr.id === user.id
                ? { ...usr, ...user, name: `${user.name} ${user.last_name}` }
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
                id: response.id,
                name: `${user.name} ${user.last_name}`
            });
        } else {
            if (response.errors.id) {
                this.errors = { ...response.errors, username: response.errors.id };
            } else {
                this.errors = { ...response.errors };
            }
        }
        return response.success;
    }

    encodeObject = (user: User) => {
        return Object.keys(user).filter(key => key !== 'id').map(key => {
            return `${encodeURIComponent(key)}=${encodeURIComponent(user[key])}`;
        }).join('&');

    }
}