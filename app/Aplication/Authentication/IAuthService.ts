import { Token } from "./Token";
import { Request } from 'express';
import { ClienteResponse } from "./ClienteResponse";

export interface IAuthService{
    authentication(email: string, pass: string, secret: string): Promise<Token | undefined> ;
    createAuth(req: Request):  Promise<ClienteResponse| undefined>;

}