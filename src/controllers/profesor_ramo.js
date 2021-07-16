import Model from '../models/model';

const teacherSubjectModel = new Model('Teacher_Subject');

export const teacherSubjectList = async (req, res) => {
  try {
    const data = await teacherSubjectModel.select('name, message');
    res.status(200).json({ totalCount:data.rowCount ,messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};
export const addTeacherSubject = async (req, res) => {
  console.log(req.body)
  const { name } = req.body;
  const columns = 'name';
  const values = `'${name}'`;
  try {
    const data = await teacherSubjectModel.insertWithReturn(columns, values);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};