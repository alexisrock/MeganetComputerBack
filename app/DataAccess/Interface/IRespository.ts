
import { Cliente } from "../../Domain/Cliente";

export interface IRepository{
    findByEmail(email: string): Promise<any| null>;   
    findById(id: string | null): Promise<Cliente| null>;   
    findByCedula(cedula: string | null): Promise<Cliente| null>; 
    insert(cliente: Cliente): Promise<string| null>;
}