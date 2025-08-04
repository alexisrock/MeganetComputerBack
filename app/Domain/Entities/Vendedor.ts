import { ObjectId } from "mongoose";

export class Vendedor{
    _id?:ObjectId ;

    usuario !: {
        type: string,
        required: true
    };
    password !:string;
    created !: Date;
    nombre!:  string;
       


};


