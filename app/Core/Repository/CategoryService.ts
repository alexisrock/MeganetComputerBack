import { inject, injectable } from "inversify";
import { ICategoryService } from "../Interface/ICategoryService";
import { ICategoria } from '../../DataAccess/Interface/ICategoria';
import { TYPES } from "../../Domain/Type";
import { CategoriaResponse } from "../../Domain/Responses/CategoriaResponse";
import { Request } from 'express';
import { Categoria } from "../../Domain/Categoria";
import { Status } from "../../Domain/Enums/Status";

@injectable()
export class CategoryService implements ICategoryService{

    private ICategoriaRepository: ICategoria;


    constructor(@inject(TYPES.ICategoria)ICategoriaRepository: ICategoria ){
            this.ICategoriaRepository = ICategoriaRepository;
    }

    async CreateCategoria(req: Request): Promise<CategoriaResponse | undefined> {
        let CategoriaResponse: CategoriaResponse | undefined;
        try {
            let Category =await  this.ICategoriaRepository.findByName(req.body.name)
            if(Category === null || Category === undefined){
                CategoriaResponse  = this.mapperCategoryResponse(null, Status.badResquest, "La categoria ya fue creada");
                return Promise.resolve(CategoriaResponse);
            }   


        return Promise.resolve(CategoriaResponse);

        } catch (error: any) {
            CategoriaResponse  = this.mapperCategoryResponse(null, Status.internalServerError, error.message);
            return Promise.resolve(CategoriaResponse);
        }

    }

    private mapperCategoryResponse(categoria: Categoria | null, status: Status, message: string): CategoriaResponse | undefined{
        let  Response = new CategoriaResponse();
        if(categoria === null){
            Response.status = status;
            Response.message = message; 
            return Response;   
        }

        Response._id = categoria._id;
        Response.nombreCategoria = categoria.nombreCategoria;       
        Response.status = status;
        Response.message = message; 
        return Response;        
    }



}