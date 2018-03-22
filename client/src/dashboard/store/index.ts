import ContextMessageStore from '../../common/components/context-message/context-message-store';
import { Https } from '../../common/util/https';
import { CellphonesDashboardStore } from './cellphones-dashboard-store';
import { CellphoneAndGroupStore as CellphonesStore } from '../../reports/common/stores/cellphones';

export class IndexStore {
    public messages: ContextMessageStore;
    public https: Https;
    public dashboard: CellphonesDashboardStore;
    public cellphones: CellphonesStore;

    constructor() {
        this.messages = new ContextMessageStore();
        this.https = new Https(this.messages);
        this.cellphones = new CellphonesStore(this.https);
        this.dashboard = new CellphonesDashboardStore();
    }
}

const indexStore = new IndexStore();
export default indexStore;