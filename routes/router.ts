import { Router} from "express";
import Container from "typedi";
import { AuthController } from "../app/Presentation/AuthController";


const router = Router();

const auth:AuthController  = Container.get(AuthController);
console.log("entro")
router.post('/auth',auth.authenticate);


export {router}