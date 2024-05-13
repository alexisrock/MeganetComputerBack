
import { Cliente } from "../Domain/Cliente";
// import   { bcrypt } from 'bcrypt';
import { AuthRepository } from '../DataAccess/authRepository';


export class AuthService{
    private readonly authRepository:  AuthRepository;

    constructor( authRepository:  AuthRepository ){
        this.authRepository = authRepository;        
    }

    async authentication(email: string, pass: string) : Promise<Cliente | undefined> {
        const cliente: Cliente | undefined = await this.authRepository.findById(email);
        
        if(cliente === undefined || cliente === null){           
            return undefined;             
        }
        
        
        
        
        // else{
        //     if(userinfo===null){ return   res.status(401).json({status: 'error', message: 'Cliente no encontrado'});}
        //     if(userinfo!= null && bcrypt.compareSync(req.body.password, userinfo.password)){
        //         userinfo.save(function(err, usuario){
        //             const token = jwt.sign({id: userinfo._id}, req.app.get('secretKey'), { expiresIn: '7d'});
        //             res.status(200).json({ message: 'Usuario encontrado', data: {usuario: usuario, token:token}});
        //         });
        //     }else{
        //         res.status(401).json({status: 'error', message: 'Invalid email/password'});
        //     }
        // }
  


    }



}