import { controller, httpDelete, httpGet, httpPatch, httpPost, response } from "inversify-express-utils";
import { TYPES } from "../Domain/Type";
import { ICategoryService } from "../Aplication/Category/ICategoryService";
import { inject } from "inversify";
import { Request, Response } from 'express';

/**
 * @swagger
 * tags:
 *   - name: category
 *     description: GGestión de categorías
 */

@controller("/category")
export class CategoriaController {

    private readonly cateogryService: ICategoryService;

    constructor(@inject(TYPES.ICategoryService) _cateogryService: ICategoryService) {
        this.cateogryService = _cateogryService;
    }



    /**
     * @swagger
     * /api/category/:
     *   post:
     *     summary:  Creación de categorías
     *     tags: [category]      
     *     requestBody:
     *        required: true
     *        content:
     *            application/json:
     *              schema:
     *                  $ref: '#/components/schemas/CategoryRequest'
     *     responses:
     *       200:
     *         description: Categoría actualizada exitosamente 
     *       404:
     *         description: Producto no creado
     *       500:
     *         description: Error interno del servidor
     */
    @httpPost("/")
    async Create(req: Request, res: Response) {
        try {
            const category = await this.cateogryService.createCategoria(req);
            return res.status(201).send(category);
        } catch (error) {
            return res.status(500).send('error: ' + error);
        }
    }



    /**
    * @swagger
    * /api/category/:
    *   patch:
    *     summary:  Actualización de categoría
    *     tags: [category]      
    *     requestBody:
    *        required: true
    *        content:
    *            application/json:
    *              schema:
    *                $ref: '#/components/schemas/CategoryUpdateRequest'
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
            const category = await this.cateogryService.updateCategoria(req);
            return res.status(200).send(category);
        } catch (error) {
            return res.status(500).send('error: ' + error);
        }
    }


    /**
     * @swagger
     * /api/category/{id}:
     *   delete:
     *     summary: Eliminación de categoría por identificación
     *     tags: [category]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Id de la categoría a eliminar
     *     responses:
     *       204:
     *         description: Categoría eliminada exitosamente
     *       404:
     *         description: Categoría no encontrada
     *       500:
     *         description: Error interno del servidor
     */
    @httpDelete("/:id")
    async Delete(req: Request, res: Response) {
        try {
            await this.cateogryService.deleteCategoria(req);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).send('error: ' + error);
        }
    }



    /**
     * @swagger
     * /api/category:
     *   get:
     *     summary: Muestra todas las categorías
     *     tags: [category]       
     *     responses:
     *       200:
     *         description: Lista de categorías obtenida exitosamente     
     *       404:
     *         description: Producto no creado
     *       500:
     *         description: Error interno del servidor
     */
    @httpGet("/")
    async GetAll(@response() res: Response) {
        try {
            const category = await this.cateogryService.getAllCAtegory();
            return res.status(200).send(category);
        } catch (error) {
            return res.status(500).send('error: ' + error);
        }
    }


    /**
     * @swagger
     * /api/category/{id}:
     *   get:
     *     summary: Muestra una categoría por ID
     *     tags: [category]
     *     requestBody:
     *       required: true
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Id de la categoría a buscar     
     *     responses:
     *       200:
     *         description: Lista de categorías obtenida exitosamente      
     *       404:
     *         description: Producto no creado
     *       500:
     *         description: Error interno del servidor
     */
    @httpGet("/:id")
    async GetById(req: Request, res: Response) {
        try {
            const category = await this.cateogryService.getCategoriaById(req);
            return res.status(200).send(category);
        } catch (error) {
            return res.status(500).send('error: ' + error);
        }
    }


    /**
     * @swagger
     * /api/category/by-name/{name}:
     *   get:
     *     summary: Muestra una categoría por nombre
     *     tags: [category]
     *     parameters:
     *       - in: path
     *         name: name
     *         required: true
     *         schema:
     *           type: string
     *         description: Nombre de la categoría a buscar
     *     responses:
     *       200:
     *         description: Lista de categorías obtenida exitosamente
     *       404:
     *         description: Categoría no encontrada
     *       500:
     *         description: Error interno del servidor
     */
    @httpGet("/by-name/:name")
    async GetByName(req: Request, res: Response) {
        try {
            const category = await this.cateogryService.getCategoriaByName(req);
            return res.status(200).send(category);
        } catch (error) {
            return res.status(500).send('error: ' + error);
        }
    }

}
