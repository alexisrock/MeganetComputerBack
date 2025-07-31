
import { Marca } from "../Entities/Marca";
export interface IMarca{

    create(marca: Marca): Promise<string| null>;
    findById(id: string | null): Promise<Marca| null>; 
    findByName(name: string | null): Promise<Marca| null>; 
    findAll(): Promise<Marca[]| null>; 
    update(marca: Marca): Promise<string| null>;
    delete(id: string | null): Promise<string| null>;
}