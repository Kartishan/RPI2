import e from "express";

export const validateTaskData = (req, res, next) => {
    const {title, status} = req.body;
    if (!title || typeof title !== 'string') {
        return res.status(400).json({message: "Invalid description"});
    }
    if (!status || typeof status !== 'string') {
        return res.status(400).json({message: "Invalid status"});
    }
    next();
};
export default validateTaskData;