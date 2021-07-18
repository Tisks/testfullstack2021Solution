import Model from '../models/model';

const testModel = new Model('Test');

export const listTest = async (req, res) => {
  try {
    const data = await testModel.selectAll();
    res.status(200).json({ totalCount:data.rowCount ,messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};
export const getTest = async (req, res) => {
  console.log(req.params)
  const {test_id} = req.params;
  const conditions = `WHERE test_id = '${parseInt(test_id)}'`
  try {
    const data = await testModel.selectAll(conditions);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};

export const addTest = async (req, res) => {
  console.log(req.body)
  const { course_id,title,date } = req.body;
  const columns = 'course_id,title,date';
  const values = `'${course_id}','${title}','${date}'`;
  try {
    const data = await testModel.insertWithReturn(columns, values);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};


export const updateTest = async (req, res) => {
  console.log(req.params)
  console.log(req.body)
  const {test_id} =  req.params;
  const {course_id,title,date} = req.body
  const columns = ['course_id','title','date'];
  const values = [course_id,title,date];
  const conditions = `test_id = '${parseInt(test_id)}'`
  try {
    const data = await testModel.update(columns, values, conditions);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};

export const deleteTest = async (req, res) => {
  console.log( req.params)
  const { test_id} =  req.params;
  const conditions = `test_id = '${parseInt(test_id)}'`
  try {
    const data = await testModel.delete(conditions);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};
