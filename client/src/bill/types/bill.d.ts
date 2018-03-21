export interface Bill {
    id: number;
    userId: number;
    clientId: number;
    numBill: string;
    date: Date;
}

export interface BillDetail {
    billId: number;
    productId: number;
    id: number;
    cost: string;
    count: string;
    salesPrice: string;
}