import { Request, Response } from 'express';
// import   { bcrypt } from 'bcrypt';
import { AuthService } from '../Core/authService';
import { Service } from 'typedi';

@Service()
export class AuthController{

private readonly authService: AuthService;

    constructor(authService: AuthService){
        this.authService = authService;
    }

    async authenticate(req: Request, res: Response){      
        try {
            console.log("parametros",req.params)
            const email: string = req.params.email;
            const pass: string  = req.params.pass;

            console.log("authService", this.authService)
            const cliente = await this.authService.authentication(email, pass);  
            console.log("cliente",cliente) 
            if (cliente) {               

              res.json(cliente);
            } else {
              res.status(404).send('Usuario no encontrado');
            }
            
        } catch (error) {
            res.status(500).send('error: '+ error);
        }     
    }
}
// const Cliente = require('../Cliente/Cliente');
// const Vendedor = require('../Vendedor/Vendedor');
// const bcrypt = require();
// const jwt = require('jsonwebtoken');


// module.exports = {
    
//     authenticate: function(req, res, next){
//         Cliente.findOne({email: req.body.email}, function(err, userinfo){
     
//             if(err){
//                 next(err);                
//             }else{
//                 if(userinfo===null){ return   res.status(401).json({status: 'error', message: 'Cliente no encontrado'});}
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