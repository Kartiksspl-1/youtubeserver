const Video = require("../models/VideoSchema");
const User = require("../models/UserSchema");

const addvideo = async (req, res) => {
  const video = new Video({
    userId: req.id,
    ...req.body,
  });

  try {
    const savedVideo = await video.save();
    res.status(200).json({ savedVideo, success: "success" });
  } catch (err) {
    next(err);
  }
};

const updatevideo = async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (!video) {
    return res.josn("no video to update");
  } else if (req.id === video.id) {
    const updatedVideo = Video.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.json(updatedVideo);
  } else {
    return res.json("no right to update");
  }
};

const deletevideo = async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (!video) {
    return res.josn("no video to delete");
  } else if (req.id === video.id) {
    Video.findByIdAndDelete(req.params.id);
    return res.json("video deleted");
  } else {
    return res.json("no right to delete");
  }
};

const getvideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.json(video);
    
  } catch (err) {
    next(err);
  }
};

const addview = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.json("views increased by 1");
  } catch (err) {
    next(err);
  }
};

const random = async (req, res, next) => {
  try {
    const randvideos = await Video.aggregate([{ $sample: { size: 30 } }]);
    res.json(randvideos);
  } catch (err) {
    next(err);
  }
};

const trend = async (req, res, next) => {
  try {
    console.log('trending')
    const trendvideos = await Video.find().sort({
      views: -1,
    });
    res.json(trendvideos);
  } catch (err) {
    next(err);
  }
};

const sub = async (req, res, next) => {
  try {
    console.log("sf");
    const user = await User.findById(req.id);
    const subscribedchannels = user.subscribedusers;
    console.log(subscribedchannels);
    Promise.all(
      subscribedchannels.map(async (channelid) => {
        return await Video.find({ userId: channelid });
      })
    ).then((val) => {
      return res.json(val);
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getbytag = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  console.log(tags);
  try {
    const tagvideos = await Video.find({
      tags: { $in: tags },
    });
    res.json(tagvideos);
  } catch (err) {
    next(err);
  }
};

const search = async (req, res, next) => {
  const query = req.query.q;
  console.log(query);
  try {
    const searchedvideos = await Video.find({title:{$regex:query,$options:'i'} });
    res.json(searchedvideos);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addvideo,
  updatevideo,
  deletevideo,
  getvideo,
  addview,
  sub,
  trend,
  random,
  search,
  getbytag,
};
