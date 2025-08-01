import { CategoriaResponse, CategorysResponse } from "./CategoriaResponse";
import { Request } from 'express';
export interface ICategoryService{

    createCategoria(req: Request): Promise<CategoriaResponse | undefined>
    getAllCAtegory(): Promise<CategorysResponse>
    updateCategoria(req: Request): Promise<CategoriaResponse | undefined>
    deleteCategoria(req: Request): Promise<CategoriaResponse | undefined>
    getCategoriaById(req: Request): Promise<CategoriaResponse | undefined>
    getCategoriaByName(req: Request): Promise<CategoriaResponse | undefined>

}