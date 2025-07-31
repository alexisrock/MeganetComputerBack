import mongoose from "mongoose";


export class Inventario{
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

