const express=require('express');
const {update ,deleteuser,getuser,subscribe,unsubscribe,like,dislike} = require('../controllers/user');
const { verifyToken } = require('../verifyToken');
const router=express.Router();

router.put('/:id',verifyToken,update);

router.delete('/:id',verifyToken,deleteuser);

router.get('/find/:id',getuser)

router.put('/sub/:id',verifyToken,subscribe)

router.put('/unsub/:id',verifyToken,unsubscribe)

router.put('/like/:videoid',verifyToken,like)

router.put('/dislike/:videoid',verifyToken,dislike)





module.exports=router;