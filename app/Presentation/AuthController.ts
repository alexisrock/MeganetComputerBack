import { Request, Response } from 'express';
import { controller, httpPost } from 'inversify-express-utils';
import { inject } from 'inversify';
import { IAuthService } from '../Aplication/Authentication/IAuthService';
import { TYPES } from '../Domain/Type';

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: Gestión de autenticacion
 */
@controller("/Authentication")
export class AuthController {
  private readonly authService: IAuthService;

  /**
  *
  */
  constructor(@inject(TYPES.IAuthService) _authService: IAuthService) {
    this.authService = _authService;
  }



  /**
   * @swagger
   * /api/Authentication/:
   *   post:
   *     summary: Autenticacion del usuario
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/AuthenticatorRequest'
   *     responses:
   *       200:
   *         description: autenticacion exitosa
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/TokenResponse'
   *       404:
   *         description: Producto no creado
   *       500:
   *         description: Error interno del servidor
   */
  @httpPost("/")
  async authenticate(req: Request, res: Response) {
    try {
      const email: string = req.params.email;
      const pass: string = req.params.pass;
      const secret: string = req.app.get("secretKey");
      const token = await this.authService.authentication(email, pass, secret);

      if (token === null || token === undefined) {
        return res.status(404).send("Usuario no encontrado");
      }
      if (token.status !== 200) {
        return res.status(token.status).send(token.message);
      }

      return res.status(token.status).send(token.message);
    } catch (error) {
      return res.status(500).send("error: " + error);
    }
  }





  /**
   * @swagger
   * /api/Authentication/create:
   *   post:
   *     summary: Autenticacion del usuario
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ClienteRequest'
   *     responses:
   *       200:
   *         description: autenticacion exitosa
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ClienteResponse'
   *       404:
   *         description: Producto no creado
   *       500:
   *         description: Error interno del servidor
   */
  @httpPost("/create")
  async create(req: Request, res: Response) {
    try {
      const cliente = await this.authService.createAuth(req);
      if (cliente?.status === 200) {
        return res.status(cliente?.status).send(cliente);
      }

      return res.status(404).send(cliente);
    } catch (error) {
      return res.status(500).send("error: " + error);
    }
  }
}
