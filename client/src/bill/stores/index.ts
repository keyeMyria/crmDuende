import { Https } from '../../common/util/https';
import ContextMessageStore from '../../common/components/context-message/context-message-store';
import BillStore from './bill-store';
import BillDetailStore from './bill-detail-store';

export class IndexStore {
    public messages: ContextMessageStore;
    public bills: BillStore;
    public billsDetail: BillDetailStore;
    public https: Https;

    constructor() {
        this.messages = new ContextMessageStore();
        this.https = new Https(this.messages);
        this.bills = new BillStore(this.https);
        this.billsDetail = new BillDetailStore(this.https);
    }
}

const indexStore = new IndexStore();
export default indexStore;

// fijar estructura s