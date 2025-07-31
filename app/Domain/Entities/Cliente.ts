export class Cliente {
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
    password!:  string;     
    estado!: {
        type: boolean;
        default: false;
    };
    passwordResetToken!: string;
    passwordResetTokenExpires!: Date;
}