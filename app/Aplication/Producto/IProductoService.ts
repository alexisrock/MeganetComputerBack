import { BaseResponse } from "../Common/BaseResponse"
import { ProductoResponse } from "./ProductoResponse"
import { Request } from 'express';

export interface IProductoService{


    createProducto(req: Request): Promise<BaseResponse | undefined>
    getAll(): Promise<ProductoResponse>[]
    updateProducto(req: Request): Promise<BaseResponse | undefined>
    deleteProducto(req: Request): Promise<BaseResponse | undefined>
    getProductoById(req: Request): Promise<ProductoResponse | undefined>

}