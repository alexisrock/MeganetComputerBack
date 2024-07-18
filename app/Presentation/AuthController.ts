import { Request, Response } from 'express';
import { controller, httpPost } from 'inversify-express-utils';
import { inject } from 'inversify';
import { IAuthService } from '../Core/iAuthService';
import { TYPES } from '../Domain/Type';


@controller("/auth")
export class AuthController{


    private authService: IAuthService;
    constructor( @inject(TYPES.IAuthService)  _authService: IAuthService){
        this.authService = _authService;
    }

    @httpPost("/")
    async authenticate(req: Request, res: Response){      
        try {
         
            const email: string = req.params.email;
            const pass: string  = req.params.pass;
            const secret: string = req.app.get('secretKey');            
            const token = await this.authService.authentication(email, pass, secret);  
          
            if (token ===null || token === undefined) { 
                return res.status(404).send('Usuario no encontrado');
            }       
            if (token.status !== 200 ) { 
                return res.status(token.status).send( token.message);
            }                   
            
            return res.status(token.status).send( token.message);                     
        } catch (error) {
            return res.status(500).send('error: '+ error);
        }     
    }


    @httpPost("/create")
    async create(req: Request, res: Response){
        try {             
            const cliente = await this.authService.createAuth(req);
            if(cliente?.status === 200){
                return res.status(cliente?.status).send(cliente);
            }

            return res.status(404).send(cliente);
        } catch (error) {
            return res.status(500).send('error: '+ error);
        }

        
    }


}
// const Cliente = require('../Cliente/Cliente');
// const Vendedor = require('../Vendedor/Vendedor');
// const bcrypt = require();
// const jwt = require('jsonwebtoken');


// module.exports = {
    

//     authenticateVendedor: function(req, res, next){
//         Vendedor.findOne({usuario: req.body.idusuario}, function(err, userinfo){
 

//             if(err){
//                 next(err);                
//             }else{
//                 if(userinfo===null){ return   res.status(401).json({status: 'error', message: 'Vendedor no encontrado'});}
//                 if(userinfo!= null && bcrypt.compareSync(req.body.password, userinfo.password)){
//                     userinfo.save(function(err, usuario){
//                         const token = jwt.sign({id: userinfo._id}, req.app.get('secretKey'), { expiresIn: '7d'});
//                         res.status(200).json({ message: 'Usuario encontrado', data: {usuario: usuario, token:token}});
//                     });
//                 }else{
//                     res.status(401).json({status: 'error', message: 'Invalid email/password'});
//                 }
//             }
//         });
//     },

    
// }