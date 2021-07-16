import Model from '../models/model';

const studentCourse = new Model('Student_Course');

export const studentList = async (req, res) => {
  try {
    const data = await studentCourse.select('name, message');
    res.status(200).json({ totalCount:data.rowCount ,messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};
export const addStudent = async (req, res) => {
  console.log(req.body)
  const { name } = req.body;
  const columns = 'name';
  const values = `'${name}'`;
  try {
    const data = await studentCourse.insertWithReturn(columns, values);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};