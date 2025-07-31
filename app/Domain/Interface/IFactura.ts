import { Factura } from "../Entities/Factura";


export interface IFactura{

    create(factura: Factura): Promise<string| null>;
    findById(id: string | null): Promise<Factura| null>; 
    findAll(): Promise<Factura[]| null>; 
    update(factura: Factura): Promise<string| null>;
    delete(id: string | null): Promise<string| null>;
}