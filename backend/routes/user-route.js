import express from 'express'
import { login, logout, register, updateProfile } from '../controller/userController.js'
import { isAuthenticated } from '../middleware/auth.js';
import multiUpload from '../middleware/multer.js';
 
const router = express.Router();

router.route('/register').post( multiUpload, register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/update/profile').post( isAuthenticated, multiUpload, updateProfile);

export default router