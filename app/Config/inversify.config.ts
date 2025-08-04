import { Container } from 'inversify';
import { AuthController } from '../Presentation/AuthController';
import { AuthService } from '../Aplication/Authentication/AuthService';
import { AuthRepository } from '../Infrastructure/Repository/AuthRepository';
import { IRepository } from "../Domain/Interface/IRespository";
import { TYPES } from '../Domain/Type';
import { IAuthService } from '../Aplication/Authentication/IAuthService';
import { ICategoria } from '../Domain/Interface/ICategoria';
import { CategoriaRepository } from '../Infrastructure/Repository/CategoriaRepository';
import { ICategoryService } from '../Aplication/Category/ICategoryService';
import { CategoryService } from '../Aplication/Category/CategoryService';
import { CategoriaController } from '../Presentation/CategoriaController';
import { IVendedor } from '../Domain/Interface/IVendedor';
import { VendedorRepository } from '../Infrastructure/Repository/VendedorRepository';
import { IProducto } from '../Domain/Interface/IProducto';
import { ProductoRepository } from '../Infrastructure/Repository/ProductoRepository';
import { IMarca } from '../Domain/Interface/IMarca';
import { MarcaRepository } from '../Infrastructure/Repository/MarcaRepository';
import { InventarioRepository } from '../Infrastructure/Repository/InventarioRepository';
import { IInventario } from '../Domain/Interface/IInventario';
import { FacturaRepository } from '../Infrastructure/Repository/FacturaRepository';
import { IFactura } from '../Domain/Interface/IFactura';
import { DetalleFacturaRepository } from '../Infrastructure/Repository/DetalleFacturaRepository';
import { IDetalleFactura } from '../Domain/Interface/IDetalleFactura';
import { IVendedorService } from '../Aplication/Vendedor/IVendedorService';
import { VendedorService } from '../Aplication/Vendedor/VendedorService';
import { VendedorController } from '../Presentation/VendedorController'


const container = new Container();
container.bind(AuthController).toSelf().inSingletonScope();
container.bind(CategoriaController).toSelf().inSingletonScope();
container.bind(VendedorController).toSelf().inSingletonScope();

container.bind<IAuthService>(TYPES.IAuthService).to(AuthService);
container.bind<ICategoryService>(TYPES.ICategoryService).to(CategoryService);
container.bind<IVendedorService>(TYPES.IVendedorService).to(VendedorService);


container.bind<IRepository>(TYPES.IRepository).to(AuthRepository);
container.bind<ICategoria>(TYPES.ICategoria).to(CategoriaRepository);
container.bind<IVendedor>(TYPES.IVendedor).to(VendedorRepository);
container.bind<IProducto>(TYPES.IProducto).to(ProductoRepository);
container.bind<IMarca>(TYPES.IProducto).to(MarcaRepository);
container.bind<IInventario>(TYPES.IInventario).to(InventarioRepository);
container.bind<IFactura>(TYPES.IFactura).to(FacturaRepository);
container.bind<IDetalleFactura>(TYPES.IDetalleFactura).to(DetalleFacturaRepository);







export { container };