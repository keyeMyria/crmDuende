import 'whatwg-fetch';
import { observable, action } from 'mobx';
import { Https } from '../../common/util/https';
import { Store } from '../types/store';

const API_URL: string = 'algo aqui ';

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

    @action fetchDataIfNeeded() {
        if (!this.stores || this.stores.length === 0) {
            this.fetchData();
        }
    }

    @action async fetchData(useFetching: boolean = true) {
        if (useFetching) { this.isFetching = true; }
        const res = await this.https.get(`${API_URL}?cmd=list`);
        if (res.success) {
            this.stores = res.data;
        }
        if (useFetching) { this.isFetching = false; }
    }

    @action resetAccounts() {
        this.store = { storeId: -1 } as Store;
    }

    @action updateStore(shop: Store): Promise<boolean> {
        return fetch(`${API_URL}?cmd=update&${encodeObject(shop)}`, defaultRequest)
            .then((response: Response) => response.json()
            ).then(({ success }: { success: boolean }) => {
                if (success) {
                    this.stores = this.stores.map((item: Store) => (
                        item.storeId === shop.storeId ? { ...item, ...shop } : item
                    ));
                }
                return success;
            }).catch(() => false);
    }
}

const encodeObject = (shop: Store) => {
    const keys = Object.keys(shop).filter(key => !!shop[key]);
    return keys.map(key => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(shop[key])}`;
    }).join('&');
};