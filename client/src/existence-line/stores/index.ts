import { Https } from '../../common/util/https';
import ContextMessageStore from '../../common/components/context-message/context-message-store';
import ExistenceLineStore from './existence-store';
export class IndexStore {
    public existenceLine: ExistenceLineStore;
    public messages: ContextMessageStore;
    public https: Https;

    constructor() {
        this.messages = new ContextMessageStore();
        this.https = new Https(this.messages);
        this.existenceLine = new ExistenceLineStore(this.https);
    }
}

const indexStore = new IndexStore();
export default indexStore;