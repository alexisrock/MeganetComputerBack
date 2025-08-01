import { BaseResponse } from "../../Domain/Common/BaseResponse";

export class ClienteResponse extends BaseResponse{
    _id:string | undefined;
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
  
}