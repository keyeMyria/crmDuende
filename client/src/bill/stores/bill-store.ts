import { observable, action, toJS } from 'mobx';
import { Https } from '../../common/util/https';
import Store from '../../common/types/store';
import { encodeObject } from '../../common/util/encode-object';
import { Bill } from '../types/bill';

const API_URL = 'bill';
export default class BillStore implements Store {
    @observable isFetching: boolean = false;
    @observable bills: Bill[] = [] as Bill[];
    @observable bill: Bill = { id: -1 } as Bill;
    @observable isFetchingBill: boolean = false;
    @observable errors: { [valueKey: string]: string };
    https: Https;

    constructor(https: Https) {
        this.https = https;
    }

    @action fetchBillIfNeed() {
        if (this.bills.length === 0) { this.fetchBills(); }
    }
    // fijar estructura s
    @action async fetchBills() {
        this.isFetching = true;
        const response = await this.https.get(`http://localhost:8080/${API_URL}`);
        if (response) {
            this.bills = response || [];
        }
        this.isFetching = false;
        return response;
    }

    @action async fetchBill(id: number) {
        this.isFetchingBill = true;
        const response = await this.https.get(`http://localhost:8080/${API_URL}/${id}`);
        if (response) {
            this.bill = response;
        }
        this.isFetchingBill = false;
        return response;
    }

    @action async deleteBill(id: number) {
        const response = await this.https.delete(`http://localhost:8080/${API_URL}/${id}`);
        if (response) {
            this.bills = this.bills.filter(bill => bill.id !== id);
        } else { this.errors = response.errors; }
        return response;
    }

    @action async updateBill(bill: Bill) {
        const form = new FormData();
        const response = await
            // tslint:disable-next-line:max-line-length
            this.https.put(`http://localhost:8080/${API_URL}/${bill.id}/${encodeObject(bill)}`, form);
        if (response) {
            const billList = toJS(this.bills);
            const bills = billList.map(bls => bls.id === bill.id
                ? { ...bls, ...bill, numBill: `${bill.numBill}` }
                : bls
            );
            this.bills = bills;
        } else { this.errors = response.errors; }
        return response;
    }

    @action async createBill(bill: Bill): Promise<boolean> {
        const form = new FormData();
        delete bill.id;
        // tslint:disable-next-line:max-line-length
        const response = await this.https.post(`http://localhost:8080/${API_URL}&${encodeObject(bill)}`, form);
        if (response) {
            this.bills = this.bills.concat({
                ...bill,
                numBill: `${bill.numBill}`
            });
        } else {
            if (response.errors.id) {
                this.errors = { ...response.errors, numBill: response.errors.id };
            } else {
                this.errors = { ...response.errors };
            }
        }
        return response;
    }

}