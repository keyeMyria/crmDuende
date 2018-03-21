import { Https } from '../../common/util/https';
import ContextMessageStore from '../../common/components/context-message/context-message-store';
import ProviderStore from './provider-store';
export class IndexStore {
    public provider: ProviderStore;
    public messages: ContextMessageStore;
    public https: Https;

    constructor() {
        this.messages = new ContextMessageStore();
        this.https = new Https(this.messages);
        this.provider = new ProviderStore(this.https);
    }
}

const indexStore = new IndexStore();
export default indexStore;