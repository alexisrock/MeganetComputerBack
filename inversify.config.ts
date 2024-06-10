import { Container } from 'inversify';
import { AuthController } from './app/Presentation/AuthController';
import { AuthService } from './app/Core/authService';
import { AuthRepository } from './app/DataAccess/authRepository';
import { IRepository } from './app/DataAccess/IRespository';
import { TYPES } from './app/Domain/Type';
import { IAuthService } from './app/Core/iAuthService';
 
 


const container = new Container();
container.bind(AuthController).toSelf().inSingletonScope();;
container.bind<IAuthService>(TYPES.IAuthService).to(AuthService);
container.bind<IRepository>(TYPES.IRepository).to(AuthRepository);


export { container };