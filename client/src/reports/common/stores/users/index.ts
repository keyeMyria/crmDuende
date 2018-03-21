import { Https } from '../../../../common/util/https';
import UserStore from './user-store';
import UserGroupStore from './usergroup-store';
import { computed, toJS, action } from 'mobx';
import { UserGroup, User } from '../../../../users-manager/types/index';

export class UserAndGroupStore {
    userStore: UserStore;
    userGroupStore: UserGroupStore;

    constructor(https: Https) {
        this.userStore = new UserStore(https);
        this.userGroupStore = new UserGroupStore(https);
    }
    @computed get getUsersFilterItems(): (User | UserGroup)[] {
        return ([] as (User | UserGroup)[])
            .concat(toJS(this.userStore.getUsers), toJS(this.userGroupStore.getUserGroups));
    }
    
    @action fetchIfNeeded() {
        this.userStore.fetchUsersIfNeeded();
        this.userGroupStore.fetchUserGroupsIfNeeded();
    }

    @computed get isLoading(): boolean {
        return this.userStore.isFetching || this.userGroupStore.isFetching;
    }
}