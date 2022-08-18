const mongoose = require("mongoose");
const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// const auth = (req, res) => {
//   res.json("sfsf");
// };

const signup = async (req, res, next) => {
  try {
    // const newUser=new User()

    const saltRounds = 10;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    let encrryptedpassword;

    bcrypt.hash(password, saltRounds, function (err, hash) {
      console.log(hash);
      encrryptedpassword = hash;
      const newUser = new User({
        name: name,
        email: email,
        password: encrryptedpassword,
      });
      newUser.save((err) => {
        if (err) {
          console.log(err);
          return res.json('email already taken')
          
        } else {
          return res.json("sign up");
        }
      });
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const signin = async (req, res, next) => {
  try {
    // const newUser=new User()

    const email = req.body.email;
    const password = req.body.password;
    console.log(email);
    const user = await User.findOne({email:email})
    console.log(user)
      
    if(!user)return res.json('no user');


    console.log(user.password);
    console.log(password);

    bcrypt.compare(password, user.password).then(function (result) {
      if (result) {
        let token = jwt.sign({ id: user._id }, process.env.JWTSECRET);
        res.cookie("acces_token", token, {
            httpOnly: true,
          })
          .status(200);

        return res.json({user:user._doc,subs:user?.subscribers});
      } else {
        res.json("not match");
      }

      // result == true
    });

    // Load hash from your password DB.
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const googlesign=async(req,res,next)=>{
  let data=req.body.user.providerData[0];
  console.log(req.body.user.providerData[0]);
  const alreadyuser = await User.findOne({email:data.email}) 
if(!alreadyuser){
  
  const user=new User({
    name:data.displayName,
    email:data.email,
    img:data.photoURL,
    fromgoogle:true
   });
  const saveduser=await user.save();


  let token = jwt.sign({ id: saveduser._id }, process.env.JWTSECRET);
  res.cookie("acces_token", token, {
      httpOnly: true,
    })
    .status(200);

  return res.json({user:saveduser._doc,subs:saveduser?.subscribers});




}

else{
  

  let token = jwt.sign({ id: alreadyuser._id }, process.env.JWTSECRET);
  res.cookie("acces_token", token, {
      httpOnly: true,
    })
    .status(200);

  return res.json({user:alreadyuser._doc,subs:alreadyuser?.subscribers});

}


}


module.exports = { signup, signin,googlesign};
