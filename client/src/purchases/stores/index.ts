
import { Https } from '../../common/util/https';
import ContextMessageStore from '../../common/components/context-message/context-message-store';
import PurchasesStore from './purchases-store';
import PurchasesDetailStore from './purchases-detail-store';

export class IndexStore {
    public purchases: PurchasesStore;
    public purchasesDetail: PurchasesDetailStore;
    public messages: ContextMessageStore;
    public https: Https;

    constructor() {
        this.messages = new ContextMessageStore();
        this.https = new Https(this.messages);
        this.purchases = new PurchasesStore(this.https);
        this.purchasesDetail = new PurchasesDetailStore(this.https);
    }
}

const indexStore = new IndexStore();
export default indexStore;

// fijar estructura s
