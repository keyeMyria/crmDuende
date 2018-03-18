import { Https } from '../../common/util/https';
import ContextMessageStore from '../../common/components/context-message/context-message-store';
import CategoriesStore from './category-store';
import ProductsStore from './product-store';

export class IndexStore {
    public categoryStore: CategoriesStore;
    public productsStore: ProductsStore; 
    public messages: ContextMessageStore;
    public https: Https;

    constructor() {
        this.messages = new ContextMessageStore();
        this.https = new Https(this.messages);
        this.categoryStore = new CategoriesStore(this.https);
        this.productsStore = new ProductsStore(this.https); 
    }
}

const indexStore = new IndexStore();
export default indexStore;