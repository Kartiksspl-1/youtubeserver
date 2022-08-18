const express=require('express');
const { comment,addcomment,getcomments } = require('../controllers/comment');
const { verifyToken } = require('../verifyToken');
const router=express.Router();


router.get('/getcomments/:videoid',getcomments)

router.post('/addcomment',verifyToken,addcomment)




module.exports=router;