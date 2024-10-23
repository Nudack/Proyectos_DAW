--/var/www/html/patricio.lan/CRUD/gestion_usuarios.sql

DROP DATABASE gestion;
CREATE DATABASE gestion;
use gestion;
CREATE TABLE usuarios(
    id                  INT(11) AUTO_INCREMENT PRIMARY KEY,
    nombre              VARCHAR(50) NOT NULL,
    email               VARCHAR(100) NOT NULL UNIQUE,
    edad                INT(3),
);

INSERT INTO usuarios(nombre, email, edad) VALUES('Armando Paredes', 'armando@gmail.com', '30');
INSERT INTO usuarios(nombre, email, edad) VALUES('Aitor Tilla', 'aitor@gmail.com', '18');
INSERT INTO usuarios(nombre, email, edad) VALUES('Solomeo Paredes', 'solomeo@gmail.com', '25');
INSERT INTO usuarios(nombre, email, edad) VALUES('Dolores Delano', 'armando@gmail.com', '19');
INSERT INTO usuarios(nombre, email, edad) VALUES('Armando Paredes', 'armando@gmail.com', '37');
INSERT INTO usuarios(nombre, email, edad) VALUES('Armando Paredes', 'armando@gmail.com', '56');
INSERT INTO usuarios(nombre, email, edad) VALUES('Armando Paredes', 'armando@gmail.com', '41');
INSERT INTO usuarios(nombre, email, edad) VALUES('Fernando Alonso', 'padre@gmail.com', '33');
INSERT INTO usuarios(nombre, email, edad) VALUES('Armando Paredes', 'armando@gmail.com', '21');
INSERT INTO usuarios(nombre, email, edad) VALUES('Armando Paredes', 'armando@gmail.com', '55');
INSERT INTO usuarios(nombre, email, edad) VALUES('Armando Paredes', 'armando@gmail.com', '39');
