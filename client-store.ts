import { Https } from '../../common/util/https';
import { observable, action, computed } from 'mobx';
import Store from '../../common/types/store';
import { Client } from '../types/clients';

const API_URL = 'clients';
export default class ClientStore {
    @observable isFetching: boolean = false;
    @observable clientIsFetching: boolean = false;
    @observable twitterIsFetching: boolean= false;
    @observable clients: Client[] = [] as Client[];
    @observable client: Client = { id: -1 } as Client;
    @observable twitter: Client[] = [] as Client[];
    @observable twitters: Client = { id: -1 } as Client;
    @observable errors: Store['errors'];
    private https: Https;

    constructor(https: Https) {
        this.https = https;
    }

    encodeObject = (client: Client) => {
        return Object.keys(client).filter(key => key !== 'id').map(key => {
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
        const response = await this.https.get(`http://localhost:8080/${API_URL}`);
        if (response) {
            this.clients = response || [];
        }
        if (useFetching) { this.isFetching = false; }
        return response;
    }

    @action async fetchClient(clientId: number) {
        this.clientIsFetching = true;
        const response = await this.https.get(`http://localhost:8080/${API_URL}/${clientId}`);
        if (response) {
            this.client = response;
        }
        this.clientIsFetching = false;
        return response;
    }
    @action async fetchTwitter(useFetching: boolean = true) {
        if (useFetching) { this.isFetching = true; }
        const response = await this.https.get(`http://localhost:8080/${API_URL}`);
        if (response) {
            this.twitter = response || [];
        }
        if (useFetching) { this.isFetching = false; }
        return response;
    }
    @action async fetchTwitters(twitterId: number) {
        this.twitterIsFetching = true;
        const response = await this.https.get(`http://localhost:8080/${API_URL}/${twitterId}`);
        if (response) {
            this.twitters = response;
        }
        this.twitterIsFetching = false;
        return response;
    }
    @action async deleteClient(clientId: number) {
        const response = await this.https.get(`http://localhost:8080/${API_URL}`);
        if (response) {
            this.clients = this.clients.filter(client => client.id !== clientId);
        } else { this.errors = response.errors; }
        return response;
    }

    @action async updateClient(client: Client): Promise<boolean> {
        const form = new FormData();
        const picture = client.picture;
        delete client.picture;
        if (client.picture) {
            form.append('picture', client.picture);
        }
        const response = await
            this.https.post(`http://localhost:8080/${API_URL}/${client.id}/${this.encodeObject(client)}`, form);
        if (response) {
            this.clients = this.clients.map(item => item.id === client.id
                ? { ...item, ...client, picture }
                : item
            );
        } else { this.errors = response.errors; }
        return response;
    }

    @action async createClient(client: Client) {
        const form = new FormData();
        delete client.picture;
        if (client.picture) {
            form.append('picture', client.picture);
        }
        const response = await this.https.post(`http://localhost:8080/${API_URL}/${this.encodeObject(client)}`, form);
        if (response) {
            this.clients = this.clients.concat(client);
            this.fetchClients(false);
        } else { this.errors = response.errors; }
        return response;
    }

    @action resetClient() {
        this.client = { id: -1 } as Client;
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