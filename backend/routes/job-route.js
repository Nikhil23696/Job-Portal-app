import express from 'express' 
import { createJob, deleteJob, getAllJobs, getJobDetails, searchJob, updateJob } from '../controller/jobController.js';
import { authorizeRole, isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.route('/new').post(isAuthenticated, authorizeRole("recruiter"), createJob);
router.route('/all').get(isAuthenticated, getAllJobs);
router.route('/:id').get(isAuthenticated, getJobDetails);
router.route('/update/:id').post(isAuthenticated, authorizeRole("recruiter"), updateJob);
router.route('/delete/:id').delete(isAuthenticated, authorizeRole("recruiter"), deleteJob);
router.route('/search/job').get(isAuthenticated, searchJob);

export default router 