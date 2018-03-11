export interface Bill {
    billId: number;
    userId: number;
    clientId: number;
    numBill: string;
    date: Date;
}

export interface BillDetail {
    billId: number;
    productId: number;
    billDetailId: number;
    cost: string;
    count: string;
    salesPrice: string;
}