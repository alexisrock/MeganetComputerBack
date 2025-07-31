
import { Vendedor } from "../Entities/Vendedor";


export interface IVendedor{

    create(vendedor: Vendedor): Promise<string| null>;
    findById(id: string | null): Promise<Vendedor| null>; 
    findByName(name: string | null): Promise<Vendedor| null>; 
    findAll(): Promise<Vendedor[]| null>; 
    update(vendedor: Vendedor): Promise<string| null>;
    delete(id: string | null): Promise<string| null>;
}