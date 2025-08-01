import { ObjectId } from "mongoose";


export class Marca{
    _id:ObjectId | undefined;
    Descripcion!:{
        type: string,
        required: true,
        trim: true
    }
}

 