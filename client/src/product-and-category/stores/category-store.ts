import { observable, action, toJS } from 'mobx';
import { Https } from '../../common/util/https';
import Store from '../../common/types/store';
import { encodeObject } from '../../common/util/encode-object';
import { Category } from '../types/category';

const API_URL = 'category';

export default class CategoriesStore implements Store {
    @observable isFetching: boolean = false;
    @observable categories: Category[] = [] as Category[];
    @observable category: Category = { categoryId: -1 } as Category;
    @observable isFetchingCategory: boolean = false;
    @observable errors: { [valueKey: string]: string };
    https: Https;

    constructor(https: Https) {
        this.https = https;
    }

    @action fetchCategoryIfNeed() {
        if (this.categories.length === 0) { this.fetchCategories(); }
    }

    @action async fetchCategories() {
        this.isFetching = true;
        const response = await this.https.get(`http://localhost:8080/${API_URL}`);
        if (response.success) {
            this.categories = response.data || [];
        }
        this.isFetching = false;
        return response.success;
    }

    @action async fetchCategory(userId: number) {
        this.isFetchingCategory = true;
        const response = await this.https.get(`http://localhost:8080/${API_URL}?cmd=detail&userId=${userId}`);
        if (response.success) {
            this.category = response.data;
        }
        this.isFetchingCategory = false;
        return response.success;
    }

    @action async updateCategory(cat: Category) {
        const form = new FormData();
        const response = await
            // tslint:disable-next-line:max-line-length
            this.https.post(`http://localhost:8080/${API_URL}?cmd=update&userId=${cat.categoryId}&${encodeObject(cat)}`, form);
        if (response.success) {
            const categoryList = toJS(this.categories);
            const categories = categoryList.map(ctgry => ctgry.categoryId === cat.categoryId
                ? { ...ctgry, ...cat, name: `${cat.name}` }
                : ctgry
            );
            this.categories = categories;
        } else { this.errors = response.errors; }
        return response.success;
    }

    @action async createCategory(category: Category): Promise<boolean> {
        const form = new FormData();
        // tslint:disable-next-line:max-line-length
        const response = await this.https.post(`http://localhost:8080/${API_URL}?cmd=create&${encodeObject(category)}`, form);
        if (response.success) {
            this.categories = this.categories.concat({
                ...category,
                categoryId: response.categoryId,
                name: `${category.name}`
            });
        } else { this.errors = response.errors; }
        return response.success;
    }

}