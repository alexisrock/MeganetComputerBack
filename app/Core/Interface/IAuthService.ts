import { Token } from "../../Domain/Responses/Token";
import { Request } from 'express';
import { ClienteResponse } from "../../Domain/Responses/ClienteResponse";

export interface IAuthService{
    authentication(email: string, pass: string, secret: string): Promise<Token | undefined> ;
    createAuth(req: Request):  Promise<ClienteResponse| undefined>;

}