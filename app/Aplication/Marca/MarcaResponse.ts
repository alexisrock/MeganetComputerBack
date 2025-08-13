import { ObjectId } from "mongoose";

export class MarcaResponse {
    _id:ObjectId | undefined;
    Descripcion!:{
        type: string,
        required: true,
        trim: true
    }
}