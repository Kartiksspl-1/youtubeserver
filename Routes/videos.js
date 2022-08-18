const express=require('express');
const {addvideo,deletevideo,updatevideo,getvideo,addview,trend,random,sub,search,getbytag} = require('../controllers/video');
const router=express.Router();

const {verifyToken}=require('../verifyToken');

router.post('/video',verifyToken,addvideo);

router.get('/video/:id',getvideo);

router.delete('/video/:id',verifyToken,deletevideo)

router.patch('/video/:id',verifyToken,updatevideo);

router.put('/video/view/:id',addview)


router.get('/trending',trend)


router.get('/random/',random)

router.get('/subscribed/',verifyToken,sub)


router.get('/tag/',getbytag)

router.get('/search/',search)












module.exports=router;