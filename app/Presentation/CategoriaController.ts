import { controller, httpPost } from "inversify-express-utils";
import { TYPES } from "../Domain/Type";
import { ICategoryService } from "../Aplication/Interface/ICategoryService";
import { inject } from "inversify";
import { Request, Response } from 'express';




@controller("/category")
export class CategoriaController{

    private readonly cateogryService: ICategoryService;
    constructor(@inject(TYPES.ICategoryService) _cateogryService: ICategoryService){
        this.cateogryService = _cateogryService;
    }


    @httpPost("/")
    async Create(req: Request, res: Response){   
        try {


            const category = await this.cateogryService.createCategoria(req);
            if(category == null)
                throw new Error("Categoria no encontrada")

            
            return res.status(201).send(category);
            
        } catch (error) {
             return res.status(500).send('error: '+ error);
        }  
    }
    
}
