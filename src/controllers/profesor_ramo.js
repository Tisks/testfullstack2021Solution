import Model from '../models/model';

const teacherSubjectModel = new Model('Teacher_Subject');

export const listTeacherSubject = async (req, res) => {
  try {
    const data = await teacherSubjectModel.selectAll();
    res.status(200).json({ totalCount:data.rowCount ,messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};
export const getTeacherSubjectUniqueId = async (req, res) => {
  console.log(req.params)
  const {teacher_subject_id} = req.params;
  const conditions = `WHERE teacher_subject_id = '${teacher_subject_id}'`
  try {
    const data = await teacherSubjectModel.selectAll(conditions);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};
export const getTeacherSubjectIds = async (req, res) => {
  console.log(req.params)

  const { teacher_id,subject_id } = req.params;
  
  const columns = 'teacher_subject_id';
  const values = `'${teacher_subject_id}'`;

  const conditions = `WHERE teacher_id = '${teacher_id}' AND subject_id = '${subject_id}'`
  try {
    const data = await teacherSubjectModel.select(columns, values, conditions);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};

export const addTeacherSubject = async (req, res) => {
  console.log(req.body)
  const { teacher_id,subject_id } = req.body;
  const columns = 'teacher_id,subject_id';
  const values = `'${teacher_id}','${subject_id}'`;
  try {
    const data = await teacherSubjectModel.insertWithReturn(columns, values);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};



export const updateTeacherSubject = async (req, res) => {
  console.log(req.params)
  console.log(req.body)
  const { teacher_id,subject_id } = req.body;
  const {teacher_subject_id} =  req.params;
  const columns = 'teacher_id, subject_id';
  const values = `'${teacher_id}','${subject_id}'`;
  const conditions = `teacher_subject_id = '${teacher_subject_id}'`
  try {
    const data = await teacherSubjectModel.update(columns, values, conditions);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};

export const deleteTeacherSubject = async (req, res) => {
  console.log( req.params)
  const { teacher_subject_id} =  req.params;
  const conditions = `teacher_subject_id = '${teacher_subject_id}'`
  try {
    const data = await teacherSubjectModel.delete(conditions);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};