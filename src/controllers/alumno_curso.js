import Model from '../models/model';

const studentCourse = new Model('Student_Course');

export const studentCourseList = async (req, res) => {
  try {
    const data = await studentCourse.selectAll();
    res.status(200).json({ totalCount:data.rowCount ,messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};
export const addStudentCourse = async (req, res) => {
  console.log(req.body)
  const { name } = req.body;
  const { student_id,subject_id } = req.body;
  const columns = 'student_id,subject_id';
  const values = `'${student_id}','${subject_id}'`;
  try {
    const data = await studentCourse.insertWithReturn(columns, values);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};