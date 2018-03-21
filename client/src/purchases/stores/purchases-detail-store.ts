import { observable, action, toJS } from 'mobx';
import { Https } from '../../common/util/https';
import Store from '../../common/types/store';
import { encodeObject } from '../../common/util/encode-object';
import { PurchasesDetail } from '../types/purchases';


const API_URL = 'purchasesDetail';

export default class PurchasesDetailStore implements Store {
    @observable isFetching: boolean = false;
    @observable purchasesDetail: PurchasesDetail[] = [] as PurchasesDetail[];
    @observable purchaseDetail: PurchasesDetail = { id: -1 } as PurchasesDetail;
    @observable isFetchingPurchaseDetail: boolean = false;
    @observable errors: { [valueKey: string]: string };
    https: Https;

    constructor(https: Https) {
        this.https = https;
    }

    @action fetchPurchasesDetailIfNeed() {
        if (this.purchasesDetail.length === 0) { this.fetchPurchasesDetail(); }
    }
    // fijar estructura s

    @action async fetchPurchasesDetail() {
        this.isFetching = true;
        const response = await this.https.get(`http://localhost:8080/${API_URL}`);
        if (response) {
            this.purchasesDetail = response || [];
        }
        this.isFetching = false;
        return response;
    }

    @action async fetchPurchaseDetail(id: number) {
        this.isFetchingPurchaseDetail = true;
        const response = await this.https.get(`http://localhost:8080/${API_URL}/${id}`);
        if (response) {
            this.purchaseDetail = response;
        }
        this.isFetchingPurchaseDetail = false;
        return response;
    }

    @action async deletePurchaseDetail(id: number) {
        const response = await this.https.delete(`http://localhost:8080/${API_URL}/${id}`);
        if (response) {
            this.purchasesDetail = this.purchasesDetail.filter(pur => pur.id !== id);
        } else { this.errors = response.errors; }
        return response;
    }

    @action async updatePurchaseDetail(purDetail: PurchasesDetail) {
        const form = new FormData();
        const response = await
            // tslint:disable-next-line:max-line-length
            this.https.put(`http://localhost:8080/${API_URL}/${purDetail.id}/${encodeObject(purDetail)}`, form);
        if (response) {
            const purchaseList = toJS(this.purchasesDetail);
            const purches = purchaseList.map(prid => prid.id === purDetail.id
                ? { ...prid, ...purDetail, cost: `${purDetail.cost}` }
                : prid
            );
            this.purchasesDetail = purches;
        } else { this.errors = response.errors; }
        return response;
    }

    @action async createPurchasesDetail(purDetail: PurchasesDetail): Promise<boolean> {
        const form = new FormData();
        delete purDetail.id; 
        // tslint:disable-next-line:max-line-length
        const response = await this.https.post(`http://localhost:8080/${API_URL}&${encodeObject(purDetail)}`, form);
        if (response) {
            this.purchasesDetail = this.purchasesDetail.concat({
                ...purDetail,
                cost: `${purDetail.cost}`
            });
        } else {
            if (response.errors.id) {
                this.errors = { ...response.errors, cost: response.errors.id };
            } else {
                this.errors = { ...response.errors };
            }
        }
        return response;
    }

}