import {check} from "express-validator";


export const createTaskValidator = [
    check('task').notEmpty().withMessage('Task is required'),
    check('completed').optional().isBoolean().withMessage('Completed must be a boolean'),
    check('date').optional().isDate().withMessage('Date must be a date'),
];

export const updateTaskValidator = [
    check('task').optional().notEmpty().withMessage('Task is required'),
    check('completed').optional().isBoolean().withMessage('Completed must be a boolean'),
    check('date').optional().isDate().withMessage('Date must be a date'),

];