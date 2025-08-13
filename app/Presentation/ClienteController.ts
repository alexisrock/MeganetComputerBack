import { controller, httpGet, httpPatch, httpPost, response } from "inversify-express-utils";
import { IClienteService } from '../Aplication/Cliente/IClienteService';
import { TYPES } from "../Domain/Type";
import { inject } from "inversify";
import { Request, Response } from 'express';

/**
 * @swagger
 * tags:
 *   - name: client
 *     description: GGestión de categorías
 */
@controller("/client")
export class ClienteController {
  private readonly service: IClienteService;

  /**
   *
   */
  constructor(@inject(TYPES.IClienteService) service: IClienteService) {
    this.service = service;
  }

  /**
   * @swagger
   * /api/client/:
   *   post:
   *     summary:  Creación de cliente
   *     tags: [client]
   *     requestBody:
   *        required: true
   *        content:
   *            application/json:
   *              schema:
   *                  $ref: '#/components/schemas/ClienteCreateRequest'
   *     responses:
   *       200:
   *         description: Cliente creado con éxito
   *       404:
   *         description: Producto no creado
   *       500:
   *         description: Error interno del servidor
   */

  @httpPost("/")
  async Create(req: Request, res: Response) {
    try {
      const response = await this.service.createCliente(req);
      return res.status(201).send(response);
    } catch (error) {
      return res.status(500).send("error: " + error);
    }
  }

/**
    * @swagger
    * /api/client/:
    *   patch:
    *     summary:  Actualización de categoría
    *     tags: [client]      
    *     requestBody:
    *        required: true
    *        content:
    *            application/json:
    *              schema:
    *                $ref: '#/components/schemas/ClienteUpdateRequest'
    *     responses:
    *       200:
    *         description: Cliente actualizado exitosamente 
    *       404:
    *         description: Producto no creado
    *       500:
    *         description: Error interno del servidor
    */  

  @httpPatch("/")
  async Updtate(req: Request, res: Response) {
    try {
      const response = await this.service.updateCliente(req);
      return res.status(200).send(response);
    } catch (error) {
      return res.status(500).send("error: " + error);
    }
  }

    /**
     * @swagger
     * /api/client:
     *   get:
     *     summary: Muestra todos los clientes
     *     tags: [client]       
     *     responses:
     *       200:
     *         description: Lista de clientes obtenida exitosamente     
     *       404:
     *         description: Producto no creado
     *       500:
     *         description: Error interno del servidor
     */

  @httpGet("/")
  async GetAll(@response() res: Response) {
    try {
      const category = await this.service.getAll();
      return res.status(200).send(category);
    } catch (error) {
      return res.status(500).send("error: " + error);
    }
  }
}