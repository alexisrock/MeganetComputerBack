import { CategoriaResponse } from "../../Domain/Responses/CategoriaResponse";
import { Request } from 'express';
export interface ICategoryService{

    CreateCategoria(req: Request): Promise<CategoriaResponse | undefined>


}