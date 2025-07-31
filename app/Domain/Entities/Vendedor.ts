
export class Vendedor{
    usuario !: {
        type: string,
        required: true
    };
    password !: {
        type: string,
        required: true
    };
    created !: {
        type: Date,
    };
    nombre!:  {
        type: string,
        required: true
    };

};


