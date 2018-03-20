export interface Store {
    id: number;
    placeName: string;
    name?: string;
    address: string;
    phone?: string;
    picture?: string; //unicamente se agrega para control interno 
}