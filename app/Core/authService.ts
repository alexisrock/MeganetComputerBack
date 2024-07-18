
import { Cliente } from "../Domain/Cliente";
import   { compareSync, hashSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Token } from "../Domain/Responses/Token";
import { inject, injectable } from "inversify";
import { IAuthService } from "./iAuthService";
import { IRepository } from "../DataAccess/IRespository";
import { TYPES } from "../Domain/Type";
import { Request } from 'express';
import { ClienteResponse } from "../Domain/Responses/ClienteResponse";
import { Status } from "../Domain/Enums/Status";
 
@injectable()
export class AuthService implements IAuthService{
    private authRepository:  IRepository
    private saltRounds: number = 10;
    constructor( @inject(TYPES.IRepository)  _authRepository:  IRepository ){ 
        this.authRepository = _authRepository;
    }


    async authentication(email: string, pass: string, secret: string) : Promise<Token | undefined> {

        let token = new Token();

        const cliente: Cliente  | undefined = await this.validateEmail(email, pass)
        
        console.log("metodo llamado: ",cliente)
        if(cliente === undefined || cliente === null)        
            return undefined;             
        
        if(compareSync(pass, cliente.password)){          
            const tokenString = jwt.sign({id: cliente._id}, secret, { expiresIn: '7d'});          
            token = this.getResponseToken(tokenString,"Usuario encontrado",  200);           
            return Promise.resolve(token);
        }
        
        token = this.getResponseToken("","Invalid email/password",401 ) ;       
        return Promise.resolve(token);

    }

    private async validateEmail(email: string, pass: string,): Promise<Cliente | undefined>{
        let cliente: Cliente | undefined ;
        try {
            if(email=== "" ||  pass===""){
                return undefined;    
            }
            cliente  = await this.authRepository.findByEmail(email);
              console.log(cliente)
        } catch (error) {
            console.log(error)            
        }
        return Promise.resolve(cliente);
    }

    private getResponseToken(token: string, message: string, status: number){
        let tokenResponse = new Token();
        tokenResponse.token = token;
        tokenResponse.message = message;
        tokenResponse.status = status;
        return tokenResponse;
    }

    async createAuth(req: Request): Promise<ClienteResponse| null>{

        if(await this.validateExitsEmail(req.body.emailCli)!==null || await this.validateExitsCedula(req.body.cedulaCli)!==null){
            return Promise.resolve(this.mapperClienteResponse(null, Status.badResquest, "El numero de cedula  o el correo ya existe"));
        }
        let cliente = new  Cliente();
        cliente =  this.mapperRequestCliente(req);
        let resultado: string | null = await this.authRepository.insert(cliente);       
        let client = await this.authRepository.findById(resultado); 
        let clienteResponse = this.mapperClienteResponse(client, Status.ok, "Usuario creado con exito"); 
        return Promise.resolve(clienteResponse);
    }

    private mapperRequestCliente(req: Request): Cliente{
        let cliente = new  Cliente();
        cliente.cedula = req.body.cedulaCli,
        cliente.nombre = req.body.nombrecli,
        cliente.apellidos = req.body.apellidosCli,
        cliente.direccion = req.body.direccionCli,
        cliente.telefono = req.body.telefonoCli,
        cliente.email = req.body.emailCli,
        cliente.password =  hashSync(req.body.pass, this.saltRounds);    
        return cliente;        
    }

    private async validateExitsEmail(email: string): Promise<Cliente| null>{
        let cliente: Cliente | null = await this.authRepository.findByEmail(email);     
        return Promise.resolve(cliente);
    }

    private async validateExitsCedula(cedula: string): Promise<Cliente| null>{
        let cliente: Cliente | null = await this.authRepository.findByCedula(cedula);       
        return Promise.resolve(cliente);
    }

    private mapperClienteResponse(cliente: Cliente | null, status: Status, message: string): ClienteResponse | null{
        let clienteResponse = new ClienteResponse();
        if(cliente === null){
            clienteResponse.status = status;
            clienteResponse.message = message; 
            return clienteResponse;   
        }

        clienteResponse._id = cliente._id;
        clienteResponse.cedula = cliente.cedula;
        clienteResponse.nombre = cliente.nombre;
        clienteResponse.apellidos = cliente.apellidos;
        clienteResponse.direccion = cliente.direccion;
        clienteResponse.telefono = cliente.telefono;
        clienteResponse.email = cliente.email;
        clienteResponse.status = status;
        clienteResponse.message = message; 
        return clienteResponse;        
    }



}