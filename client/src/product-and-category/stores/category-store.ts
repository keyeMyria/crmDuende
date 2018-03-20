import { observable, action, toJS } from 'mobx';
import { Https } from '../../common/util/https';
import Store from '../../common/types/store';
import { encodeObject } from '../../common/util/encode-object';
import { Category } from '../types/category';

const API_URL = 'category';

export default class CategoriesStore implements Store {
    @observable isFetching: boolean = false;
    @observable categories: Category[] = [] as Category[];
    @observable category: Category = { id: -1 } as Category;
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
        if (response) {
            this.categories = response || [];
        }
        this.isFetching = false;
        return response;
    }

    @action async fetchCategory(categoryId: number) {
        this.isFetchingCategory = true;
        const response = await this.https.get(`http://localhost:8080/${API_URL}/${categoryId}`);
        if (response) {
            this.category = response;
        }
        this.isFetchingCategory = false;
        return response;
    }

    @action async updateCategory(cat: Category) {
        const form = new FormData();
        const response = await
            // tslint:disable-next-line:max-line-length
            this.https.post(`http://localhost:8080/${API_URL}/${cat.id}/${encodeObject(cat)}`, form);
        if (response) {
            const categoryList = toJS(this.categories);
            const categories = categoryList.map(ctgry => ctgry.id === cat.id
                ? { ...ctgry, ...cat, name: `${cat.name}` }
                : ctgry
            );
            this.categories = categories;
        } else { this.errors = response.errors; }
        return response;
    }

    @action async createCategory(category: Category): Promise<boolean> {
        const form = new FormData();
        // tslint:disable-next-line:max-line-length
        const response = await this.https.post(`http://localhost:8080/${API_URL}/${encodeObject(category)}`, form);
        if (response) {
            this.categories = this.categories.concat({
                ...category,
                id: response.categoryId,
                name: `${category.name}`
            });
        } else { this.errors = response.errors; }
        return response;
    }

}