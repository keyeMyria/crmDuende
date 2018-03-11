export interface Provider {
    productId: number;
    categoryId: number;
    serialCode?: string;
    placeName?: string;
    barCode?: string;
    name?: string;
}

export interface Category {
    categoryId: number;
    name: string;
    description?: string;
}