 
import { IProducto } from "../../Domain/Interface/IProducto";
import { TYPES } from "../../Domain/Type";
import { inject } from "inversify";


export class ProductoService {
  private readonly repository: IProducto;

  /**
   *
   */
  constructor(@inject(TYPES.IProducto) repository: IProducto) {
    this.repository = repository;
  }


}