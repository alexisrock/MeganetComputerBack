
import { Cliente } from "../Domain/Cliente";
import   { compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Token } from "../Domain/Token";
import { inject, injectable } from "inversify";
import { IAuthService } from "./iAuthService";
import { IRepository } from "../DataAccess/IRespository";
import { TYPES } from "../Domain/Type";

@injectable()
export class AuthService implements IAuthService{
    private authRepository:  IRepository

    constructor( @inject(TYPES.IRepository)  _authRepository:  IRepository ){ 
        this.authRepository = _authRepository;
    }


    async authentication(email: string, pass: string, secret: string) : Promise<Token | undefined> {

        const token = new Token();

        const cliente: Cliente  | undefined = await this.validateEmail(email, pass)
        
        console.log("metodo llamado: ",cliente)
        if(cliente === undefined || cliente === null)        
            return undefined;             
        

        if(compareSync(pass, cliente.password.type)){          
            const tokenString = jwt.sign({id: cliente._id}, secret, { expiresIn: '7d'});          
            token.token = tokenString;
            token.message = "Usuario encontrado"
            token.status = 200;
            return Promise.resolve(token);
        }
        
        token.token = "";
        token.status = 401;
        token.message = "Invalid email/password";
        return Promise.resolve(token);

    }



     private async validateEmail(email: string, pass: string,): Promise<Cliente | undefined>{
        let cliente: Cliente | undefined ;
        try {
            if(email=== "" ||  pass===""){
                return undefined;    
            }
            cliente  = await this.authRepository.findById(email);
              console.log(cliente)
        } catch (error) {
            console.log(error)            
        }
        return Promise.resolve(cliente);
    }



}