import Model from '../models/model';

const subjectModel = new Model('Subject');

export const listSubject = async (req, res) => {
  try {
    const data = await subjectModel.selectAll();
    res.status(200).json({ totalCount:data.rowCount ,messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};

export const getSubject = async (req, res) => {
  console.log(req.params)
  const {subject_id} = req.params;
  const conditions = `WHERE subject_id = '${subject_id}'`
  try {
    const data = await subjectModel.selectAll(conditions);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};
export const addSubject = async (req, res) => {
  console.log('Agregando ramo')
  console.log(req.body)
  const { name } = req.body;
  const columns = 'name';
  const values = `'${name}'`;
  try {
    const data = await subjectModel.insertWithReturn(columns, values);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};


export const updateSubject = async (req, res) => {
  console.log(req.params)
  console.log(req.body)
  const subject_id =  req.params;
  const {name} = req.body
  const columns = 'name';
  const values = `'${name}'`;
  const conditions = `subject_id = '${subject_id}'`
  try {
    const data = await subjectModel.update(columns, values, conditions);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};

export const deleteSubject = async (req, res) => {
  console.log( req.params)
  const { subject_id} =  req.params;
  const conditions = `subject_id = '${subject_id}'`
  try {
    const data = await subjectModel.delete(conditions);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};
