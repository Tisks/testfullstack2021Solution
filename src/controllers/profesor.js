import Model from '../models/model';

const teacherModel = new Model('Teacher');

export const listTeacher = async (req, res) => {
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
  const conditions = `WHERE teacher_id = '${parseInt(teacher_id)}'`
  try {
    const data = await teacherModel.selectAll(conditions);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};

export const addTeacher = async (req, res) => {
  console.log(req.body)
  const { name,last_name } = req.body;
  const columns = 'name, last_name';
  const values = `'${name}','${last_name}'`;
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
  const {teacher_id} =  req.params;
  const {name,last_name} = req.body
  const columns = ['name', 'last_name'];
  const values = [name,last_name];
  const conditions = `teacher_id = '${parseInt(teacher_id)}'`
  try {
    const data = await teacherModel.update(columns, values, conditions);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};

export const deleteTeacher = async (req, res) => {
  console.log( req.params)
  const { teacher_id} =  req.params;
  const conditions = `teacher_id = '${parseInt(teacher_id)}'`
  try {
    const data = await teacherModel.delete(conditions);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};
