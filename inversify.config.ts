import { Container } from 'inversify';
import { AuthController } from './app/Presentation/AuthController';
import { AuthService } from './app/Core/Repository/AuthService';
import { AuthRepository } from './app/DataAccess/Repository/AuthRepository';
import { IRepository } from './app/DataAccess/Interface/IRespository';
import { TYPES } from './app/Domain/Type';
import { IAuthService } from './app/Core/Interface/IAuthService';
import { ICategoria } from './app/DataAccess/Interface/ICategoria';
import { CategoriaRepository } from './app/DataAccess/Repository/CategoriaRepository';
import { ICategoryService } from './app/Core/Interface/ICategoryService';
import { CategoryService } from './app/Core/Repository/CategoryService';
import { CategoriaController } from './app/Presentation/CategoriaController';
 


const container = new Container();
container.bind(AuthController).toSelf().inSingletonScope();
container.bind(CategoriaController).toSelf().inSingletonScope();;
container.bind<IAuthService>(TYPES.IAuthService).to(AuthService);
container.bind<IRepository>(TYPES.IRepository).to(AuthRepository);
container.bind<ICategoria>(TYPES.ICategoria).to(CategoriaRepository);
container.bind<ICategoryService>(TYPES.ICategoria).to(CategoryService);


export { container };