import { ObjectId } from "mongoose";

export class ClienteResponse {
    _id?:ObjectId ;
    cedula!: {
        type: string;
        required: [true, 'La cedula es obligatoria'];
        trim: true;
        unique: true;
    };
    nombre!: {
        type: string;
        trim: true;
    };
    apellidos!: string;
    direccion!: string;
    telefono!: string;
    email!: string;
    estado!:  boolean;    

}