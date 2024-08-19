import { BaseResponse } from "../Common/BaseResponse";

export class CategoriaResponse extends BaseResponse {

    _id:string | undefined;
    nombreCategoria!: {
      type: String;
      required: true;
    };

}