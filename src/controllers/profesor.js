import Model from '../models/model';

const teacherModel = new Model('Teacher');

export const teacherList = async (req, res) => {
  try {
    const data = await teacherModel.selectAll();
    res.status(200).json({ totalCount:data.rowCount ,messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};

export const getTeacher = async (req, res) => {
  console.log(req.params)
  const {teacher_id} = req.params;
  const conditions = `WHERE teacher_id = '${teacher_id}'`
  try {
    const data = await studentModel.selectAll(conditions);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};

export const addTeacher = async (req, res) => {
  console.log(req.body)
  const { name,lastName } = req.body;
  const columns = 'name, lastName';
  const values = `'${name}','${lastName}'`;
  try {
    const data = await teacherModel.insertWithReturn(columns, values);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};


export const updateTeacher = async (req, res) => {
  console.log(req.params)
  console.log(req.body)
  const teacher_id =  req.params;
  const {name,lastName} = req.body
  const columns = 'name, lastName';
  const values = `'${name}','${lastName}'`;
  const conditions = `teacher_id = '${teacher_id}'`
  try {
    const data = await studentModel.update(columns, values, conditions);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};

export const deleteTeacher = async (req, res) => {
  console.log( req.params)
  const { teacher_id} =  req.params;
  const conditions = `teacher_id = '${teacher_id}'`
  try {
    const data = await studentModel.delete(conditions);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};
