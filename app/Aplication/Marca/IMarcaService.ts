import { BaseResponse } from "../Common/BaseResponse";
import { Request } from "express";
import { MarcaResponse } from "./MarcaResponse";

export interface IMarcaService {
  createMarca(req: Request): Promise<BaseResponse | undefined>;
  updateMarca(eq: Request): Promise<BaseResponse | undefined>;
  deleteMarca(req: Request): Promise<BaseResponse | undefined>;
  getMarcaById(req: Request): Promise<MarcaResponse | undefined>;
  getMarca(): Promise<MarcaResponse[] | undefined>;

}
