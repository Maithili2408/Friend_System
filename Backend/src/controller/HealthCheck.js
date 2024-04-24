import express from 'express';

const router = express.Router();

router.get('/ping', (req, res)=>{
    const para = req.query;
    console.log(para);
    res.send('pong')
})

export default router