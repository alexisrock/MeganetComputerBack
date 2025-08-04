import { injectable, inject } from "inversify";
import { BaseResponse } from "../Common/BaseResponse";
import { Vendedor } from '../../Domain/Entities/Vendedor';

import { IVendedorService } from "./IVendedorService";
import { IVendedor } from '../../Domain/Interface/IVendedor';
import { TYPES } from "../../Domain/Type";
import { Request } from "express";
import { BadRequestError } from "../../Presentation/Middleware/http-error.class";
import { hashSync } from "bcrypt";
import { Status } from "../../Domain/Enums/Status";

@injectable()
export class VendedorService implements IVendedorService{
    private readonly VendedorRepository: IVendedor ;

   
     
    constructor(@inject(TYPES.IVendedor) VendedorRepository: IVendedor ) {
        this.VendedorRepository = VendedorRepository;
    }


    async createVendedor(req: Request): Promise<BaseResponse | undefined> {
        let response =  new BaseResponse()

        const usuario = await this.VendedorRepository.findByUsuario(req.body.usuario)

        if(usuario !== null)
                throw new BadRequestError("elvendedor ya fue creado con ese usuario")
        

        const vendor = TransformDtoVendedor.mapperVendedor(req)

        const result = await this.VendedorRepository.create(vendor)

        if(result === null)
            throw new BadRequestError("error al crear el vendedor")

        response.status =  Status.ok
        response.message = "Vendedor creado con exito"

        return Promise.resolve(response)        
    }


    async updateVendedor(req: Request): Promise<BaseResponse | undefined> {
        let response =  new BaseResponse()

        let vendor  =await  this.VendedorRepository.findById(req.body.id)
        if(vendor === null)
            throw new BadRequestError("el id del vendedor no existe")

        TransformDtoVendedor.mapperDtoVendedorUpdate(vendor, req)

        await this.VendedorRepository.update(vendor)

        response.status =  Status.ok
        response.message = "Vendedor actualizado con exito"
        return Promise.resolve(response)    

    }


    async deleteVendedor(req: Request): Promise<BaseResponse | undefined> {
           let response =  new BaseResponse()

        let vendor  = await  this.VendedorRepository.findById(req.params.id)
        if(vendor === null)
            throw new BadRequestError("el id del vendedor no existe") 

        await this.VendedorRepository.delete(req.params.id)

        response.status =  Status.ok
        response.message = "Vendedor eliminado con exito"
        return Promise.resolve(response)    
    }    
}


export class TransformDtoVendedor{
    private static readonly saltRounds: number = 10;
    

    static mapperVendedor( req: Request){
        let vendedor = new Vendedor()

        vendedor.usuario = req.body.usuario
        vendedor.created = new Date()
        vendedor.nombre = req.body.nombre
        vendedor.password =  hashSync(req.body.password, this.saltRounds);  

        return vendedor  
    }


    static mapperDtoVendedorUpdate(vendedor: Vendedor, req: Request){        
        vendedor.usuario = req.body.usuario       
        vendedor.nombre = req.body.nombre
        vendedor.password =  hashSync(req.body.password, this.saltRounds);  
        return vendedor  
    }


}