import express from 'express';
import { createApplication, getApplicationById, reviewApplication } from '../controllers/applicationController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, authorize('initiator'), createApplication);

router.get('/:id', protect, getApplicationById);// for get application details

router.patch('/:id/review', protect, authorize('reviewer'), reviewApplication); // for review application , only reviewr can access


export default router;
