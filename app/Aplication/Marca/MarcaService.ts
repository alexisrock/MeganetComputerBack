import { Request } from "express";
import { BaseResponse } from "../Common/BaseResponse";
import { IMarcaService } from "./IMarcaService";
import { MarcaResponse } from "./MarcaResponse";
import { IMarca } from "../../Domain/Interface/IMarca";
import { inject, injectable } from "inversify";
import { TYPES } from "../../Domain/Type";
import { BadRequestError } from "../../Presentation/Middleware/http-error.class";
import { Status } from "../../Domain/Enums/Status";
import { Marca } from "../../Domain/Entities/Marca";


@injectable()
export class MarcaService implements IMarcaService {
    private readonly repository: IMarca;

    /**
     *
     */
    constructor(@inject(TYPES.IMarca) repository: IMarca) {
        this.repository = repository;
    }

    async createMarca(req: Request): Promise<BaseResponse | undefined> {
        let response = new BaseResponse()

        if (req.body.Descripcion === "")
            throw new BadRequestError(
                "El campo descripcion no puede estar vacio"
            );

        const marca = TransformMarca.mapperMarcaDto(req);
        await this.repository.create(marca);
        response.status = Status.ok
        response.message = "Marca creada con exito"
        return Promise.resolve(response)
    }


    async updateMarca(req: Request): Promise<BaseResponse | undefined> {
        let response = new BaseResponse()

        if (req.body.Descripcion === "")
            throw new BadRequestError(
                "El campo descripcion no puede estar vacio"
            );

        const marca = await this.repository.findById(req.body.id)
        if (!marca) {
            throw new BadRequestError("Marca no encontrada");
        }
        TransformMarca.mapperMarcaDtoToMarca(marca, req);

        await this.repository.update(marca)

        response.status = Status.ok
        response.message = "Marca actualizada con exito"
        return Promise.resolve(response)


    }

    async deleteMarca(req: Request): Promise<BaseResponse | undefined> {
        let response = new BaseResponse()
        await this.repository.delete(req.params.id)
        response.status = Status.ok
        response.message = "Marca eliminada con exito"
        return Promise.resolve(response)
    }

    async getMarcaById(req: Request): Promise<MarcaResponse | undefined> {

        const marca = await this.repository.findById(req.params.id)
        if (!marca) {
            throw new BadRequestError("Marca no encontrada");
        }

        const response = TransformMarca.mapperMarcaResponse(marca);
        return Promise.resolve(response)
    }

    async getMarca(): Promise<MarcaResponse[] | undefined> {
        const marcas = await this.repository.findAll();
        return Promise.resolve(TransformMarca.mapperListMarcaDtoToMarcaListResponse(marcas));
    }

}


class TransformMarca {

    static mapperMarcaDto(req: Request) {
        const marca = new Marca();
        marca.Descripcion = req.body.Descripcion;
        return marca;
    }

    static mapperMarcaResponse(marca: Marca) {
        const marcaResponse = new MarcaResponse();
        marcaResponse._id = marca._id;
        marcaResponse.Descripcion = marca.Descripcion;
        return marcaResponse;
    }

    static mapperMarcaDtoToMarca(marca: Marca, req: Request) {
        marca.Descripcion = req.body.Descripcion;
        return marca;
    }

    static mapperListMarcaDtoToMarcaListResponse(marca: Marca[] | null) {
        const marcasResponse: MarcaResponse[] = [];

        if (marca!==null) {
            for (const m of marca) {
                const marcaResponse = TransformMarca.mapperMarcaResponse(m);
                marcasResponse.push(marcaResponse);
            }

        }

        return marcasResponse;
    }
}
