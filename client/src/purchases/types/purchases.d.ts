export interface Purchases {
    id: number;
    providerId: number;
    date?: Date;
    documentNumber?: string;
}

export interface PurchasesDetail {
    purId: number;
    id: number;
    productId: number;
    count: string;
    salesPrice?: string;
    cost?: string;
}