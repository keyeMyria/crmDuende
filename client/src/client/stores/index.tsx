
import ContextMessageStore from '../../common/components/context-message/context-message-store';
import { Https } from '../../common/util/https';
import ClientStore from './client-store';

export class RootStore {

    clientStore: ClientStore;
    messageStore: ContextMessageStore;
    https: Https;

    constructor() {
        this.messageStore = new ContextMessageStore();
        this.https = new Https(this.messageStore);
        this.clientStore = new ClientStore(this.https);
    }

}

const rootStore = new RootStore();
export default rootStore;