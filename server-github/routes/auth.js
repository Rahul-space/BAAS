const router = require("express").Router();
const web=require("../models/Website")
// const passwordResetSchema = require("../models/PasswordReset");
// const nodeMailer = require('nodemailer');

const mongoose=require("mongoose");
const jwt = require("jsonwebtoken");






    //Default model
  
const WebsiteusersSchema=new mongoose.Schema({
      username : {type:String,required:true},
      password : {type:String,required:true},
      email : {type:String,required:true,unique:true},
      content: {type:Object,required:true},
      isVerified: {type:Object,default:1},
      lastlogin: {type:Date,required:true},
  },{timestamps:true}
);
  






//New user Registration for a new web application
router.post("/:id/register", async (req, res) => {
  // const website=await web.findById(req.params.id);
  // const ver=!website.verificationForUsers;
  const user = mongoose.model(req.params.id,WebsiteusersSchema);
  const newuser=new user({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    content: req.body.content,
    // isVerified: ver,
    lastlogin: Date.now(),
  });

  try{

    const pre = await user.findOne({email:req.body.email});
    if(!pre){
      const result=await newuser.save();
      await web.findByIdAndUpdate(req.params.id,{
        $push:{"apiAccessRecord":{function:"register",user:result.email,time:newuser.lastlogin,status:"success"}}
      },{new:true});
      res.status(201).json(result);
    }else{
      await web.findByIdAndUpdate(req.params.id,{
        $push:{"apiAccessRecord":{function:"register",user:req.body.email,time:newuser.lastlogin,status:"failed"}}
      },{new:true});
      res.status(403).json("User with this mail already found");
    }
  }
  catch(err){
    res.status(500).json(err.message);
  }

});




// Login 

router.post("/:id/login", async (req, res) => {
  try {
    const User=mongoose.model(req.params.id,WebsiteusersSchema);
    const user = await User.findOne({ email: req.body.email });
    if(!user){res.status(401).json("record not Found on this Email")}
    else{
     if(user.password !== req.body.password){
      res.status(401).json("Wrong password try again...");
     }
      else{
        const accessToken = jwt.sign(
          { id: user._id},
          'rahul',
          { expiresIn: "5d" }
          );
          
        const finalUser=  await User.findByIdAndUpdate(user._id,
          {
            $set:{"lastlogin":Date.now()},
          },
          {new: true});
          await web.findByIdAndUpdate(req.params.id,{
            $push:{"apiAccessRecord":{function:"login",user:req.body.email,time:finalUser.lastlogin,status:"success"}}
          },{new:true});
        const { password,updatedAt,isVerified, ...info } = finalUser._doc;
        res.status(200).json({ ...info, accessToken });
      }
      
      }
  } catch (err) {
    res.status(500).json(err.message);
  }
});









// Update user details
router.put("/:id/update", async (req, res) => {
  try {
    const User=mongoose.model(req.params.id,WebsiteusersSchema);
    const user = await User.findByIdAndUpdate(req.body.id,{
      $set:req.body
    },{new:true});
    const date=Date.now();
    await web.findByIdAndUpdate(req.params.id,{
      $push:{"apiAccessRecord":{function:"update",user:user.email,time:date,status:"success"}}
    },{new:true});
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
});



// Delete user
router.delete("/:id/delete", async (req, res) => {
  try {
    const User=mongoose.model(req.params.id,WebsiteusersSchema);
    const user=await User.findByIdAndDelete(req.body.id);
    const date=Date.now();
    await web.findByIdAndUpdate(req.params.id,{
      $push:{"apiAccessRecord":{function:"delete",user:user.email,time:date,status:"success"}}
    },{new:true});
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err.message);
  }
});





  module.exports = router;
