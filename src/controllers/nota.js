import Model from '../models/model';

const markModel = new Model('Mark');

export const listMark = async (req, res) => {
  try {
    const data = await markModel.selectAll();
    res.status(200).json({ totalCount:data.rowCount ,messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};
export const getMarkUniqueId = async (req, res) => {
  console.log(req.params)
  const {mark_id} = req.params;
  const conditions = `WHERE mark_id = '${parseInt(mark_id)}'`
  try {
    const data = await markModel.selectAll(conditions);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};
export const getMarkIds = async (req, res) => {
  console.log(req.params)
  const {test_id,student_course_id} = req.params;
  const conditions = `WHERE test_id = '${parseInt(test_id)}' AND student_course_id = '${parseInt(student_course_id)}'`
  try {
    const data = await markModel.selectAll(conditions);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};
export const addMark = async (req, res) => {
  console.log(req.body)
  const { student_course_id,test_id, mark } = req.body;
  const columns = 'student_course_id,test_id, mark';
  const values = `'${student_course_id}','${test_id}','${mark}'`;
  try {
    const data = await markModel.insertWithReturn(columns, values);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};

export const updateMark = async (req, res) => {
  console.log(req.params)
  console.log(req.body)
  const {mark_id} =  req.params;
  const {student_course_id,test_id,mark} = req.body
  const columns = ["student_course_id","test_id","mark"]
  const values = [student_course_id,test_id,mark]
  const conditions = `mark_id = '${parseInt(mark_id)}'`
  try {
    const data = await markModel.update(columns, values, conditions);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};

export const deleteMark = async (req, res) => {
  console.log( req.params)
  const { mark_id} =  req.params;
  const conditions = `mark_id = '${parseInt(mark_id)}'`
  try {
    const data = await markModel.delete(conditions);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};


// QUERIES COMPUESTAS 
var generalModel;
export const listGeneralMarkStudents = async (req, res) => {

  const columns = `promedio_cursos_alumnos.student_id, promedio_cursos_alumnos.nombre_alumno,
  promedio_cursos_alumnos.last_name, AVG(promedio_cursos_alumnos.promedio)`

  generalModel = new Model(`(SELECT st.student_id, st.name AS nombre_alumno, st.last_name, co.course_id, 
                            co.name AS nombre_curso, AVG(mk.mark) AS promedio
                            FROM MARK mk
                            INNER JOIN Student_Course sc ON sc.student_course_id = mk.student_course_id
                            INNER JOIN Course co ON sc.course_id = co.course_id
                            INNER JOIN Student st ON st.student_id = sc.student_id 
                            GROUP BY st.student_id, st.name, st.last_name, co.course_id, co.name) 
                            as promedio_cursos_alumnos `);

  const conditions = `GROUP BY promedio_cursos_alumnos.student_id,promedio_cursos_alumnos.nombre_alumno,promedio_cursos_alumnos.last_name;`
  try {
    const data = await generalModel.select(columns,conditions);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};
export const filterFailureMarkStudents = async (req, res) => {

  const columns = `student_courses.student_id, student_courses.name, student_courses.last_name`

  generalModel = new Model(`(SELECT sc.student_course_id, st.student_id, st.name, st.last_name, co.course_id, 
                            co.name AS nombre_curso
                            FROM Student_Course sc
                            INNER JOIN Course co ON sc.course_id = co.course_id
                            INNER JOIN Student st ON st.student_id = sc.student_id 
                            INNER JOIN mark mk ON mk.student_course_id = sc.student_course_id
                            GROUP BY sc.student_course_id,st.student_id, st.name, st.last_name,co.course_id, co.name
                            HAVING AVG(mk.mark) < 4.0) as student_courses `);

  const conditions = `GROUP BY student_courses.student_id, student_courses.name, student_courses.last_name
                       HAVING COUNT(student_courses.student_course_id) > 1;`
  try {
    const data = await generalModel.select(columns,conditions);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};
