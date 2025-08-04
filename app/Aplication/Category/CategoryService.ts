import { inject, injectable } from "inversify";
import { ICategoryService } from "./ICategoryService";
import { ICategoria } from "../../Domain/Interface/ICategoria";
import { TYPES } from "../../Domain/Type";
import {
    CategoriaResponse,
    CategoryOut,
    CategorysResponse,
} from "./CategoriaResponse";
import { Request } from "express";
import { Categoria } from "../../Domain/Entities/Categoria";
import { Status } from "../../Domain/Enums/Status";
import { BadRequestError } from "../../Presentation/Middleware/http-error.class";

@injectable()
export class CategoryService implements ICategoryService {
    private readonly ICategoriaRepository: ICategoria;

    constructor(@inject(TYPES.ICategoria) ICategoriaRepository: ICategoria) {
        this.ICategoriaRepository = ICategoriaRepository;
    }

    async createCategoria(req: Request): Promise<CategoriaResponse | undefined> {
        let CategoriaResponse: CategoriaResponse | undefined;

        let Category = await this.ICategoriaRepository.findByName(req.body.name);
        if (Category  !== null)
            throw new BadRequestError("La categoria ya fue creada");
        let categoria = new Categoria();
        categoria.nombreCategoria=req.body.name;
        await this.ICategoriaRepository.create(categoria)
        CategoriaResponse = this.mapperCategoryResponse(
            null,
            Status.ok,
            "La categoria fue creada correctamente"
        );

        return Promise.resolve(CategoriaResponse);
    }

    private mapperCategoryResponse(
        categoria: Categoria | null,
        status: Status,
        message: string
    ): CategoriaResponse | undefined {
        let Response = new CategoriaResponse();
        if (categoria === null) {
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
        let categorysOut: CategoryOut[] = [];


        const categorys = await this.ICategoriaRepository.findAll();
        if (categorys === null || categorys.length === 0)
            throw new BadRequestError("No exiten categorias");



        categorys.forEach((x) => {
            const categoryResponse: CategoryOut = this.mapperCategoryOut(x);
            categorysOut.push(categoryResponse);
        });
        Categorys = this.mapperCategorysResponse(
            categorysOut,
            Status.ok,
            "Resultado exitoso"
        );

        return Promise.resolve(Categorys);
    }

    private mapperCategoryOut(categoria: Categoria) {
        let Response = new CategoryOut();
        if (categoria !== null || categoria !== undefined) {
            Response._id = categoria._id;
            Response.nombreCategoria = categoria.nombreCategoria;
        }
        return Response;
    }

    private mapperCategorysResponse(
        categorysOut: CategoryOut[],
        status: Status,
        message: string
    ): CategorysResponse {
        let CatorysResponse = new CategorysResponse();

        CatorysResponse.message = message;
        CatorysResponse.status = status;
        if (status !== Status.ok) {
            CatorysResponse.listCategory = [];
        }
        CatorysResponse.listCategory = categorysOut;
        return CatorysResponse;
    }

    async updateCategoria(req: Request): Promise<CategoriaResponse | undefined> {

        if (req.body.name === null || req.body.name === undefined)
            throw new BadRequestError("El nombre de la categoria es requerido");


        if (req.body.name.length < 3)
            throw new BadRequestError("El nombre de la categoria debe tener al menos 3 caracteres");



        const category = await this.ICategoriaRepository.findById(req.body.id);
        if (category === null || category === undefined) {
            throw new BadRequestError("La categoria no existe");
        }

        category.nombreCategoria = req.body.name;
        await this.ICategoriaRepository.update(category);
        return Promise.resolve(
            this.mapperCategoryResponse(
                category,
                Status.ok,
                "Categoria actualizada correctamente"
            )
        );

    }

    async deleteCategoria(req: Request): Promise<CategoriaResponse | undefined> {
        try {
            if (req.params.id === null || req.params.id === undefined) 
               throw new BadRequestError("El id de la categoria es requerido");
            

            const category = await this.ICategoriaRepository.findById(req.params.id);
            if (category === null || category === undefined) 
                throw new BadRequestError("La categoria no existe");

            await this.ICategoriaRepository.delete(req.params.id);
            return Promise.resolve(
                this.mapperCategoryResponse(
                    null,
                    Status.ok,
                    "Categoria eliminada correctamente"
                )
            );
        } catch (error: any) {
            return Promise.resolve(
                this.mapperCategoryResponse(
                    null,
                    Status.internalServerError,
                    error.message
                )
            );
        }
    }

    async getCategoriaById(req: Request): Promise<CategoriaResponse | undefined> {
        try {
            if (req.params.id === null || req.params.id === undefined) {
                return Promise.resolve(
                    this.mapperCategoryResponse(
                        null,
                        Status.badResquest,
                        "El id de la categoria es requerido"
                    )
                );
            }

            const category = await this.ICategoriaRepository.findById(req.params.id);
            if (category === null || category === undefined) {
                return Promise.resolve(
                    this.mapperCategoryResponse(
                        null,
                        Status.badResquest,
                        "La categoria no existe"
                    )
                );
            }

            return Promise.resolve(
                this.mapperCategoryResponse(
                    category,
                    Status.ok,
                    "Categoria obtenida correctamente"
                )
            );
        } catch (error: any) {
            return Promise.resolve(
                this.mapperCategoryResponse(
                    null,
                    Status.internalServerError,
                    error.message
                )
            );
        }
    }


    async getCategoriaByName(req: Request): Promise<CategoriaResponse | undefined> {
        
            if (req.params.name === null || req.params.name === undefined)
                throw new BadRequestError("El nombre de la categoria es requerido");

            const category = await this.ICategoriaRepository.findByName(req.params.name);
            if (category === null || category === undefined) 
                throw new BadRequestError("La categoria no existe");


            return Promise.resolve(
                this.mapperCategoryResponse(
                    category,
                    Status.ok,
                    "Categoria obtenida correctamente"
                )
            );
       
    }
}




