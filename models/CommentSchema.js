const mongoose=require('mongoose')


const CommentSchema=mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    videoId:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    }
    

})
module.exports=mongoose.model('Comments',CommentSchema)