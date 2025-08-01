
import { DetalleFactura } from "../Entities/DetalleFactura";

export interface IDetalleFactura{

    create(detalleFactura: DetalleFactura): Promise<string| null>;
 
    findByIdFactura(id: string | null): Promise<DetalleFactura[]| null>;     
    delete(id: string | null): Promise<string| null>;
}