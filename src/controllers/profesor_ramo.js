import Model from '../models/model';

const teacherSubjectModel = new Model('Teacher_Subject');

export const teacherSubjectList = async (req, res) => {
  try {
    const data = await teacherSubjectModel.selectAll();
    res.status(200).json({ totalCount:data.rowCount ,messages: data.rows });
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