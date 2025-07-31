const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req,res)=>{
  const {username,email,password} = req.body;
  try{
   const exists = await User.findOne({email});
   if(exists){
    return res.status(400).json({msg : "Email already registered"});
   }
    const hashed = await  bcrypt.hash(password,10);
    const newUser = new User({username , email , password : hashed});
    await newUser.save();
    res.status(201).json({msg :"User registered successfully"});
   
  }
  catch(error){
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
}

exports.loginUser = async (req,res)=>{
    const { email , password} = req.body;
    try{
   const user = await User.findOne({email});
   if(!user){
    return res.status(400).json({msg:"Invalid email or password"});
   }
   const ismatched = await bcrypt.compare(password,user.password);
   if(!ismatched){
    return res.status(400).json({msg:"Invalid email or Password"});
   }
   const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  res.json({ username: user.username ,token});
    }catch(error){
        res.status(500).json({ msg: "Server error" });
    }
}