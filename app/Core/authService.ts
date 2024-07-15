
import { Cliente } from "../Domain/Cliente";
import   { compareSync, hashSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Token } from "../Domain/Token";
import { inject, injectable } from "inversify";
import { IAuthService } from "./iAuthService";
import { IRepository } from "../DataAccess/IRespository";
import { TYPES } from "../Domain/Type";
import { Request } from 'express';
 
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


    async createAuth(req: Request): Promise<Cliente| null>{
        let cliente = new  Cliente();
        cliente.cedula = req.body.cedulaCli,
        cliente.nombre = req.body.nombrecli,
        cliente.apellidos = req.body.apellidosCli,
        cliente.direccion = req.body.direccionCli,
        cliente.telefono = req.body.telefonoCli,
        cliente.email = req.body.emailCli,
        cliente.password =  hashSync(req.body.pass, this.saltRounds);        
        let resultado: string | null = await this.authRepository.insert(cliente);       
        let client = await this.authRepository.findById(resultado); 
      
        return Promise.resolve(client);
    }



}