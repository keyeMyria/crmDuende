import { Https } from '../../../../common/util/https';
import UserStore from './user-store';
import { computed, toJS, action } from 'mobx';
import { User } from '../../../../users/types';

export class UserAndGroupStore {
    userStore: UserStore;

    constructor(https: Https) {
        this.userStore = new UserStore(https);
    }
    @computed get getUsersFilterItems(): (User)[] {
        return ([] as (User)[]).concat(toJS(this.userStore.getUsers));
    }

    @action fetchIfNeeded() {
        this.userStore.fetchUsersIfNeeded();
    }

    @computed get isLoading(): boolean {
        return this.userStore.isFetching;
    }
}