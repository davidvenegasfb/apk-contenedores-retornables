"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contenedoresController_1 = __importDefault(require("../controllers/contenedoresController"));
class ContenedoresRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', contenedoresController_1.default.list);
        this.router.get('/sendemail/:numb/:correo', contenedoresController_1.default.sendemail);
        this.router.get('/number', contenedoresController_1.default.number);
        this.router.get('/coincidencia/:direccion', contenedoresController_1.default.getCoincidencia);
        this.router.get('/denominaciones', contenedoresController_1.default.denominaciones);
        this.router.get('/calles', contenedoresController_1.default.getCalles);
        this.router.get('/reposiciones/:matricula', contenedoresController_1.default.verReposiciones);
        this.router.get('/bajas', contenedoresController_1.default.verBajas);
        this.router.get('/stock', contenedoresController_1.default.stock);
        this.router.get('/busquedax/:calle', contenedoresController_1.default.list1);
        this.router.get('/busquedax/:calle/:numero', contenedoresController_1.default.list2);
        this.router.get('/login/:user/:password', contenedoresController_1.default.login);
        this.router.get('/id', contenedoresController_1.default.nextID);
        this.router.get('/:matricula', contenedoresController_1.default.getOne);
        this.router.get('/2/:matricula', contenedoresController_1.default.getReposicion);
        this.router.get('/reposicion/:matricula', contenedoresController_1.default.getReposicion);
        this.router.get('/baja/:matricula', contenedoresController_1.default.getBaja);
        this.router.post('/', contenedoresController_1.default.create);
        this.router.post('/del', contenedoresController_1.default.delete);
        this.router.put('/:matricula', contenedoresController_1.default.update);
        this.router.post('/reposicion', contenedoresController_1.default.reponer);
        this.router.post('/compra', contenedoresController_1.default.comprar);
    }
}
const contenedoresRoutes = new ContenedoresRoutes();
exports.default = contenedoresRoutes.router;
