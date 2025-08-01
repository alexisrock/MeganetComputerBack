import mongoose from "mongoose";
 


export class DetalleFactura{
    _id:string | undefined;
    factura!:{ type : mongoose.Schema.Types.ObjectId, ref: 'Factura'};
    producto!: {type: mongoose.Schema.Types.ObjectId, ref: 'Producto'};
    cantidad!: number;
    total!: {
        type: number,
        required: true
    }
};

 