import { Token } from "../Domain/Token";
import { Cliente } from "../Domain/Cliente";
import { Request } from 'express';

export interface IAuthService{
    authentication(email: string, pass: string, secret: string): Promise<Token | undefined> ;
    createAuth(req: Request):  Promise<Cliente| null>;

}