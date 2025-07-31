import { Inventario } from "../Entities/Inventario";

export interface IInventario{

    create(inventario: Inventario): Promise<string| null>;
    findById(id: string | null): Promise<Inventario| null>; 
    findAll(): Promise<Inventario[]| null>; 
    update(inventario: Inventario): Promise<string| null>;
    delete(id: string | null): Promise<string| null>;
}