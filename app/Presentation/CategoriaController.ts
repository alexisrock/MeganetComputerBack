import { controller, httpPost } from "inversify-express-utils";
import { TYPES } from "../Domain/Type";
import { ICategoryService } from "../Core/Interface/ICategoryService";
import { inject } from "inversify";




@controller("/category")
export class CategoriaController{

    private cateogryService: ICategoryService;
    constructor(@inject(TYPES.ICategoryService) _cateogryService: ICategoryService){
        this.cateogryService = _cateogryService;
    }


    @httpPost("/")
    async Create(req: Request, res: Response){   

    }
    
}
