import { CategoriaResponse, CategorysResponse } from "../../Domain/Responses/CategoriaResponse";
import { Request } from 'express';
export interface ICategoryService{

    createCategoria(req: Request): Promise<CategoriaResponse | undefined>
    getAllCAtegory(): Promise<CategorysResponse>

}