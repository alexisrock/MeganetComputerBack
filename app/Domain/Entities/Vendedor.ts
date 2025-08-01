import { ObjectId } from "mongoose";

export class Vendedor{
    _id?:ObjectId ;

    usuario !: {
        type: string,
        required: true
    };
    password !: {
        type: string,
        required: true
    };
    created !: {
        type: Date,
    };
    nombre!:  {
        type: string,
        required: true
    };

};


