/*
CREATE TABLE carreras(
id_carrera INT AUTO_INCREMENT,
nombre VARCHAR(50),

CONSTRAINT pk_carreras PRIMARY KEY(id_carrera)
);

CREATE TABLE profesores(
id_profesor INT AUTO_INCREMENT,
nombre VARCHAR(50),
email VARCHAR(50),

CONSTRAINT pk_profesores PRIMARY KEY(id_profesor)
);

CREATE TABLE alumnos(
id_alumno INT AUTO_INCREMENT,
Nombre VARCHAR(50) NOT NULL, 
dni INT ,
email VARCHAR(50) NOT NULL,
id_carrera INT,

CONSTRAINT pk_alumnos PRIMARY KEY (id_alumno),
CONSTRAINT uk_dni UNIQUE  (dni),

CONSTRAINT fk_alumnos_carrera
FOREIGN KEY(id_carrera)
REFERENCES carreras(id_carrera)
);

CREATE TABLE materias(
id_materia INT AUTO_INCREMENT,
nombre VARCHAR(50),
curso VARCHAR(50),
id_profesor INT,
id_carrera INT,

CONSTRAINT pk_materias PRIMARY KEY (id_materia),

CONSTRAINT fk_materias_profesor
FOREIGN KEY(id_profesor)
REFERENCES profesores(id_profesor),

CONSTRAINT fk_materia_carrera
FOREIGN KEY (id_carrera)
REFERENCES carreras(id_carrera)
);
*/

/*21/04/25*/

/*
punto 1
SELECT materias.nombre, COUNT(alumnos.id_alumno)
FROM alumnos INNER JOIN carreras ON alumnos.id_carrera= carreras.id_carrera
INNER JOIN materias ON carreras.id_carrera= materias.id_carrera
GROUP BY materias.id_materia, materias.nombre
*/

/*
punto 2
SELECT carreras.nombre,COUNT(alumnos.id_alumno)
FROM alumnos INNER JOIN carreras ON alumnos.id_carrera=carreras.id_carrera
GROUP BY carreras.id_carrera, carreras.nombre;
*/

/*
punto 3

CREATE TABLE alumno_materia(
 id_alumno INT,
 id_materia INT,
 nota_examen INT,

 PRIMARY KEY(id_alumno,id_materia),

 FOREIGN KEY(id_alumno) REFERENCES alumnos(id_alumno),
 FOREIGN KEY(id_materia) REFERENCES materias(id_materia)
);

*/
/*
INSERT INTO alumno_materia(id_alumno,id_materia,nota_examen)
VALUES
(1,1,8),
(1,2,6),
(1,3,9),
(2,1,4),
(2,5,7),
(3,2,10);
*/

/*
ALTER TABLE alumnos
ADD fecha_nacimiento DATE 
*/

/*

ALTER TABLE materias
ADD nota_aprobacion INT 
*/

 
/*
4_
ALTER TABLE alumnos
ADD trayectoria_alumno VARCHAR (50)
*/

/*27/04/2026*/
/*
punto 1
CREATE TABLE usuarios (
id_usuario INT AUTO_INCREMENT,
nombre VARCHAR(50),
correo VARCHAR(100),
contraseña VARCHAR (100) NOT NULL,

CONSTRAINT pk_usuario PRIMARY KEY (id_usuario)
);
*/

/*
punto 2
INSERT INTO usuarios (id_usuario, nombre, correo, contraseña)
VALUES 
(1,'Nico','nicoporro@gmail.com','fafa2025'),
(2,'Enzo','enzoRo@gmail.com','argentina2025');
*/
/*ALTER TABLE alumno_materia ADD condicion VARCHAR(30);*/

/*eliminar columna*/
/*ALTER TABLE alumnos DROP COLUMN trayectoria_alumno;*/
/*


/*
CREATE TABLE alumno_materia ( 
id_alumno_examen INT AUTO_INCREMENT,
 id_alumno INT,
  id_materia INT,
   nota_examen DECIMAL(4,2),
	 condicion VARCHAR(20), 
	 CONSTRAINT pk_alumno_examen PRIMARY KEY (id_alumno_examen), 
	 FOREIGN KEY (id_alumno) REFERENCES alumnos(id_alumno),
	  FOREIGN KEY (id_materia) REFERENCES materias(id_materia) );
*/
/*
INSERT INTO alumno_materia
(id_alumno,id_materia,nota_examen,condicion)
VALUES
(1,1,8,'Promocionado'),
(1,2,6,'Regular'),
(2,1,3,'Libre');
*/