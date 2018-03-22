
import { observable, action, computed } from 'mobx';
import { Https } from '../../../../common/util/https';
import { User } from '../../../../users/types';

const API_URL = 'users';
export default class UserStore {
    @observable isFetching: boolean = false;
    @observable users: User[] = [] as User[];
    https: Https;

    constructor(https: Https) {
        this.https = https;
    }

    @action fetchUsersIfNeeded() {
        if (this.users.length === 0) { this.fetchUsers(); }
    }

    @action async fetchUsers() {
        this.isFetching = true;
        const response = await this.https.get(`http://localhost:8080/${API_URL}`);
        if (response) {
            this.users = response || [];
        }
        this.isFetching = false;
    }
    @computed get getUsers() { return this.users; }
}