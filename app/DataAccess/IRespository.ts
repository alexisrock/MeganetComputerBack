
import { Cliente } from "../Domain/Cliente";

export interface IRepository{
    findByEmail(email: string): Promise<any| undefined>;   
    findById(id: string | null): Promise<Cliente| null>;   
    insert(cliente: Cliente): Promise<string| null>;
}