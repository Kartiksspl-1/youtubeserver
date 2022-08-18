const express=require('express');
const { signup, signin,googlesign } = require('../controllers/auth');
const router=express.Router();

//create a user
router.post('/signup',signup)

router.post('/signin',signin)
//sign in

//google

router.post('/google',googlesign)
module.exports=router;