import ContextMessageStore from '../../common/components/context-message/context-message-store';
import { Https } from '../../common/util/https'; 
import StoreStore from './store-store';

export default class IndexStore {
    stores: StoreStore;
    messages: ContextMessageStore;
    https: Https;

    constructor() {
        this.messages = new ContextMessageStore();
        this.https = new Https(this.messages);
        this.stores = new StoreStore(this.https);
    }

}