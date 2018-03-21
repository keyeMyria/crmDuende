import { observable, action, computed } from 'mobx';
import { UserGroup } from '../../../../users-manager/types/index';
import { Https } from '../../../../common/util/https';
import { dataFromWindow } from '../../util/data-from-window';

const API_URL = '/ajax/userGroups.php';

export default class UserGroupsStore {
    @observable isFetching: boolean = false;
    @observable userGroups: UserGroup[] = [] as UserGroup[];
    private https: Https;

    constructor(https: Https) {
        this.https = https;
    }

    @action fetchUserGroupsIfNeeded() {
        if (this.userGroups.length === 0) { this.fetchUserGroups(); }
    }

    @action async fetchUserGroups() {
        if (window.userGroups) {
            this.userGroups = dataFromWindow('userGroups');
        } else {
            this.isFetching = true;
            const res = await this.https.get(`${API_URL}?cmd=list`);
            if (res.success) {
                this.userGroups = res.data || [];
            }
            this.isFetching = false;
        }
    }

    @computed get getUserGroups() {
        return this.userGroups.map(
            group => { return { ...group, id: `g-${group.id}` }; }
        );
    }
}