
import { Cliente } from "../Domain/Cliente";
import   { compareSync } from 'bcrypt';
import { AuthRepository } from '../DataAccess/authRepository';
import { Service } from "typedi";
import jwt from 'jsonwebtoken';
import { Token } from "../Domain/Token";

@Service()
export class AuthService{
    private readonly authRepository:  AuthRepository;

    constructor( authRepository:  AuthRepository ){
        this.authRepository = authRepository;        
    }

    async authentication(email: string, pass: string, secret: string) : Promise<Token | undefined> {

        const token = new Token();

        const cliente: Cliente  | undefined = await this.validateEmail(email, pass)
        
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
        if(email=== "" ||  pass==="")
         return undefined;

        const cliente: Cliente | undefined = await this.authRepository.findById(email);
        return Promise.resolve(cliente);
    }



}