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
 


const container = new Container();
container.bind(AuthController).toSelf().inSingletonScope();
container.bind(CategoriaController).toSelf().inSingletonScope();;
container.bind<IAuthService>(TYPES.IAuthService).to(AuthService);
container.bind<IRepository>(TYPES.IRepository).to(AuthRepository);
container.bind<ICategoria>(TYPES.ICategoria).to(CategoriaRepository);
container.bind<ICategoryService>(TYPES.ICategoria).to(CategoryService);


export { container };