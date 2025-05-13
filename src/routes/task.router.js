import {Router} from 'express';
import {getTasks, addTask, getTask, updateTask, deleteTask} from "../controllers/task.controller.js";
import {param} from "express-validator";
import {createTaskValidator, updateTaskValidator} from "../validators/task.validators.js";
import {validates} from "../middlewares/validate.js";

const router = Router();

router.get('/tasks', getTasks);

router.get('/tasks/:id',
    [param('id').isMongoId().withMessage('Invalid id'),
        validates,
        getTask
    ]);

router.post('/tasks',[...createTaskValidator,validates ,addTask]);

router.patch('/tasks/:id',
    [param('id').isMongoId().withMessage('Invalid id'),
        ...updateTaskValidator,
        validates,
        updateTask
    ]);


router.delete('/tasks/:id',
    [param('id').isMongoId().withMessage('Invalid id'),
        validates,
        deleteTask
    ]);




export default router;