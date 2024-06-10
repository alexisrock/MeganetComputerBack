import { Token } from "../Domain/Token";

export interface IAuthService{
    authentication(email: string, pass: string, secret: string): Promise<Token | undefined> ;
}