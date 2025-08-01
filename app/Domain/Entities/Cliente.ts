import { ObjectId } from "mongoose";

export class Cliente {
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
    password!:  string;     
    estado!: {
        type: boolean;
        default: false;
    };
    passwordResetToken!: string;
    passwordResetTokenExpires!: Date;
}