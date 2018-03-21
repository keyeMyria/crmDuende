
import { observable, action, computed } from 'mobx';
import { User } from '../../../../users-manager/types/index';
import { Https } from '../../../../common/util/https';
import { dataFromWindow } from '../../util/data-from-window';
import { WINDOW_DATA_KEY } from '../../types/window-data-key';

const API_URL = '/ajax/users.php';

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
        if (window.users) {
            this.users = dataFromWindow(WINDOW_DATA_KEY.USERS);
        } else {
            this.isFetching = true;
            const response = await this.https.get(`${API_URL}?cmd=list`);
            if (response.success) {
                this.users = response.data || [];
            }
            this.isFetching = false;
        }
    }
    @computed get getUsers() { return this.users; }
}