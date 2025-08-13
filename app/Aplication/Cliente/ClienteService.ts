import { inject, injectable } from "inversify";
import { BaseResponse } from "../Common/BaseResponse";
import { IClienteService } from "./IClienteService";
import { IRepository } from '../../Domain/Interface/IRespository';
import { TYPES } from "../../Domain/Type";
import { Request } from "express";
import { BadRequestError } from "../../Presentation/Middleware/http-error.class";
import { Cliente } from '../../Domain/Entities/Cliente';
import { hashSync } from "bcrypt";
import { Status } from "../../Domain/Enums/Status";
import { ClienteResponse } from "./ClienteResponse";




@injectable()
export class ClienteService implements IClienteService{


    private readonly repository: IRepository

    /**
     *
     */
    constructor( @inject(TYPES.IRepository)repository: IRepository) {
       this.repository = repository        
    }



    async createCliente(req: Request): Promise<BaseResponse | undefined> {
        let response =  new BaseResponse()
        if(!this.validateJson(req))
            throw new BadRequestError("existen campos vacios")
        
        const cliente= await this.repository.findByCedula(req.body.cedula)

        if(cliente !== null)
            throw new BadRequestError("la cedula del cliente ya se encuentra registrada")

        const emailCliente = await this.repository.findByEmail(req.body.email)

        if(emailCliente !== null)
            throw new BadRequestError("el correo ya se encuentra registrado")

        const clientenew = TraformCliente.mapperDtoCliente(req)
        await this.repository.insert(clientenew)
        response.status =  Status.ok
        response.message = "cliente creado con exito"
        return Promise.resolve(response)  
    }

    async getAll(): Promise<ClienteResponse[]| undefined> {
        
        let clientes = await this.repository.findAll()
        return TraformCliente.mapperClientesToResponse(clientes)
    }

    async updateCliente(req: Request): Promise<BaseResponse | undefined> {
        let response =  new BaseResponse()
        

        if(!this.validateJsonUpdate(req))
            throw new BadRequestError("existen campos vacios")

        let cliente = await this.repository.findById(req.body._id)
        if(cliente === null)
            throw new BadRequestError("id del cliente no se encuentra")

        TraformCliente.mapperDtoClienteUpdate(cliente, req)
        
        await this.repository.update(cliente)
        response.status =  Status.ok
        response.message = "cliente actualizado con exito"
        return Promise.resolve(response)  

    }

    validateJson(req: Request){

        if(req.body.cedula !== "" && req.body.nombre !== "" && req.body.password !== "" && req.body.email)
            return true 

        return false
    }

    validateJsonUpdate (req: Request){

        if(req.body.cedula !== "" && req.body.nombre !== "" && req.body.password !== "" && req.body.email && req.body._id !== "" )
            return true 

        return false
    }


}


export class TraformCliente{

    static readonly saltRounds: number = 10;
    
    static mapperDtoCliente(req: Request){
        const cliente = new Cliente();
        cliente.cedula = req.body.cedula
        cliente.nombre = req.body.nombre
        cliente.apellidos = req.body.apellidos
        cliente.email = req.body.direccion
        cliente.email =  req.body.email
        cliente.telefono = req.body.telefono
        cliente.estado= true
        cliente.password =  hashSync(req.body.password, this.saltRounds);    
        return cliente
    }


    static mapperClientesToResponse(clientes: Cliente[]| null){
        let clienteResponse: ClienteResponse[] = []

        if (clientes!.length!= 0 && clientes !== null) {

            clientes!.forEach( x => {
                let response = new ClienteResponse()
                response._id = x._id
                response.apellidos = x.apellidos
                response.cedula = x.cedula
                response.direccion = x.direccion
                response.email = x.email
                response.estado=x.estado
                response.nombre=x.nombre
                response.telefono=x.telefono
                clienteResponse.push(response)
            })
            
        }
        return clienteResponse
    }


    static mapperDtoClienteUpdate(cliente: Cliente, req: Request){       
        cliente.cedula = req.body.cedula
        cliente.nombre = req.body.nombre
        cliente.apellidos = req.body.apellidos
        cliente.email = req.body.direccion
        cliente.email =  req.body.email
        cliente.telefono = req.body.telefono
        cliente.estado= req.body.estado
      
        return cliente
    }




}