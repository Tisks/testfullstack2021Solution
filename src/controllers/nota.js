import Model from '../models/model';

const markModel = new Model('Mark');

export const listMark = async (req, res) => {
  try {
    const data = await markModel.selectAll();
    res.status(200).json({ totalCount:data.rowCount ,messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};
export const getMarkUniqueId = async (req, res) => {
  console.log(req.params)
  const {mark_id} = req.params;
  const conditions = `WHERE mark_id = '${parseInt(mark_id)}'`
  try {
    const data = await markModel.selectAll(conditions);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};
export const getMarkIds = async (req, res) => {
  console.log(req.params)
  const {test_id,student_course_id} = req.params;
  const conditions = `WHERE test_id = '${parseInt(test_id)}' AND student_course_id = '${parseInt(student_course_id)}'`
  try {
    const data = await markModel.selectAll(conditions);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};
export const addMark = async (req, res) => {
  console.log(req.body)
  const { student_course_id,test_id, mark } = req.body;
  const columns = 'student_course_id,test_id, mark';
  const values = `'${student_course_id}','${test_id}','${mark}'`;
  try {
    const data = await markModel.insertWithReturn(columns, values);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};

export const updateMark = async (req, res) => {
  console.log(req.params)
  console.log(req.body)
  const {mark_id} =  req.params;
  const {student_course_id,test_id,mark} = req.body
  const columns = 'student_course_id,test_id,mark';
  const values = `'${student_course_id}','${test_id}','${mark}'`;
  const conditions = `mark_id = '${parseInt(mark_id)}'`
  try {
    const data = await markModel.update(columns, values, conditions);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};

export const deleteMark = async (req, res) => {
  console.log( req.params)
  const { mark_id} =  req.params;
  const conditions = `mark_id = '${parseInt(mark_id)}'`
  try {
    const data = await markModel.delete(conditions);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};
