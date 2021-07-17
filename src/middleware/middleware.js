import Model from '../models/model';

var model 

export const modifyTeacher = (req, res, next) => {
    console.log(req.body)

    req.body.teacher = `SAYS: ${req.body.teacher}`;
    next();

};

export const checkSubscribedSubject = async (req, res, next) => {
    console.log(req.body)
    model = new Model('Course co');

    const {student_id,course_id} = req.body;
    let columns = 'sb.subject_id';
    let condition = ' INNER JOIN Teacher_Subject ts ON co.teacher_subject_id = ts.teacher_subject_id INNER JOIN Subject sb ON sb.subject_id = ts.subject_id'
    condition += ` WHERE co.course_id = '${parseInt(course_id)}'`


    try {
      let data = await model.select(columns,condition);
      console.log('25:')
      console.log(data)
      console.log(data.rows)
      let subject_id = data.rows[0].subject_id

      model = new Model('Student_Subject ss');


      condition = ` WHERE ss.student_id = '${parseInt(student_id)}' AND ss.subject_id = '${parseInt(subject_id)}'`

      try {
        data = await model.selectAll(condition);
        console.log('38:')
        console.log(data)
        if(data.rows.length === 0 ){
            req.body.subject_id = subject_id
            next()
        }
        else{
          res.status(200).json({ messages: `El alumno de identificador '${student_id}' ya esta en un curso del ramo de identificador '${subject_id}'`});
        }
      } catch (err) {
        res.status(200).json({ messages: err.stack });

      }
     
    } catch (err) {
      res.status(200).json({ messages: err.stack });
    }
};
