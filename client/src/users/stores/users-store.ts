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
        delete user.id;
        const response = await
            // tslint:disable-next-line:max-line-length
            this.https.put(`http://localhost:8080/${API_URL}/${user.id}?${encodeObject(user)}`, form);
        if (response) {
            const userList = toJS(this.users);
            this.users = userList;
        } else { this.errors = response.errors; }
        return response;
    }

    @action async createUser(user: User): Promise<boolean> {
        delete user.id;
        user.picture = 'jkdf';
        var data = JSON.stringify({
            "name": user.name,
            "lastName": user.lastName,
            "storeId": {
                "id": user.storeId
            },
            "userName": user.userName,
            "email": user.email,
            "phone": user.phone,
            "mobile": user.mobile,
            "picture": user.picture ? user.picture : "juasjuas"
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
            }
        });

        xhr.open("POST", "http://localhost:8080/users");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("Postman-Token", "b2544e6d-7f77-4641-b1fc-44834360d313");

        xhr.send(data);
        return true;
    }

}