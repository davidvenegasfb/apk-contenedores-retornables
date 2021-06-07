CREATE DATABASE contenedoresretornables;

USE contenedoresretornables;

CREATE TABLE contenedores(
    matricula INT(5) AUTO_INCREMENT PRIMARY KEY,
    idCalle VARCHAR(10),
    numCalle INT(5),
    idActividad INT(7),
    numOrden VARCHAR(10),
    idCapacidad INT(3) NOT NULL,
    idProveedor VARCHAR(2),
    situacion VARCHAR(2),
    estadoretorn VARCHAR(2),
    fechinatala DATE,
    denomActividad VARCHAR(50) DEFAULT NULL,
    solicitante VARCHAR(100),
    DNI_NIF VARCHAR(10),
    fechaUltMov DATE DEFAULT NULL,
    fechaBaja DATE DEFAULT NULL,
    observacionesRetorn VARCHAR(300),
    expedienteAlta VARCHAR(100),
    cargaLateral BOOLEAN,
    caseta BOOLEAN,
    soterrado BOOLEAN
);

CREATE TABLE reposiciones(
    matricula INT(5),
    fecha DATE,
    expediente VARCHAR(10),
    entregadoPor VARCHAR(30),
    idCalle INT(5),
    numCalle VARCHAR(10),
    idActividad VARCHAR(3),
    numOrden VARCHAR(6),
    causa VARCHAR(50),
    DNIS VARCHAR(10),
    receptor VARCHAR(500),
    DNIR VARCHAR(10),
    asignatario VARCHAR(25),
    DNIA VARCHAR(10),
    FOREIGN KEY (matricula) REFERENCES contenedores(matricula)
);

CREATE TABLE bajas(
    matricula INT(5),
    fechabaja DATE,
    causa VARCHAR(15),
    expediente VARCHAR(300),
    observaciones VARCHAR(300),
    FOREIGN KEY (matricula) REFERENCES contenedores(matricula)
);

CREATE TABLE users(
    username VARCHAR(50) NOT NULL PRIMARY KEY,
    password VARCHAR(50)
);

INSERT INTO users(username,password) VALUES ('david','0123');
INSERT INTO users(username,password) VALUES ('felix','0123');

CREATE TABLE stock(
    capacidad INT(3) NOT NULL,
    cantidad INT(5) NOT NULL,
    fecha DATE
);

CREATE TABLE certificacion(
    capacidad INT(3) NOT NULL,
    cantidad INT(5) NOT NULL
);

INSERT INTO certificacion(capacidad, cantidad) VALUES (120,0);
INSERT INTO certificacion(capacidad, cantidad) VALUES (240,0);
INSERT INTO certificacion(capacidad, cantidad) VALUES (360,0);
INSERT INTO certificacion(capacidad, cantidad) VALUES (800,0);
INSERT INTO certificacion(capacidad, cantidad) VALUES (1000,0);

CREATE TABLE calles(
    codigo INT(6),
    denominacion VARCHAR(50)
);

CREATE TABLE numberpdf(
    numberpdf INT(5) AUTO_INCREMENT PRIMARY KEY
);

INSERT INTO numberpdf VALUES (0);
