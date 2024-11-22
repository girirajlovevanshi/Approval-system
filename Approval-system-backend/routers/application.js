import express from 'express';
import { createApplication, getApplicationById } from '../controllers/applicationController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, authorize('initiator'), createApplication);

router.get('/:id', protect, getApplicationById);

export default router;
