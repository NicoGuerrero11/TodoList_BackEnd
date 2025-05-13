import { Router } from 'express';
import {registerUser} from '../controllers/user.controller.js';
const rUser = Router();

rUser.post('/register', registerUser);




export default rUser;