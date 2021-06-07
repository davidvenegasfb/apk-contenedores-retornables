import { Request, Response } from 'express';
import pool from '../database';

class ContenedorController {

    public async list (req: Request, res: Response) {
        const contenedores = await pool.query('SELECT matricula FROM contenedores UNION SELECT matricula FROM bajas EXCEPT SELECT matricula FROM contenedores INTERSECT SELECT matricula FROM bajas');
        res.json(contenedores);
    }

    public async list2 (req: Request, res: Response) {
        const { calle } = req.params;
        const { numero } = req.params;
        const contenedores = await pool.query('SELECT * FROM contenedores WHERE idCalle = ? AND numCalle = ? UNION SELECT matricula FROM bajas EXCEPT SELECT matricula FROM contenedores INTERSECT SELECT matricula FROM bajas', [calle, numero]); 
        res.json(contenedores);
    }

    public async list1 (req: Request, res: Response) {
        const { calle } = req.params;
        const contenedores = await pool.query('SELECT * FROM contenedores WHERE idCalle = ? INTERSECT SELECT matricula FROM bajas', [calle]);
        return res.json(contenedores);
    }
    
    public async  getCalles (req: Request, res: Response): Promise<any> {
        const calles = await pool.query('SELECT DISTINCT idCalle FROM contenedores');
        return res.json(calles);
    }

    public async login (req: Request, res: Response): Promise<any> {
        const { user } = req.params;
        const { password } = req.params;
        const uname = await pool.query('SELECT username FROM users WHERE username = ? and password = ?', [user, password]);
        return res.json(uname[0]);
    }

    public async getOne (req: Request, res: Response): Promise<any> {
        const { matricula } = req.params;
        const contenedores = await pool.query('SELECT * FROM contenedores WHERE matricula = ?', [matricula]);
        return res.json(contenedores[0]);
    }

    public async comprar (req: Request, res: Response): Promise<any> {
        let dateTime = new Date;
        const contenedores = await pool.query('INSERT INTO stock (capacidad,cantidad,fecha) VALUES (?,?,?)', [req.body.capacidad, req.body.cantidad, dateTime]);
        return res.json(contenedores[0]);
    }

    public async getReposicion (req: Request, res: Response): Promise<any> {
        const { matricula } = req.params;
        const reposicion = await pool.query('SELECT * FROM  reposiciones WHERE matricula = ?', [matricula]);
        return res.json(reposicion);
    }

    public async getBaja (req: Request, res: Response): Promise<any> {
        const { matricula } = req.params;
        const reposicion = await pool.query('SELECT * FROM bajas WHERE matricula = ?', [matricula]);
        return res.json(reposicion);
    }

    public async denominaciones (req: Request, res: Response): Promise<any> {
        const denominaciones = await pool.query('SELECT * FROM calles ORDER BY denominacion');
        return res.json(denominaciones);
    }

    public async  getCoincidencia (req: Request, res: Response): Promise<any> {
        const codigo = await pool.query('SELECT * FROM  calles WHERE denominacion = ?', req.params.direccion);
        return res.json(codigo[0].codigo);
    }

    public async create (req: Request, res: Response): Promise<void>{
        let dateTime = new Date;
        await pool.query('INSERT INTO stock (capacidad, cantidad, fecha) VALUES (?,-1,?)', [req.body.contenedor.idCapacidad, dateTime]);
        await pool.query('INSERT INTO contenedores set ?', [req.body.contenedor]);
        await pool.query('UPDATE certificacion SET cantidad = cantidad+1 WHERE capacidad = ?', req.body.contenedor.idCapacidad);
    }

    public async delete (req: Request, res: Response): Promise<void>{
        await pool.query('INSERT INTO bajas (matricula,fechabaja,causa,expediente,observaciones) VALUES ((SELECT matricula FROM contenedores WHERE matricula = ?),(SELECT NOW()),\'Baja\',?,?)',
        [req.body.matricula,req.body.expedienteAlta,req.body.observacionesRetorn]);
        await pool.query('UPDATE contenedores SET estadoretorn = \'b\' WHERE matricula = ?',[req.body.matricula]);
        await pool.query('UPDATE certificacion SET cantidad = cantidad-1 WHERE capacidad = ?', req.body.idCapacidad);
        res.json();
    }

    public async update (req: Request, res: Response): Promise<void>{
        const { matricula } = req.params;
        await pool.query('UPDATE contenedores SET ? WHERE matricula = ?', [req.body, matricula]);
        res.json()
    }

    public async reponer (req: Request, res: Response): Promise<void>{
        let dateTime = new Date;
        let parse = req.body.nombre+";"+req.body.direccion+";"+req.body.telefono;
        await pool.query('INSERT INTO reposiciones (matricula,fecha,entregadoPor,causa,Receptor,DNIR) VALUES (?,?,\'ServicioContenedores\',?,?,?)', [req.body.matricula,dateTime,req.body.causa,parse,req.body.cif]);
        res.json()
    }

    public async nextID (req: Request, res: Response): Promise<any>{
        var ID = await pool.query('select AUTO_INCREMENT FROM information_schema.tables WHERE table_name = \'contenedores\'');
        return res.json(ID);
    }

    public async  verReposiciones (req: Request, res: Response): Promise<any> {
        const reposiciones = await pool.query('SELECT * FROM  reposiciones WHERE matricula = ?', req.params.matricula);
        return res.json(reposiciones);
    }

    public async  verBajas (req: Request, res: Response): Promise<any> {
        const bajas = await pool.query('SELECT * FROM  bajas');
        return res.json(bajas);
    }

    public async stock (req: Request, res: Response): Promise<any> {
        const stock = await pool.query('SELECT * FROM stock');
        return res.json(stock);
    }

    public async number (req: Request, res: Response): Promise<any> {
        const next = await pool.query('SELECT * FROM numberpdf');
        await pool.query('UPDATE numberpdf SET numberpdf = numberpdf+1');

        return res.json(next[0].numberpdf);
    }

    public async sendemail (req: Request, res: Response): Promise<any> {

        const next = +req.params.numb;

        var nodemailer = require('nodemailer');
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'inagrait@gmail.com',
            pass: 'servicios'
        }
        });

        var mailOptions = {
        from: 'inagrait@gmail.com',
        to: req.params.correo,
        subject: 'Ticket Recibo Contenedor',
        text: 'Se le adjunta un recibo correspondiente al contenedor recibido por Inagra',
        attachments: [
            {   // file on disk as an attachment
                filename: 'ReciboContenedorInagra.pdf',
                path: 'C:/Users/djgon/Downloads/recibo'+next+'.pdf' // stream this file
            }
        ]
        };

        transporter.sendMail(mailOptions, function(error: any, info: { response: string; }){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        });

        mailOptions = {
            from: 'inagrait@gmail.com',
            to: 'inagrait@gmail.com',
            subject: 'Ticket Recibo Contenedor copia',
            text: 'Copia pdf '+next,
            attachments: [
                {   // file on disk as an attachment
                    filename: 'CopiaContenedor'+next+'.pdf',
                    path: 'C:/Users/djgon/Downloads/recibo'+next+'.pdf' // stream this file
                }
            ]
            };
    
            transporter.sendMail(mailOptions, function(error: any, info: { response: string; }){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
            });

        return res.json(next);
    }

}

const contenedoresController =  new ContenedorController();
export default contenedoresController;