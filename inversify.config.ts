import { Container } from 'inversify';
import { AuthController } from './app/Presentation/AuthController';
import { AuthService } from './app/Aplication/Repository/AuthService';
import { AuthRepository } from './app/Infrastructure/Repository/AuthRepository';
import { IRepository } from "./app/Domain/Interface/IRespository";
import { TYPES } from './app/Domain/Type';
import { IAuthService } from './app/Aplication/Interface/IAuthService';
import { ICategoria } from './app/Domain/Interface/ICategoria';
import { CategoriaRepository } from './app/Infrastructure/Repository/CategoriaRepository';
import { ICategoryService } from './app/Aplication/Interface/ICategoryService';
import { CategoryService } from './app/Aplication/Repository/CategoryService';
import { CategoriaController } from './app/Presentation/CategoriaController';
import { IVendedor } from './app/Domain/Interface/IVendedor';
import { VendedorRepository } from './app/Infrastructure/Repository/VendedorRepository';
import { IProducto } from './app/Domain/Interface/IProducto';
import { ProductoRepository } from './app/Infrastructure/Repository/ProductoRepository';
import { IMarca } from './app/Domain/Interface/IMarca';
import { MarcaRepository } from './app/Infrastructure/Repository/MarcaRepository';
import { InventarioRepository } from './app/Infrastructure/Repository/InventarioRepository';
import { IInventario } from './app/Domain/Interface/IInventario';
import { FacturaRepository } from './app/Infrastructure/Repository/FacturaRepository';
import { IFactura } from './app/Domain/Interface/IFactura';
import { DetalleFacturaRepository } from './app/Infrastructure/Repository/DetalleFacturaRepository';
import { IDetalleFactura } from './app/Domain/Interface/IDetalleFactura';
 


const container = new Container();
container.bind(AuthController).toSelf().inSingletonScope();
container.bind(CategoriaController).toSelf().inSingletonScope();;
container.bind<IAuthService>(TYPES.IAuthService).to(AuthService);
container.bind<ICategoryService>(TYPES.ICategoryService).to(CategoryService);

container.bind<IRepository>(TYPES.IRepository).to(AuthRepository);
container.bind<ICategoria>(TYPES.ICategoria).to(CategoriaRepository);
container.bind<IVendedor>(TYPES.IVendedor).to(VendedorRepository);
container.bind<IProducto>(TYPES.IProducto).to(ProductoRepository);
container.bind<IMarca>(TYPES.IProducto).to(MarcaRepository);
container.bind<IInventario>(TYPES.IInventario).to(InventarioRepository);
container.bind<IFactura>(TYPES.IFactura).to(FacturaRepository);
container.bind<IDetalleFactura>(TYPES.IDetalleFactura).to(DetalleFacturaRepository);







export { container };