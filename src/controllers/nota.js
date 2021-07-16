import Model from '../models/model';

const markModel = new Model('Mark');

export const markList = async (req, res) => {
  try {
    const data = await markModel.select('name, message');
    res.status(200).json({ totalCount:data.rowCount ,messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};
export const addMark = async (req, res) => {
  console.log(req.body)
  const { name } = req.body;
  const columns = 'name';
  const values = `'${name}'`;
  try {
    const data = await markModel.insertWithReturn(columns, values);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};