const express = require("express");
const User = require("./models/UserSchema");
require("dotenv").config();
const userRoute = require("./Routes/users");
const videoRoute = require("./Routes/videos");
const commentRoute = require("./Routes/comments");
const authRoute = require("./Routes/auths");
const mongoose = require("mongoose");
const cookieParser=require('cookie-parser');
const cors=require('cors')

const app = express();

var corsOptions = {
  origin: 'http://localhost:3000',
  credentials:true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

const uri =process.env.URI

function connectdb() {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("connected");
    })
    .catch((err) => {
      console.log(err);
    });
}
app.use(express.json())
app.use(cookieParser())
app.use("/api/user", userRoute);
app.use('/api/comment',commentRoute);
app.use('/api/video',videoRoute);
app.use('/api/auth',authRoute);

app.use((err,req,res,next)=>{
  const status=err.status || 500;
  const message=err.message || 'default error';
  res.status(status).json({
    success:false,
    message,
    status
  })

})
app.listen(8001, () => {
  console.log("listening on port 8001");

  connectdb();
});
