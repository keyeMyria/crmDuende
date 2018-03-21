import { observable, action, toJS } from 'mobx';
import { Https } from '../../common/util/https';
import Store from '../../common/types/store';
import { encodeObject } from '../../common/util/encode-object';
import { Purchases } from '../types/purchases';

const API_URL = 'purchases';

export default class PurchasesStore implements Store {
    @observable isFetching: boolean = false;
    @observable purchases: Purchases[] = [] as Purchases[];
    @observable purchase: Purchases = { id: -1 } as Purchases;
    @observable isFetchingPurchase: boolean = false;
    @observable errors: { [valueKey: string]: string };
    https: Https;

    constructor(https: Https) {
        this.https = https;
    }

    @action fetchPurchasesIfNeed() {
        if (this.purchases.length === 0) { this.fetchPurchases(); }
    }
// fijar estructura s
    @action async fetchPurchases() {
        this.isFetching = true;
        const response = await this.https.get(`http://localhost:8080/${API_URL}`);
        if (response) {
            this.purchases = response || [];
        }
        this.isFetching = false;
        return response;
    }

    @action async fetchPurchase(id: number) {
        this.isFetchingPurchase = true;
        const response = await this.https.get(`http://localhost:8080/${API_URL}/${id}`);
        if (response) {
            this.purchase = response;
        }
        this.isFetchingPurchase = false;
        return response;
    }

    @action async deletePurchase(id: number) {
        const response = await this.https.delete(`http://localhost:8080/${API_URL}/${id}`);
        if (response) {
            this.purchases = this.purchases.filter(pur => pur.id !== id);
        } else { this.errors = response.errors; }
        return response;
    }

    @action async updatePurchase(pur: Purchases) {
        const form = new FormData();
        const response = await
            // tslint:disable-next-line:max-line-length
            this.https.put(`http://localhost:8080/${API_URL}/${pur.id}/${encodeObject(pur)}`, form);
        if (response) {
            const purchaseList = toJS(this.purchases);
            const purches = purchaseList.map(prid => prid.id === pur.id
                ? { ...prid, ...pur, documentNumber: `${pur.documentNumber}` }
                : prid
            );
            this.purchases = purches;
        } else { this.errors = response.errors; }
        return response;
    }

    @action async createPurchases(pur: Purchases): Promise<boolean> {
        const form = new FormData();
        delete pur.id; 
        // tslint:disable-next-line:max-line-length
        const response = await this.https.post(`http://localhost:8080/${API_URL}&${encodeObject(pur)}`, form);
        if (response) {
            this.purchases = this.purchases.concat({
                ...pur,
                documentNumber: `${pur.documentNumber}`
            });
        } else {
            if (response.errors.id) {
                this.errors = { ...response.errors, documentNumber: response.errors.id };
            } else {
                this.errors = { ...response.errors };
            }
        }
        return response;
    }

}
