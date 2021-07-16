import Model from '../models/model';

const courseModel = new Model('Course');

export const courseList = async (req, res) => {
  try {
    const data = await courseModel.selectAll();
    res.status(200).json({ totalCount:data.rowCount ,messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};
export const getCourse = async (req, res) => {
  console.log(req.params)
  const {course_id} = req.params;
  const conditions = `WHERE course_id = '${course_id}'`
  try {
    const data = await studentModel.selectAll(conditions);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};
export const addCourse = async (req, res) => {
  console.log(req.body)
  const { teacher_subject_id,name } = req.body;
  const columns = 'teacher_subject_id,name';
  const values = `'${teacher_subject_id}','${name}'`;
  try {
    const data = await courseModel.insertWithReturn(columns, values);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};



export const updateCourse = async (req, res) => {
  console.log(req.params)
  console.log(req.body)
  const { teacher_subject_id,name } = req.body;
  const {course_id} =  req.params;
  const columns = 'teacher_subject_id, name';
  const values = `'${teacher_subject_id}','${name}'`;
  const conditions = `course_id = '${course_id}'`
  try {
    const data = await studentModel.update(columns, values, conditions);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};

export const deleteCourse = async (req, res) => {
  console.log( req.params)
  const { course_id} =  req.params;
  const conditions = `course_id = '${course_id}'`
  try {
    const data = await studentModel.delete(conditions);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};
