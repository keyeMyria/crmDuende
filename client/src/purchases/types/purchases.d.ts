export interface Purchases {
    puiId: number;
    providerId: number;
    date?: Date;
    documentNumber?: string;
}

export interface PurchasesDetail {
    purId: number;
    purDetailId: number;
    productId: number;
    count: string;
    salesPrice?: string;
    cost?: string;
}