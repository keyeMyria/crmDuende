import UsersStore from './users-store';
import { Https } from '../../common/util/https';
import ContextMessageStore from '../../common/components/context-message/context-message-store';
export class IndexStore {
    public user: UsersStore;
    public messages: ContextMessageStore;
    public https: Https;

    constructor() {
        this.messages = new ContextMessageStore();
        this.https = new Https(this.messages);
        this.user = new UsersStore(this.https);
    }
}

const indexStore = new IndexStore();
export default indexStore;