import { observable, action, toJS } from 'mobx';
import { Https } from '../../common/util/https';
import Store from '../../common/types/store';
import { encodeObject } from '../../common/util/encode-object';
import { Provider } from '../types/provider';

const API_URL = 'provider';

export default class ProviderStore implements Store {
    @observable isFetching: boolean = false;
    @observable providers: Provider[] = [] as Provider[];
    @observable provider: Provider = { id: -1 } as Provider;
    @observable isFetchingProvider: boolean = false;
    @observable errors: { [valueKey: string]: string };
    https: Https;

    constructor(https: Https) {
        this.https = https;
    }

    @action fetchProviderIfNeed() {
        if (this.providers.length === 0) { this.fetchProviders(); }
    }

    @action async fetchProviders() {
        this.isFetching = true;
        const response = await this.https.get(`http://localhost:8080/${API_URL}`);
        if (response) {
            this.providers = response || [];
        }
        this.isFetching = false;
        return response;
    }

    @action async fetchProvider(id: number) {
        this.isFetchingProvider = true;
        const response = await this.https.get(`http://localhost:8080/${API_URL}/${id}`);
        if (response) {
            this.provider = response || [];
        }
        this.isFetchingProvider = false;
        return response;
    }

    @action async deleteProvider(id: number) {
        const response = await this.https.delete(`http://localhost:8080/${API_URL}/${id}`);
        if (response) {
            this.providers = this.providers.filter(prov => prov.id !== id);
        } else { this.errors = response.errors; }
        return response;
    }

    @action async updateProvider(prov: Provider) {
        const form = new FormData();
        const response = await
            // tslint:disable-next-line:max-line-length
            this.https.put(`http://localhost:8080/${API_URL}/${prov.id}/${encodeObject(prov)}`, form);
        if (response) {
            const providerList = toJS(this.providers);
            const providrs = providerList.map(prv => prv.id === prov.id
                ? { ...prv, ...prov, name: `${prov.name}` }
                : prv
            );
            this.providers = providrs;
        } else { this.errors = response.errors; }
        return response;
    }

    @action async createProvider(provider: Provider): Promise<boolean> {
        const form = new FormData();
        delete provider.id; 
        // tslint:disable-next-line:max-line-length
        const response = await this.https.post(`http://localhost:8080/${API_URL}&${encodeObject(provider)}`, form);
        if (response) {
            this.providers = this.providers.concat({
                ...provider,
                name: `${provider.name}`
            });
        } else {
            if (response.errors.id) {
                this.errors = { ...response.errors, name: response.errors.id };
            } else {
                this.errors = { ...response.errors };
            }
        }
        return response;
    }

}