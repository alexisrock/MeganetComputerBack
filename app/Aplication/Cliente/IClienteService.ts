import { BaseResponse } from "../Common/BaseResponse"
import { Request } from "express";
import { ClienteResponse } from "./ClienteResponse";


export interface IClienteService{

    createCliente(req: Request): Promise<BaseResponse | undefined> 
    getAll(): Promise<ClienteResponse[]| undefined> 
    updateCliente(req: Request): Promise<BaseResponse | undefined>

}