import mongoose, { ObjectId } from "mongoose";



export class Factura{
    _id:ObjectId | undefined;
    cliente !: { type: mongoose.Schema.Types.ObjectId; ref: 'Cliente'; };
    total!: number;
    direccion!: string ;
    telefono!: number;
    fechaCreacion!: Date;
    fechamodificacion!: Date;
}
