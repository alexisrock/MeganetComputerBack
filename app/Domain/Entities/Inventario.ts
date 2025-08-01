import mongoose, { ObjectId } from "mongoose";


export class Inventario{
    _id:ObjectId | undefined;

    Producto!: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto'};
    CantidadInicial !:{
        type: number,
        default: 0
    };
    CantidadSalida!: {
        type: number,
        default: 0
    };
    FechaCreacion!: {
        type: Date,
       
    };
    CantidadTotal!: {
        type: number,
        default: 0
    };
}

