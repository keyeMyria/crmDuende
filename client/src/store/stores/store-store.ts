import 'whatwg-fetch';
import { observable, action } from 'mobx';
import AccountPreference, { TrackingScheduleJSON } from '../types/account-preference';
import { Https } from '../../common/util/https';

const ACC_PREFS_URL: string = '/ajax/accountPrefs.php';

export default class AccountStore {
    @observable isFetching: boolean = false;
    @observable account: AccountPreference = {} as AccountPreference;
    @observable accounts: AccountPreference[] = [] as AccountPreference[];
    @observable timezone: string = '';
    private https: Https;

    constructor(https: Https) {
        this.https = https;
    }

    @action fetchDataIfNeeded() {
        if (!this.accounts || this.accounts.length === 0) {
            this.fetchData();
        }
    }

    @action async fetchData(useFetching: boolean = true) {
        if (useFetching) { this.isFetching = true; }
        const res = await this.https.get(`${ACC_PREFS_URL}?cmd=list`);
        if (res.success) {
            this.accounts = res.data;
            this.timezone = res.timezone;
        }
        if (useFetching) { this.isFetching = false; }
    }

    @action setAccount(account: AccountPreference) {
        const scheduleJSON = (typeof account.tracking_schedule_json === 'string')
            ? JSON.parse(account.tracking_schedule_json as string)
            : account.tracking_schedule_json;
        const schedule = scheduleJSON ? addIndexToSchedule(scheduleJSON) : null;
        this.account = { ...account, tracking_schedule_json: schedule };
    }

    @action resetAccounts() {
        this.account = { id: '-1' } as AccountPreference;
    }

    @action async updateAccount(account: AccountPreference): Promise<boolean> {
        const form = prepareAccount(account);
        const res = await this.https.post(`${ACC_PREFS_URL}?cmd=update`, form);
        if (res.success) {
            this.accounts = this.accounts.map((item: AccountPreference) => (
                item.id === account.id ? { ...item, ...account } : item
            ));
        }
        return res.success;
    }
}

const prepareAccount = (account: AccountPreference) => {
    const acc = account;
    if (acc.tracking_schedule_json) {
        acc.tracking_schedule_json = removeIndexFromSchedule(acc.tracking_schedule_json);
    }
    const keys = Object.keys(acc);
    const form = new FormData();
    keys.forEach(key => {
        if (!!acc[key]) {
            if (key === 'tracking_schedule_json') {
                form.append(key, JSON.stringify(acc[key]));
            } else {
                form.append(key, acc[key]);
            }
        }
    });
    return form;
};