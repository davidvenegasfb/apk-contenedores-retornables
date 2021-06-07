import { Router } from 'express';
import  contenedoresController from '../controllers/contenedoresController';

class ContenedoresRoutes {

    public router : Router = Router();

    constructor() {
        this.config(); 
    }

    //guardamos la dirección url que hace cada petición al servidor
    config(): void {
        this.router.get('/', contenedoresController.list);
        this.router.get('/sendemail/:numb/:correo', contenedoresController.sendemail);
        this.router.get('/number', contenedoresController.number);
        this.router.get('/coincidencia/:direccion',contenedoresController.getCoincidencia);
        this.router.get('/denominaciones', contenedoresController.denominaciones);
        this.router.get('/calles', contenedoresController.getCalles);
        this.router.get('/reposiciones/:matricula', contenedoresController.verReposiciones);
        this.router.get('/bajas', contenedoresController.verBajas);
        this.router.get('/stock', contenedoresController.stock);
        this.router.get('/busquedax/:calle', contenedoresController.list1);
        this.router.get('/busquedax/:calle/:numero', contenedoresController.list2);
        this.router.get('/login/:user/:password', contenedoresController.login);
        this.router.get('/id', contenedoresController.nextID);
        this.router.get('/:matricula', contenedoresController.getOne);
        this.router.get('/2/:matricula', contenedoresController.getReposicion);
        this.router.get('/reposicion/:matricula', contenedoresController.getReposicion);
        this.router.get('/baja/:matricula', contenedoresController.getBaja);
        this.router.post('/', contenedoresController.create);
        this.router.post('/del', contenedoresController.delete);
        this.router.put('/:matricula',contenedoresController.update);
        this.router.post('/reposicion',contenedoresController.reponer);
        this.router.post('/compra',contenedoresController.comprar);
    }

}

const contenedoresRoutes = new ContenedoresRoutes();
export default contenedoresRoutes.router;