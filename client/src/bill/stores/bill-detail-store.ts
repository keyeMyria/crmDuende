import { observable, action, toJS } from 'mobx';
import { Https } from '../../common/util/https';
import Store from '../../common/types/store';
import { encodeObject } from '../../common/util/encode-object';
import { BillDetail } from '../types/bill';

const API_URL = 'billDetail';

export default class BillDetailStore implements Store {
    @observable isFetching: boolean = false;
    @observable billsDetail: BillDetail[] = [] as BillDetail[];
    @observable billDetail: BillDetail = { id: -1 } as BillDetail;
    @observable isFetchingBillDetail: boolean = false;
    @observable errors: { [valueKey: string]: string };
    https: Https;

    constructor(https: Https) {
        this.https = https;
    }

    @action fetchBillDetailIfNeed() {
        if (this.billsDetail.length === 0) { this.fetchBillsDetail(); }
    }
    // fijar estructura s
    @action async fetchBillsDetail() {
        this.isFetching = true;
        const response = await this.https.get(`http://localhost:8080/${API_URL}`);
        if (response) {
            this.billsDetail = response || [];
        }
        this.isFetching = false;
        return response;
    }

    @action async fetchBillDetail(id: number) {
        this.isFetchingBillDetail = true;
        const response = await this.https.get(`http://localhost:8080/${API_URL}/${id}`);
        if (response) {
            this.billDetail = response;
        }
        this.isFetchingBillDetail = false;
        return response;
    }

    @action async deleteBillDetail(id: number) {
        const response = await this.https.delete(`http://localhost:8080/${API_URL}/${id}`);
        if (response) {
            this.billsDetail = this.billsDetail.filter(pur => pur.id !== id);
        } else { this.errors = response.errors; }
        return response;
    }

    @action async updateBillDetail(bDetail: BillDetail) {
        const form = new FormData();
        const response = await
            // tslint:disable-next-line:max-line-length
            this.https.put(`http://localhost:8080/${API_URL}/${bDetail.id}/${encodeObject(bDetail)}`, form);
        if (response) {
            const billDList = toJS(this.billsDetail);
            const bill = billDList.map(blsDetail => blsDetail.id === bDetail.id
                ? { ...blsDetail, ...bDetail, cost: `${bDetail.cost}` }
                : blsDetail
            );
            this.billsDetail = bill;
        } else { this.errors = response.errors; }
        return response;
    }

    @action async createBillDetail(bDetail: BillDetail): Promise<boolean> {
        const form = new FormData();
        delete bDetail.id; 
        // tslint:disable-next-line:max-line-length
        const response = await this.https.post(`http://localhost:8080/${API_URL}&${encodeObject(bDetail)}`, form);
        if (response) {
            this.billsDetail = this.billsDetail.concat({
                ...bDetail,
                cost: `${bDetail.cost}`
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