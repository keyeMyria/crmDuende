import 'whatwg-fetch';
import { observable, action } from 'mobx';
import { Https } from '../../common/util/https';
import { Store } from '../types/store';

const API_URL: string = 'stores';

const defaultRequest: RequestInit = {
    method: 'GET',
    credentials: 'same-origin',
};
export default class StoreStore {
    @observable isFetching: boolean = false;
    @observable store: Store = {} as Store;
    @observable stores: Store[] = [] as Store[];
    private https: Https;

    constructor(https: Https) {
        this.https = https;
    }

    encodeObject = (shop: Store) => {
        const keys = Object.keys(shop).filter(key => !!shop[key]);
        return keys.map(key => {
            return `${encodeURIComponent(key)}=${encodeURIComponent(shop[key])}`;
        }).join('/');
    }

    @action fetchDataIfNeeded() {
        if (!this.stores || this.stores.length === 0) {
            this.fetchData();
        }
    }

    @action async fetchData(useFetching: boolean = true) {
        if (useFetching) { this.isFetching = true; }
        const res = await this.https.get(`http://localhost:8080/${API_URL}`);
        if (res) {
            this.stores = res || [];
        }
        if (useFetching) { this.isFetching = false; }
    }

    @action resetAccounts() {
        this.store = { id: -1 } as Store;
    }

    @action updateStore(shop: Store): Promise<boolean> {
        return fetch(`http://localhost:8080/${API_URL}?cmd=update&${this.encodeObject(shop)}`, defaultRequest)
            .then((response: Response) => response.json()
            ).then(({ success }: { success: boolean }) => {
                if (success) {
                    this.stores = this.stores.map((item: Store) => (
                        item.id === shop.id ? { ...item, ...shop } : item
                    ));
                }
                return success;
            }).catch(() => false);
    }
}