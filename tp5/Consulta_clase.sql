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


