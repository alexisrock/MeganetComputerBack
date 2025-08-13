import { controller, httpDelete, httpGet, httpPatch, httpPost, response } from "inversify-express-utils";
import { IMarcaService } from "../Aplication/Marca/IMarcaService";
import { inject } from "inversify";
import { TYPES } from "../Domain/Type";
import { Request, Response } from 'express';

/**
 * @swagger
 * tags:
 *   - name: marca
 *     description: GGestión de categorías
 */
@controller("/marca")
export class MarcaController {
    private readonly service: IMarcaService;

    /**
     *
     */
    constructor(@inject(TYPES.IMarcaService) service: IMarcaService) {
        this.service = service;
    }



    /**
    * @swagger
    * /api/marca/:
    *   post:
    *     summary:  Creación de marca
    *     tags: [marca]
    *     requestBody:
    *        required: true
    *        content:
    *            application/json:
    *              schema:
    *                  $ref: '#/components/schemas/MarcaRequest'
    *     responses:
    *       200:
    *         description: marca creada con éxito
    *       404:
    *         description: Producto no creado
    *       500:
    *         description: Error interno del servidor
    */

    @httpPost("/")
    async Create(req: Request, res: Response) {
        try {
            const response = await this.service.createMarca(req);
            return res.status(201).send(response);
        } catch (error) {
            return res.status(500).send("error: " + error);
        }
    }

    /**
        * @swagger
        * /api/marca/:
        *   patch:
        *     summary:  Actualización de marca
        *     tags: [marca]      
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
            const response = await this.service.updateMarca(req);
            return res.status(200).send(response);
        } catch (error) {
            return res.status(500).send("error: " + error);
        }
    }



    /**
     * @swagger
     * /api/marca/{id}:
     *   delete:
     *     summary: Eliminación de marca por identificación
     *     tags: [marca]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Id de la marca a eliminar
     *     responses:
     *       204:
     *         description: marca eliminada exitosamente
     *       404:
     *         description: marca no encontrada
     *       500:
     *         description: Error interno del servidor
     */
    @httpDelete("/:id")
    async Delete(req: Request, res: Response) {
        try {
            await this.service.deleteMarca(req);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).send('error: ' + error);
        }
    }




    /**
     * @swagger
     * /api/marca:
     *   get:
     *     summary: Muestra todas las marcas
     *     tags: [marca]       
     *     responses:
     *       200:
     *         description: Lista de marcas obtenida exitosamente     
     *       404:
     *         description: Producto no creado
     *       500:
     *         description: Error interno del servidor
     */

    @httpGet("/")
    async GetAll(@response() res: Response) {
        try {
            const marca = await this.service.getMarca();
            return res.status(200).send(marca);
        } catch (error) {
            return res.status(500).send("error: " + error);
        }
    }


        /**
     * @swagger
     * /api/marca/{id}:
     *   get:
     *     summary: Muestra una marca por ID
     *     tags: [marca]
     *     requestBody:
     *       required: true
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Id de la marca a buscar     
     *     responses:
     *       200:
     *         description: Lista de marca obtenida exitosamente      
     *       404:
     *         description: marca no creado
     *       500:
     *         description: Error interno del servidor
     */
        @httpGet("/:id")
        async GetById(req: Request, res: Response) {
            try {
                const marca = await this.service.getMarcaById(req);
                return res.status(200).send(marca);
            } catch (error) {
                return res.status(500).send('error: ' + error);
            }
        }
    


}