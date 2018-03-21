import { observable, action, toJS } from 'mobx';
import { Https } from '../../common/util/https';
import Store from '../../common/types/store';
import { encodeObject } from '../../common/util/encode-object';
import { ExistenceLine } from '../types/existence-line';

const API_URL = 'existenceLine';

export default class ExistenceLineStore implements Store {
    @observable isFetching: boolean = false;
    @observable existences: ExistenceLine[] = [] as ExistenceLine[];
    @observable existence: ExistenceLine = { id: -1 } as ExistenceLine;
    @observable isFetchingExistenceLine: boolean = false;
    @observable errors: { [valueKey: string]: string };
    https: Https;

    constructor(https: Https) {
        this.https = https;
    }

    @action fetchExistenceLineIfNeed() {
        if (this.existences.length === 0) { this.fetchExistences(); }
    }

    @action async fetchExistences() {
        this.isFetching = true;
        const response = await this.https.get(`http://localhost:8080/${API_URL}`);
        if (response) {
            this.existences = response || [];
        }
        this.isFetching = false;
        return response;
    }

    @action async fetchExistence(id: number) {
        this.isFetchingExistenceLine = true;
        const response = await this.https.get(`http://localhost:8080/${API_URL}/${id}`);
        if (response) {
            this.existence = response;
        }
        this.isFetchingExistenceLine = false;
        return response;
    }

    @action async updateExistence(existence: ExistenceLine) {
        const form = new FormData();
        const response = await
            // tslint:disable-next-line:max-line-length
            this.https.put(`http://localhost:8080/${API_URL}/${existence.id}/${encodeObject(existence)}`, form);
        if (response) {
            const exList = toJS(this.existences);
            const exist = exList.map(exst => exst.id === existence.id
                ? { ...exst, ...existence, quantity: `${existence.quantity}` }
                : exst
            );
            this.existences = exist;
        } else { this.errors = response.errors; }
        return response;
    }

    @action async createExistence(existence: ExistenceLine): Promise<boolean> {
        const form = new FormData();
        delete existence.id;
        // tslint:disable-next-line:max-line-length
        const response = await this.https.post(`http://localhost:8080/${API_URL}&${encodeObject(existence)}`, form);
        if (response) {
            this.existences = this.existences.concat({
                ...existence,
                quantity: `${existence.quantity}`
            });
        } else { this.errors = response.errors; }
        return response;
    }

}