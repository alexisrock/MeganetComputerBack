import { Categoria } from "../Entities/Categoria";


export interface ICategoria{

    create(categoria: Categoria): Promise<string| null>;
    findById(id: string | null): Promise<Categoria| null>; 
    findByName(name: string | null): Promise<Categoria| null>; 
    findAll(): Promise<Categoria[]| null>; 
    update(categoria: Categoria): Promise<string| null>;
    delete(id: string | null): Promise<string| null>;
}