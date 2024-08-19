import { BaseResponse } from "../Common/BaseResponse";

export class CategoriaResponse extends BaseResponse {

    _id:string | undefined;
    nombreCategoria!: {
      type: string;
      required: true;
    };

}

export class CategoryOut {
  _id:string | undefined;
    nombreCategoria!: {
      type: string;
      required: true;
    };
}



export class CategorysResponse extends BaseResponse{
  listCategory: CategoryOut[] = [];
}