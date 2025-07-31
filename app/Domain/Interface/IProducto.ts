
import { Producto } from "../Entities/Producto";
export interface IProducto{

    create(producto: Producto): Promise<string| null>;
    findById(id: string | null): Promise<Producto| null>; 
    findByName(name: string | null): Promise<Producto| null>; 
    findAll(): Promise<Producto[]| null>; 
    update(producto: Producto): Promise<string| null>;
    delete(id: string | null): Promise<string| null>;
}