import { observable, action, toJS } from 'mobx';
import { Https } from '../../common/util/https';
import Store from '../../common/types/store';
import { encodeObject } from '../../common/util/encode-object';
import { Product } from '../types/product';

const API_URL = 'products';

export default class ProductsStore implements Store {
    @observable isFetching: boolean = false;
    @observable products: Product[] = [] as Product[];
    @observable product: Product = { productId: -1 } as Product;
    @observable isFetchingUser: boolean = false;
    @observable errors: { [valueKey: string]: string };
    https: Https;

    constructor(https: Https) {
        this.https = https;
    }

    @action fetchProductsIfNeed() {
        if (this.products.length === 0) { this.fetchProducts(); }
    }

    @action async fetchProducts() {
        this.isFetching = true;
        const response = await this.https.get(`http://localhost:8080/${API_URL}`);
        if (response.success) {
            this.products = response.data || [];
        }
        this.isFetching = false;
        return response.success;
    }

    @action async fetchProduct(productId: number) {
        this.isFetchingUser = true;
        const response = await this.https.get(`http://localhost:8080/${API_URL}?cmd=detail&userId=${productId}`);
        if (response.success) {
            this.product = response.data;
        }
        this.isFetchingUser = false;
        return response.success;
    }

    @action async updateProduct(product: Product) {
        const form = new FormData();
        const response = await
            // tslint:disable-next-line:max-line-length
            this.https.post(`http://localhost:8080/${API_URL}?cmd=update&userId=${product.productId}&${encodeObject(product)}`, form);
        if (response.success) {
            const productList = toJS(this.products);
            const products = productList.map(prds => prds.productId === product.productId
                ? { ...prds, ...product, name: `${product.name}` }
                : prds
            );
            this.products = products;
        } else { this.errors = response.errors; }
        return response.success;
    }

    @action async createProduct(product: Product): Promise<boolean> {
        const form = new FormData();
        // tslint:disable-next-line:max-line-length
        const response = await this.https.post(`http://localhost:8080/${API_URL}?cmd=create&${encodeObject(product)}`, form);
        if (response.success) {
            this.products = this.products.concat({
                ...product,
                productId: response.productId,
                name: `${product.name}`
            });
        } else { this.errors = response.errors; }
        return response.success;
    }

}