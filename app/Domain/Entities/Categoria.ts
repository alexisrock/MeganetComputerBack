

export class Categoria {
  _id:string | undefined;
  nombreCategoria!: {
    type: string;
    required: true;
  };
}