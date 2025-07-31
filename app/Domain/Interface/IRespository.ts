
import { Cliente } from "../Entities/Cliente";

export interface IRepository{
    findByEmail(email: string): Promise<Cliente| null>;   
    findById(id: string | null): Promise<Cliente| null>;   
    findByCedula(cedula: string | null): Promise<Cliente| null>; 
    insert(cliente: Cliente): Promise<string| null>;
}