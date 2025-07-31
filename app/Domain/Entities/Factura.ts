import mongoose from "mongoose";



export class Factura{
  
    cliente !: { type: mongoose.Schema.Types.ObjectId; ref: 'Cliente'; };
    total!: number;
    direccion!: string ;
    telefono!: number;
    fechaCreacion!: Date;
    fechamodificacion!: Date;
}
