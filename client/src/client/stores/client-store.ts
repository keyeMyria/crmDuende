import { Https } from '../../common/util/https';
import { observable, action, computed } from 'mobx';
import Store from '../../common/types/store';
import { Client } from '../types/clients';

const API_URL = 'aglo que va aqui ';
export default class ClientStore {
    @observable isFetching: boolean = false;
    @observable clientIsFetching: boolean = false;
    @observable clients: Client[] = [] as Client[];
    @observable client: Client = { clientId: -1 } as Client;
    @observable errors: Store['errors'];
    private https: Https;

    constructor(https: Https) {
        this.https = https;
    }

    encodeObject = (client: Client) => {
        return Object.keys(client).filter(key => key !== 'clientId').map(key => {
            return `${encodeURIComponent(key)}=${encodeURIComponent(client[key])}`;
        }).join('&');
    }

    @action fetchClientsIfNeeded() {
        if (!this.clients || this.clients.length === 0) {
            this.fetchClients();
        }
    }

    @action async fetchClients(useFetching: boolean = true) {
        if (useFetching) { this.isFetching = true; }
        const response = await this.https.get(`${API_URL}?cmd=list-fullkeys`);
        if (response.success) {
            this.clients = response.data || [];
        }
        if (useFetching) { this.isFetching = false; }
        return response.success;
    }

    @action async fetchClient(clientId: number) {
        this.clientIsFetching = true;
        const response = await this.https.get(`${API_URL}?cmd=detail&driver_id=${clientId}`);
        if (response.success) {
            this.client = response.data;
        }
        this.clientIsFetching = false;
        return response.success;
    }

    @action async deleteClient(clientId: number) {
        const response = await this.https.get(`${API_URL}?cmd=delete&driver_id=${clientId}`);
        if (response.success) {
            this.clients = this.clients.filter(client => client.clientId !== clientId);
        } else { this.errors = response.errors; }
        return response.success;
    }

    @action async updateClient(client: Client): Promise<boolean> {
        const form = new FormData();
        const picture = client.picture;
        delete client.picture;
        if (client.picture) {
            form.append('picture', client.picture);
        }
        const response = await
            this.https.post(`${API_URL}?cmd=update&driver_id=${client.clientId}&${this.encodeObject(client)}`, form);
        if (response.success) {
            this.clients = this.clients.map(item => item.clientId === client.clientId
                ? { ...item, ...client, picture }
                : item
            );
        } else { this.errors = response.errors; }
        return response.success;
    }

    @action async createClient(client: Client) {
        const form = new FormData();
        delete client.picture;
        if (client.picture) {
            form.append('picture', client.picture);
        }
        const response = await this.https.post(`${API_URL}?cmd=create&${this.encodeObject(client)}`, form);
        if (response.success) {
            this.clients = this.clients.concat(client);
            this.fetchClients(false);
        } else { this.errors = response.errors; }
        return response.success;
    }

    @action resetClient() {
        this.client = { clientId: -1 } as Client;
    }

    @computed get alphabeticClients(): Client[] {
        return this.clients.sort((a: Client, b: Client) => {
            const nameA = `${a.name} ${a.lastName}` || '';
            const nameB = `${b.name} ${b.lastName}` || '';
            if (nameA < nameB) { return -1; }
            if (nameA > nameB) { return 1; }
            return 0;
        });
    }
}