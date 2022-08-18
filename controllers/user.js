const UserSchema = require("../models/UserSchema");
const VideoSchema=require('../models/VideoSchema')
const update = async (req, res) => {
  if (req.params.id === req.id) {
    try {
      const user = await UserSchema.findById(req.id);
      console.log(user._doc);
      user.name = "updated";
      await user.save();
      res.json("updated");
    } catch (err) {
      res.json(err);
    }
  } else {
    res.json("error id not matched");
  }
};

const deleteuser = async (req, res) => {
  if (req.params.id === req.id) {
    try {
      await UserSchema.findByIdAndDelete(req.id);
      res.json("user deleted");
    } catch (err) {
      res.json("cant be deleted");
    }
  } else {
    res.json("cant delete other user");
  }
};

const getuser = async (req, res) => {
  try {
    const user = await UserSchema.findById(req.params.id);
    return res.json(user);
  } catch (err) {
    res.json("no user found");
  }
};

const subscribe = async (req, res) => {
  try {
    await UserSchema.updateOne(
      { _id: req.params.id },
      {
        $addToSet: { subscribedusers: req.id },
      }
    );

    res.json("subscribed");
    //   console.log(user.subscribers)
  } catch (err) {
    console.log(err);
    res.json("not able to subscribe");
  }
};

const unsubscribe = async (req, res) => {
  try {
    await UserSchema.updateOne(
      { _id: req.params.id },
      { $pull: { subscribedusers:req.id }}
    );
    res.json("unsubscribed");
  } catch (err) {
    console.log(err);
    res.json('unsubscribed');
  }
};

const like = async (req, res) => {
const videoid=req.params.videoid;
const userid=req.id;
try{
  await VideoSchema.findByIdAndUpdate(videoid,{
    $addToSet:{likes:userid},
    $pull:{dislikes:userid}
  })

return res.json('video has been liked')
}
catch(err){
  next(err)
}
};

const dislike = async (req, res) => {
  const videoid=req.params.videoid;
  const userid=req.id;
try{
await VideoSchema.findByIdAndUpdate(videoid,{
  $addToSet:{dislikes:userid},
  $pull:{likes:userid}
})

return res.json('video has been disliked')
}
catch(err){
  next(err)
}
};

module.exports = {
  update,
  deleteuser,
  getuser,
  subscribe,
  unsubscribe,
  like,
  dislike,
};
