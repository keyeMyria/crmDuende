import User from '../types/users';
import { observable, action, toJS } from 'mobx';
import { Https } from '../../common/util/https';
import Store from '../../common/types/store';
import { encodeObject } from '../../common/util/encode-object';

const API_URL = 'users';

export default class UserStore implements Store {
    @observable isFetching: boolean = false;
    @observable users: User[] = [] as User[];
    @observable user: User = { id: -1 } as User;
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
        const response = await this.https.get(`http://localhost:8080/${API_URL}`);
        if (response) {
            this.users = response || [];
        }
        this.isFetching = false;
        return response;
    }

    @action async fetchUser(id: number) {
        this.isFetchingUser = true;
        const response = await this.https.get(`http://localhost:8080/${API_URL}/${id}`);
        if (response) {
            this.user = response;
        }
        this.isFetchingUser = false;
        return response;
    }

    @action async deleteUser(id: number) {
        const response = await this.https.delete(`http://localhost:8080/${API_URL}/${id}`);
        if (response) {
            this.users = this.users.filter(user => user.id !== id);
        } else { this.errors = response.errors; }
        return response;
    }

    @action async updateUser(user: User) {
        const form = new FormData();
        const response = await
            // tslint:disable-next-line:max-line-length
            this.https.put(`http://localhost:8080/${API_URL}/${user.id}/${encodeObject(user)}`, form);
        if (response) {
            const userList = toJS(this.users);
            const users = userList.map(usr => usr.id === user.id
                ? { ...usr, ...user, name: `${user.name} ${user.lastName}` }
                : usr
            );
            this.users = users;
        } else { this.errors = response.errors; }
        return response;
    }

    @action async createUser(user: User): Promise<boolean> {
        const form = new FormData();
        delete user.id; 
        // tslint:disable-next-line:max-line-length
        const response = await this.https.post(`http://localhost:8080/${API_URL}&${encodeObject(user)}`, form);
        if (response) {
            this.users = this.users.concat({
                ...user,
                name: `${user.name} ${user.lastName}`
            });
        } else {
            if (response.errors.id) {
                this.errors = { ...response.errors, userName: response.errors.id };
            } else {
                this.errors = { ...response.errors };
            }
        }
        return response;
    }

}