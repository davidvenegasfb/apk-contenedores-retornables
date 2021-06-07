"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class ContenedorController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const contenedores = yield database_1.default.query('SELECT matricula FROM contenedores UNION SELECT matricula FROM bajas EXCEPT SELECT matricula FROM contenedores INTERSECT SELECT matricula FROM bajas');
            res.json(contenedores);
        });
    }
    list2(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { calle } = req.params;
            const { numero } = req.params;
            const contenedores = yield database_1.default.query('SELECT * FROM contenedores WHERE idCalle = ? AND numCalle = ? UNION SELECT matricula FROM bajas EXCEPT SELECT matricula FROM contenedores INTERSECT SELECT matricula FROM bajas', [calle, numero]);
            res.json(contenedores);
        });
    }
    list1(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { calle } = req.params;
            const contenedores = yield database_1.default.query('SELECT * FROM contenedores WHERE idCalle = ? INTERSECT SELECT matricula FROM bajas', [calle]);
            return res.json(contenedores);
        });
    }
    getCalles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const calles = yield database_1.default.query('SELECT DISTINCT idCalle FROM contenedores');
            return res.json(calles);
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req.params;
            const { password } = req.params;
            const uname = yield database_1.default.query('SELECT username FROM users WHERE username = ? and password = ?', [user, password]);
            return res.json(uname[0]);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { matricula } = req.params;
            const contenedores = yield database_1.default.query('SELECT * FROM contenedores WHERE matricula = ?', [matricula]);
            return res.json(contenedores[0]);
        });
    }
    comprar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let dateTime = new Date;
            const contenedores = yield database_1.default.query('INSERT INTO stock (capacidad,cantidad,fecha) VALUES (?,?,?)', [req.body.capacidad, req.body.cantidad, dateTime]);
            return res.json(contenedores[0]);
        });
    }
    getReposicion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { matricula } = req.params;
            const reposicion = yield database_1.default.query('SELECT * FROM  reposiciones WHERE matricula = ?', [matricula]);
            return res.json(reposicion);
        });
    }
    getBaja(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { matricula } = req.params;
            const reposicion = yield database_1.default.query('SELECT * FROM bajas WHERE matricula = ?', [matricula]);
            return res.json(reposicion);
        });
    }
    denominaciones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const denominaciones = yield database_1.default.query('SELECT * FROM calles ORDER BY denominacion');
            return res.json(denominaciones);
        });
    }
    getCoincidencia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const codigo = yield database_1.default.query('SELECT * FROM  calles WHERE denominacion = ?', req.params.direccion);
            return res.json(codigo[0].codigo);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let dateTime = new Date;
            yield database_1.default.query('INSERT INTO stock (capacidad, cantidad, fecha) VALUES (?,-1,?)', [req.body.contenedor.idCapacidad, dateTime]);
            yield database_1.default.query('INSERT INTO contenedores set ?', [req.body.contenedor]);
            yield database_1.default.query('UPDATE certificacion SET cantidad = cantidad+1 WHERE capacidad = ?', req.body.contenedor.idCapacidad);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO bajas (matricula,fechabaja,causa,expediente,observaciones) VALUES ((SELECT matricula FROM contenedores WHERE matricula = ?),(SELECT NOW()),\'Baja\',?,?)', [req.body.matricula, req.body.expedienteAlta, req.body.observacionesRetorn]);
            yield database_1.default.query('UPDATE contenedores SET estadoretorn = \'b\' WHERE matricula = ?', [req.body.matricula]);
            yield database_1.default.query('UPDATE certificacion SET cantidad = cantidad-1 WHERE capacidad = ?', req.body.idCapacidad);
            res.json();
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { matricula } = req.params;
            yield database_1.default.query('UPDATE contenedores SET ? WHERE matricula = ?', [req.body, matricula]);
            res.json();
        });
    }
    reponer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let dateTime = new Date;
            let user = req.body.username;
            yield database_1.default.query('INSERT INTO reposiciones (matricula,fecha,entregadoPor,causa) VALUES (?,?,?,?)', [req.body.matricula, dateTime, user, req.body.causa]);
            res.json(100);
        });
    }
    nextID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var ID = yield database_1.default.query('select AUTO_INCREMENT FROM information_schema.tables WHERE table_name = \'contenedores\'');
            return res.json(ID);
        });
    }
    verReposiciones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const reposiciones = yield database_1.default.query('SELECT * FROM  reposiciones WHERE matricula = ?', req.params.matricula);
            return res.json(reposiciones);
        });
    }
    verBajas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const bajas = yield database_1.default.query('SELECT * FROM  bajas');
            return res.json(bajas);
        });
    }
    stock(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const stock = yield database_1.default.query('SELECT * FROM stock');
            return res.json(stock);
        });
    }
    number(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const next = yield database_1.default.query('SELECT * FROM numberpdf');
            yield database_1.default.query('UPDATE numberpdf SET numberpdf = numberpdf+1');
            return res.json(next[0].numberpdf);
        });
    }
    sendemail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                    {
                        filename: 'ReciboContenedorInagra.pdf',
                        path: 'C:/Users/djgon/Downloads/recibo' + next + '.pdf' // stream this file
                    }
                ]
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('Email sent: ' + info.response);
                }
            });
            mailOptions = {
                from: 'inagrait@gmail.com',
                to: 'inagrait@gmail.com',
                subject: 'Ticket Recibo Contenedor copia',
                text: 'Copia pdf ' + next,
                attachments: [
                    {
                        filename: 'CopiaContenedor' + next + '.pdf',
                        path: 'C:/Users/djgon/Downloads/recibo' + next + '.pdf' // stream this file
                    }
                ]
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('Email sent: ' + info.response);
                }
            });
            return res.json(next);
        });
    }
}
const contenedoresController = new ContenedorController();
exports.default = contenedoresController;
