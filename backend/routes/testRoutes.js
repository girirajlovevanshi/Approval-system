import express from 'express';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Test route for all authenticated users
router.get('/',protect,(req, res)=>{
    res.json({ message: `Welcome ${req.user.name}, Your role is ${req.user.role} `})
})

// Test route only for Approver
router.get('/approver', protect, authorize('approver'), (req, res) => {
    res.json({ message: 'Approver-only route' });
});

export default router;