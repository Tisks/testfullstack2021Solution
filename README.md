# testfullstack2021Solution
https://github.com/capitaria/testfullstack2021/edit/main/test-fullstack.md

Un colegio necesita un sistema para administrar sus cursos. El
sistema tiene que soportar que se ingresen varios cursos. Cada curso
tendrá un profesor a cargo y una serie de alumnos inscritos. Cada
profesor, así como cada alumno puede estar en más de un curso. Además
cada curso tendrá una cantidad no determinada de pruebas, y el sistema
debe permitir ingresar la nota para cada alumno en cada prueba. Todas las
pruebas valen lo mismo.

## Modelo de datos

Escriba a continuación las tablas que utilizaría para resolver este
problema con los campos y llaves de éstas. Intente hacer el sistema lo
más robusto posible, pero sin incluir datos adicionales a los que se
plantean acá.

![Screenshot](testfullstack_MER.png)

1. Student: Tabla que representa a los alumnos. Llave primaria entero unico de identificador. Campos: name (nombres), last_name (apellidos), ambos cadenas de caracteres.
2. Teacher: Tabla que representa a los profesores. Llave primaria entero unico de identificador. Campos: name (nombres), last_name (apellidos), ambos cadenas de caracteres.
3. Subject: Tabla que representa los ramos existentes, un ramo es la materia a enseñar (Ej: Matematica, Lenguaje, Fisica, Quimica, etc). Llave primaria entero unico de identificador. Campos: name (nombre).
4. Student_Teacher: Tabla que representa la asociacion entre alumnos y ramos. Llave primaria entero unico de identificador. Llave primaria compuesta student_id y subject_id por lo que no se puede asignar mas de una ves un estudiante a un ramo. Campos: Llaves foraneas student_id (identificador del alumno) y subject_id (identificador del ramo).
5. Teacher_Subject: Tabla que representa la asociacion entre profesores y ramos. Llave primaria compuesta teacher_id y subject_id por lo que no se puede asignar mas de una ves un profesor a un ramo en especifico. Campos: Llaves foraneas teacher_id (identificador del profesor) y subject_id (identificador del ramo) y un identificador entero unico para cada asociacion profesor-ramo (teacher_subject_id)
6. Course: Tabla que representa los cursos. Un curso en este contexto es una instancia de enseñanza de un ramo impartido por un profesor (Ej: profesor que enseña matematica imparte un curso llamado 'A-2'). Llave primaria entero unico de identificador (course_id). Campos: Llave foranea teacher_subject_id (identificador de la tabla intermedia Teacher_Subject) y subject_id (identificador del ramo) y un nombre. Debido a que no tiene una llave primaria compuesta un profesor que imparte un ramo puede enseñar en varios cursos.
7. Student_Course: Tabla que representa la asociacion entre alumnos y cursos. Llave primaria compuesta student_id y course_id por lo que no se puede asignar mas de una ves un alumno especifico a un curso en especifico para evitar duplicidades. Campos: Llaves foraneas student_id (identificador del alumno) y course_id (identificador del curso) y un identificador entero unico para cada asociacion alumno-curso (student_course_id)
8. Test: Tabla que representa a las pruebas. Llave primaria entero unico de identificador (test_id). Campos: Llave foranea course_id (identificador de la tabla Course), title (titulo de la prueba) y date (fecha en la que se da la prueba). Un curso puede tener una cantidad no determinada de pruebas pero una prueba pertenece solamente a un curso.
9. Mark: Tabla que representa a las notas. Llave primaria compuesta test_id y student_course_id por lo que no se puede poner mas de una nota a una misma prueba asociada a un alumno y curso especificos para evitar duplicidades. Campos: Llaves foraneas test_id (identificador de la prueba) y student_course_id (identificador de la asociacion alumno-curso), un identificador entero unico (mark_id) y la nota en si (mark) la cual esta entre un 1.0 y un 7.0. 

**Nota:** Cuando se asocia a un alumno a un curso, se crea la asociacion entre este alumno y el ramo asociado al curso. Un alumno no puede estar asociado a 2 cursos de un ramo al mismo tiempo.

## SQL

Considerando el enunciado anterior conteste las siguientes preguntas:

1. Escriba una Query que entregue la lista de alumnos para el curso
"programación"
```
SELECT  st.student_id, st.name, st.last_name 
FROM Student st
INNER JOIN Student_Course sc ON st.student_id = sc.student_id
INNER JOIN Course co ON sc.course_id = co.course_id AND co.name = 'programación';
```
2. Escriba una Query que calcule el promedio de notas de un alumno en un
curso.

Suponiendo que se tiene los ids del alumno (alumno_id) y del curso (curso_id)

```
SELECT AVG(mk.mark) as promedio
FROM MARK mk
INNER JOIN Student_Course sc ON sc.student_course_id = mk.student_course_id
INNER JOIN Course co ON sc.course_id = co.course_id AND co.course_id = {curso_id}
INNER JOIN Student st ON st.student_id = sc.student_id AND st.student_id = {alumno_id}
```

3. Escriba una Query que entregue a los alumnos y el promedio que tiene
en cada curso.

```
SELECT st.student_id, st.name AS nombre_alumno, st.last_name, co.course_id, co.name AS nombre_curso, AVG(mk.mark) AS promedio
FROM MARK mk
INNER JOIN Student_Course sc ON sc.student_course_id = mk.student_course_id
INNER JOIN Course co ON sc.course_id = co.course_id
INNER JOIN Student st ON st.student_id = sc.student_id 
GROUP BY st.student_id, st.name, st.last_name, co.course_id, co.name;
```

4. Escriba una Query que lista a todos los alumnos con más de un curso con
promedio rojo.

```
SELECT student_courses.student_id, student_courses.name, student_courses.last_name
FROM
(SELECT sc.student_course_id, st.student_id, st.name, st.last_name, co.course_id, co.name AS nombre_curso
FROM Student_Course sc
INNER JOIN Course co ON sc.course_id = co.course_id
INNER JOIN Student st ON st.student_id = sc.student_id 
INNER JOIN mark mk ON mk.student_course_id = sc.student_course_id
GROUP BY sc.student_course_id,st.student_id, st.name, st.last_name,co.course_id, co.name
HAVING AVG(mk.mark) < 4.0) as student_courses
GROUP BY student_courses.student_id, student_courses.name, student_courses.last_name
HAVING COUNT(student_courses.student_course_id) > 1
```

5. Dejando de lado el problema del cólegio se tiene una tabla con información de jugadores de tenis:
`PLAYERS(Nombre, Pais, Ranking)`. Suponga que Ranking es un número de 1 a
100 que es distinto para cada jugador. Si la tabla en un momento dado
tiene
solo 20 registros, indique cuantos registros tiene la tabla que resulta de la
siguiente consulta:

```
SELECT c1.Nombre, c2.Nombre
FROM PLAYERS c1, PLAYERS c2
WHERE c1.Ranking > c2.Ranking
```
Seleccione las respuestas correctas:

```
a) 400
b) 190
c) 20
d) imposible saberlo
```

Respuesta: b) Debido a que es equivalente a una combinatoria 20 sobre 2

## Diseño de software

### Backend

Si usted estuviera resolviendo el problema del colegio implementando una aplicación web que incluya las siguientes funcionalidades:

1. CRUD alumnos, cursos, pruebas y notas.
2. Listar a los alumnos junto a su promedio de notas.
3. Filtar a todos los alumnos con más de un ramo con promedio rojo.

Puedes usar el lenguaje de tu preferencia. 

**Nota:** La aplicación debe incluir un archivo README.md explicando como instalar las dependencias del proyecto y todos los supuestos considerados.

Stack usado: NodeJS y framework Express para RESTful API
Instalacion de dependencias, documentacion de la API y supuestos considerados en el archivo BACKEND.md


### Frontend

Construya una función o clase en JS que recibiendo el siguiente JSON por
parámetro, permita renderear una agenda semanal en html y con bloques de
30 minutos como la siguiente:

```
{
    "monday": [
        {"name": "Jorge", "start_time": "08:00", "end_time": "09:00"},
        {"name": "Jorge", "start_time": "09:30", "end_time": "11:00"},
        {"name": "Jorge", "start_time": "15:00", "end_time": "16:00"},
        {"name": "Jorge", "start_time": "17:00", "end_time": "19:30"}
    ],
    "tuesday": [
        {"name": "Jorge", "start_time": "08:00", "end_time": "09:00"},
        {"name": "Jorge", "start_time": "11:30", "end_time": "12:00"},
        {"name": "Jorge", "start_time": "15:00", "end_time": "16:00"},
        {"name": "Jorge", "start_time": "17:00", "end_time": "19:30"}
    ],
    "wednesday": [
        {"name": "Jorge", "start_time": "08:00", "end_time": "09:00"},
        {"name": "Jorge", "start_time": "10:30", "end_time": "12:00"},
        {"name": "Jorge", "start_time": "15:00", "end_time": "16:00"},
        {"name": "Jorge", "start_time": "17:00", "end_time": "19:30"}
    ],
    "thursday": [
        {"name": "Jorge", "start_time": "08:00", "end_time": "09:00"},
        {"name": "Jorge", "start_time": "09:30", "end_time": "12:00"},
        {"name": "Jorge", "start_time": "15:00", "end_time": "16:00"},
        {"name": "Jorge", "start_time": "17:00", "end_time": "19:30"}
    ],
    "friday": [
        {"name": "Jorge", "start_time": "08:00", "end_time": "09:00"},
        {"name": "Jorge", "start_time": "09:30", "end_time": "12:00"},
        {"name": "Jorge", "start_time": "15:00", "end_time": "16:00"},
        {"name": "Jorge", "start_time": "17:00", "end_time": "19:30"}
    ]
}
```

![Calendar](https://user-images.githubusercontent.com/1144473/124043631-66289b80-d9d9-11eb-9cf1-b9e1ebbcb103.png)


La agenda debe contener los distintos bloques y pintar con el nombre del
paciente, las horas que están tomadas.

**Nota:**

* La agenda NO debe tener interacción solo dibujarse en la pantalla
* No utilizar tablas, sólo DIVS
* La agenda debe tener un ancho de 960px y esta centrada en la pantalla
* Puntos extras usar CSS3 sin librerias externas

Se uso HTML, JS y solo CSS3
Supuestos y como generar la agenda en el archivo FRONTEND.md

# Consideraciones de la prueba

* Se valora el uso de Git.
* Se debe enviar repositorio con el proyecto.
* dudas y consultas a traves de Getonboard
