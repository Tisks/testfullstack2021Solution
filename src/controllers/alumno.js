import Model from '../models/model';

const studentModel = new Model('Student');

export const studentList = async (req, res) => {
  try {
    const data = await studentModel.selectAll();
    res.status(200).json({ totalCount:data.rowCount ,messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};
export const addStudent = async (req, res) => {
  console.log(req.body)
  const { name,lastName } = req.body;
  const columns = 'name, lastName';
  const values = `'${name}','${lastName}'`;
  try {
    const data = await studentModel.insertWithReturn(columns, values);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};