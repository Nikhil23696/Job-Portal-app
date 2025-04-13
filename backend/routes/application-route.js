import express from 'express'
import { authorizeRole, isAuthenticated } from '../middleware/auth.js'
import { applyJob, getAllJobApplication, getAppliedJob, updateStatus } from '../controller/applicationController.js';

const router = express.Router();

router.route('/apply/:id').post(isAuthenticated,  applyJob);
router.route('/all').get(isAuthenticated, authorizeRole("recruiter"), getAllJobApplication);
router.route('/applied/job').get(isAuthenticated, getAppliedJob);
router.route('/update/:id').post(isAuthenticated, authorizeRole("recruiter"), updateStatus) 

export default router