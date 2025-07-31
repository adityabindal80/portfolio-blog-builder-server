const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req,res,next)=>{
    const authHeader = req.headers.authorization ;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({msg:"No Token Provided"});
    }
    const token = authHeader.split(' ')[1];
    try{
  const decoded = jwt.verify(token,process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id).select('-password');
  next();
    }
    catch(error){
        return res.status(401).json({msg:"Invalid Token"});
    }
}

module.exports = authMiddleware;