const jwt=require('jsonwebtoken');

const verifyToken=(req,res,next)=>{
    console.log(req.cookies.acces_token)
    const token =req.cookies.acces_token;
    if(!token) return res.json('not authenticated');

    jwt.verify(token,process.env.JWTSECRET,function(err,decoded){
       if(err)res.json('token not valid');
       
        console.log(decoded.id)
        req.id=decoded.id
        next()
    })
}

module.exports={verifyToken}

