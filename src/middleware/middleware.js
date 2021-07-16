export const modifyTeacher = (req, res, next) => {
    console.log(req.body)

    req.body.teacher = `SAYS: ${req.body.teacher}`;
    next();
};