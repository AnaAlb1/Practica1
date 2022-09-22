/*Modernizando a ES6 🎯️*/
import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/',(req, res, next) =>{
  res.render('index', { title: 'Express', author: 'Analleli Albarrán 🙋‍♀️️' });
});
export default router;