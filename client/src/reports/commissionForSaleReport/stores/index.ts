import ContextMessageStore from '../../../common/components/context-message/context-message-store';
import { Https } from '../../../common/util/https';
import CommissionReportStore from './commission-report-store';
import UserStore from '../../common/stores/users/user-store';

export class IndexStore {
    public users: UserStore;
    public messages: ContextMessageStore;
    public report: CommissionReportStore;
    public https: Https;

    constructor() {
        this.messages = new ContextMessageStore();
        this.https = new Https(this.messages);
        this.users = new UserStore(this.https);
        this.report = new CommissionReportStore(this.https);
    }
}

const indexStore = new IndexStore();
export default indexStore;