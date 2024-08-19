import express from "express"; 
import request from "supertest";
import { AuthController } from "../../Presentation/AuthController";
import { IAuthService } from "../../Core/Interface/IAuthService";
 
const app = express();
app.use(express.json());


let iAuthService = {
    authentication: jest.fn(),
    createAuth: jest.fn()
}

const authController = new AuthController(iAuthService as unknown as IAuthService);

app.post("/auth/create", (req, res) => authController.create(req, res));

describe("AuthController", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Limpiar mocks después de cada prueba
    });


    test("debería devolver el usuario con el correo y la contraseña cifrada", async () => {
        const cliente: any  = {
            cedulaCli: "1010180198",
            nombrecli: "jaime alexis",
            apellidosCli: "bueno castro",
            direccionCli: "carrera 76 No 8 - 06",
            telefonoCli: "3177661451",
            emailCli: "alexisrock2000gmail.com",
            pass: "123456"
        } ;
       

        request(app, { http2: true })
        .post("/auth/create")
        .send(cliente)
        .expect(200);
         
    });

});