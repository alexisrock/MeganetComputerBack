import { inject, injectable } from "inversify";
import { ICategoryService } from "../Interface/ICategoryService";
import { ICategoria } from '../../Domain/Interface/ICategoria';
import { TYPES } from "../../Domain/Type";
import { CategoriaResponse, CategoryOut, CategorysResponse } from "../../Domain/Responses/CategoriaResponse";
import { Request } from 'express';
import { Categoria } from "../../Domain/Entities/Categoria";
import { Status } from "../../Domain/Enums/Status";


@injectable()
export class CategoryService implements ICategoryService{

    private readonly ICategoriaRepository: ICategoria;


    constructor(@inject(TYPES.ICategoria)ICategoriaRepository: ICategoria ){
            this.ICategoriaRepository = ICategoriaRepository;
    }
   

    async createCategoria(req: Request): Promise<CategoriaResponse | undefined> {
        let CategoriaResponse: CategoriaResponse | undefined;
        try {
            let Category =await  this.ICategoriaRepository.findByName(req.body.name)
            if(Category === null || Category === undefined){
                CategoriaResponse  = this.mapperCategoryResponse(null, Status.badResquest, "La categoria ya fue creada");
                return Promise.resolve(CategoriaResponse);
            }       

        } catch (error: any) {
            CategoriaResponse  = this.mapperCategoryResponse(null, Status.internalServerError, error.message);
           
        }
        return Promise.resolve(CategoriaResponse);
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

    async getAllCAtegory(): Promise<CategorysResponse> {
        let Categorys = new CategorysResponse();
        let categorysOut: CategoryOut[] =  [];

        try{
            const categorys = await this.ICategoriaRepository.findAll();
            if(categorys === null || categorys.length=== 0){
                Categorys = this.mapperCategorysResponse([], Status.badResquest,"No exiten categorias" );
                return  Promise.resolve(Categorys)
            }

            categorys.forEach(x=> {
                const categoryResponse:CategoryOut = this.mapperCategoryOut(x)
                categorysOut.push(categoryResponse);
            })
            Categorys = this.mapperCategorysResponse(categorysOut, Status.ok,"Resultado exitoso" );
  
        }catch(error:any ){

            Categorys = this.mapperCategorysResponse([], Status.internalServerError,error.message);
        }
        return  Promise.resolve(Categorys)       
    }

    private mapperCategoryOut(  categoria: Categoria ){
        let  Response = new CategoryOut();
        if(categoria !== null || categoria !==  undefined){
            Response._id = categoria._id;
            Response.nombreCategoria = categoria.nombreCategoria; 
        }
        return Response;
    }

    private mapperCategorysResponse(categorysOut: CategoryOut[], status: Status, message: string): CategorysResponse{
        let CatorysResponse = new CategorysResponse();

        CatorysResponse.message = message;
        CatorysResponse.status =  status
        if(status !== Status.ok){
            CatorysResponse.listCategory = [];       
        }
        CatorysResponse.listCategory = categorysOut;
       return CatorysResponse;
    }


}