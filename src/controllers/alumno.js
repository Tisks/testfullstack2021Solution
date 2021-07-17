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
export const getStudent = async (req, res) => {
  console.log(req.params)
  const {student_id} = req.params;
  const conditions = `WHERE student_id = '${parseInt(student_id)}'`
  try {
    const data = await studentModel.selectAll(conditions);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};

export const addStudent = async (req, res) => {
  console.log(req.body)
  const { name,last_name } = req.body;
  const columns = 'name, last_name';
  const values = `'${name}','${last_name}'`;
  try {
    const data = await studentModel.insertWithReturn(columns, values);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};

export const updateStudent = async (req, res) => {
  console.log(req.params)
  console.log(req.body)
  const {student_id} =  req.params;
  const {name,last_name} = req.body
  const columns = 'name, last_name';
  const values = `'${name}','${last_name}'`;
  const conditions = `student_id = '${parseInt(student_id)}'`
  try {
    const data = await studentModel.update(columns, values, conditions);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};

export const deleteStudent = async (req, res) => {
  console.log( req.params)
  const { student_id} =  req.params;
  const conditions = `student_id = '${parseInt(student_id)}'`
  try {
    const data = await studentModel.delete(conditions);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};
