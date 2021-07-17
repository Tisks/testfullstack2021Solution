import Model from '../models/model';

const studentSubject = new Model('Student_Subject');

export const studentSubjectList = async (req, res) => {
  try {
    const data = await studentSubject.selectAll();
    res.status(200).json({ totalCount:data.rowCount ,messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};
export const getStudentSubjectUniqueId = async (req, res) => {
  console.log(req.params)
  const {student_subject_id} = req.params;
  const conditions = `WHERE student_subject_id = '${parseInt(student_subject_id)}'`
  try {
    const data = await studentSubject.selectAll(conditions);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};
export const getStudentSubjectIds = async (req, res) => {
  console.log(req.params)

  const { student_id,subject_id } = req.params;
  
  const conditions = `WHERE student_id = '${parseInt(student_id)}' AND subject_id = '${parseInt(subject_id)}'`
  try {
    const data = await studentSubject.selectAll(conditions);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};

export const addStudentSubject = async (req, res,next) => {
  console.log(req.body)
  const { student_id,subject_id } = req.body;
  const columns = 'student_id,subject_id';
  const values = `'${student_id}','${subject_id}'`;
  try {
    const data = await studentSubject.insertWithReturn(columns, values);
    next();
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};


export const updateStudentSubject = async (req, res) => {
  console.log(req.params)
  console.log(req.body)
  const { student_id,subject_id } = req.body;
  const {student_subject_id} =  req.params;
  const columns = 'student_id, subject_id';
  const values = `'${student_id}','${subject_id}'`;
  const conditions = `student_subject_id = '${parseInt(student_subject_id)}'`
  try {
    const data = await studentSubject.update(columns, values, conditions);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};

export const deleteStudentSubject = async (req, res) => {
  console.log( req.params)
  const { student_subject_id} =  req.params;
  const conditions = `student_subject_id = '${parseInt(student_subject_id)}'`
  try {
    const data = await studentSubject.delete(conditions);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};

