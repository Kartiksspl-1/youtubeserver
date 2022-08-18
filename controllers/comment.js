const CommentSchema = require("../models/CommentSchema");
const UserSchema = require("../models/UserSchema");
const VideoSchema = require("../models/VideoSchema");

const comment = (req, res) => {
  res.json("sfsf");
};

const addcomment = async (req, res, next) => {
  const user = await UserSchema.find({ _id: req.id });
  const comment = new CommentSchema({
    userId: req.id,
    ...req.body,
  });
  try {
    const savedcomment = await comment.save();
    console.log('comment saved')
    res.json(savedcomment);
  } catch (err) {
    next(err);
  }
};

const getcomments = async (req, res, next) => {
  const videoId=req.params.videoid
    
  try {
    const comments=await CommentSchema.find({videoId:videoId})
    res.json(comments);

  } catch (err) {
    next(err);
  }
};

// const deletecomment = async (req, res, next) => {
//   const commentId = req.params.id;

//   try {
//     const comment = await CommentSchema.findById(commentId);
//     const video=await VideoSchema.find
//     if (req.id === comment.userId || req.id ===) {
//       await CommentSchema.findByIdAndDelete(commentId);

//       return res.json("comment deleted");
//     } else {
//       return res.json("comment not belong to you");
//     }
//   } catch (err) {
//     next(err);
//   }
// };

module.exports = { comment, addcomment,getcomments };
