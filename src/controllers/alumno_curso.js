import Model from '../models/model';

const studentCourse = new Model('Student_Course');

export const studentCourseList = async (req, res) => {
  try {
    const data = await studentCourse.selectAll();
    res.status(200).json({ totalCount:data.rowCount ,messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};
export const getStudentCourseUniqueId = async (req, res) => {
  console.log(req.params)
  const {student_course_id} = req.params;
  const conditions = `WHERE student_course_id = '${parseInt(student_course_id)}'`
  try {
    const data = await studentCourse.selectAll(conditions);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};
export const getStudentCourseIds = async (req, res) => {
  console.log(req.params)

  const { student_id,course_id } = req.params;
  
  const conditions = `WHERE student_id = '${parseInt(student_id)}' AND course_id = '${parseInt(course_id)}'`
  try {
    const data = await studentCourse.selectAll(conditions);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};

export const addStudentCourse = async (req, res) => {
  console.log(req.body)
  const { student_id,course_id } = req.body;
  const columns = 'student_id,course_id'
  const values = `'${student_id}','${course_id}'`;

  try {
    const data = await studentCourse.insertWithReturn(columns, values);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};


export const updateStudentCourse = async (req, res) => {
  console.log(req.params)
  console.log(req.body)
  const { student_id,course_id } = req.body;
  const {student_course_id} =  req.params;
  const columns = ['student_id', 'course_id'];
  const values = [student_id,course_id]
  const conditions = `student_course_id = '${parseInt(student_course_id)}'`
  try {
    const data = await studentCourse.update(columns, values, conditions);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};

export const deleteStudentCourse = async (req, res,next) => {
  console.log( req.params)
  const { student_course_id} =  req.params;
  const conditions = `student_course_id = '${parseInt(student_course_id)}'`
  try {
    const data = await studentCourse.delete(conditions);
    req.body.student_course_id = student_course_id
    next();
    //res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};

