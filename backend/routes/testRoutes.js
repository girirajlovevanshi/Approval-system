import express from 'express';

const router = express.Router();

router.get('/',(req, res)=>{
    res.json({ message: 'Backend Connected successfully' })
})
export default router;