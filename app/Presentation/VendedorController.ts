import { controller, httpDelete, httpPatch, httpPost } from "inversify-express-utils";
import { IVendedorService } from '../Aplication/Vendedor/IVendedorService';
import { TYPES } from "../Domain/Type";
import { inject } from "inversify";
import { Request, Response } from 'express';


/**
 * @swagger
 * tags:
 *   - name: vendor
 *     description: Gestión de categorías
 */

@controller("/vendor")
export class VendedorController{


    private readonly service: IVendedorService;

    /**
     *
     */
    constructor(@inject(TYPES.IVendedorService)service: IVendedorService) {
        this.service = service        
    }


     /**
     * @swagger
     * /api/vendor/:
     *   post:
     *     summary:  Creación de vendedores
     *     tags: [vendor]      
     *     requestBody:
     *        required: true
     *        content:
     *            application/json:
     *              schema:
     *                  $ref: '#/components/schemas/VendedorRequest'
     *     responses:
     *       200:
     *         description: Vendedor creado exitosamente 
     *       404:
     *         description: Producto no creado
     *       500:
     *         description: Error interno del servidor
     */
     @httpPost("/")
     async Create(req: Request, res: Response) {
         try {
             const response = await this.service.createVendedor(req);
             return res.status(201).send(response);
         } catch (error) {
             return res.status(500).send('error: ' + error);
         }
     }


    /**
    * @swagger
    * /api/vendor/:
    *   patch:
    *     summary:  Actualización de vendedor
    *     tags: [vendor]      
    *     requestBody:
    *        required: true
    *        content:
    *            application/json:
    *              schema:
    *                $ref: '#/components/schemas/VendedorUpdateRequest'
    *     responses:
    *       200:
    *         description: Categoría actualizada exitosamente 
    *       404:
    *         description: Producto no creado
    *       500:
    *         description: Error interno del servidor
    */
    @httpPatch("/")
    async Updtate(req: Request, res: Response) {
        try {
            const category = await this.service.updateVendedor(req);
            return res.status(200).send(category);
        } catch (error) {
            return res.status(500).send('error: ' + error);
        }
    }




        /**
     * @swagger
     * /api/vendor/{id}:
     *   delete:
     *     summary: Eliminación de vendedores por id
     *     tags: [vendor]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Id de la vendedor a eliminar
     *     responses:
     *       204:
     *         description: vendedores eliminado exitosamente
     *       404:
     *         description: Categoría no encontrada
     *       500:
     *         description: Error interno del servidor
     */
    @httpDelete("/:id")
    async Delete(req: Request, res: Response) {
        try {
            await this.service.deleteVendedor(req);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).send('error: ' + error);
        }
    }

}