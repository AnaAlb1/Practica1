import express from 'express';
const router = express.Router();

router.get('/',(req, res, next) =>{
  res.send('Welcome Babel-Nodemon');
});

export default router;
