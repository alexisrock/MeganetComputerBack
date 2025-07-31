import mongoose from "mongoose";


export class Producto{
    codigo!:{
        type: string,
        required: true,
        trim: true
    };
    Nombre!: {
        type: string,
        required: true,
        trim: true
    };
    Precio !: {
        type: number,
        required: true
    };
    Marca!: {type: mongoose.Schema.Types.ObjectId, ref: 'Marca'};
    Descripcion!: {
        type: string,
        required: true,
        trim: true
    };
    FechaCreacion!: {
        type: Date,
         
    };
    PrecioVenta!:  number;
    Estado!: {
        type: boolean,
        default: true
    };
    EsPaginaInicial !: {
        type: boolean,
        default: false
    };
    Categoria!:{type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' };
    UrlImagen!: {
        type:string
    
    }

}