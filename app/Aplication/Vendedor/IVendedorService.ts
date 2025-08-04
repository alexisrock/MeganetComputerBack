import { BaseResponse } from "../Common/BaseResponse";

import { Request } from 'express';
 
export interface IVendedorService{


    createVendedor(req: Request): Promise<BaseResponse | undefined>
    updateVendedor(req: Request): Promise<BaseResponse | undefined>
    deleteVendedor(req: Request): Promise<BaseResponse | undefined>
}