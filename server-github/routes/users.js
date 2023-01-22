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
  


router.get("/:id/users", async (req, res) => {
    const webmodel=mongoose.model(req.params.id,WebsiteusersSchema);
    try{
        const result=await webmodel.find();
        res.status(200).json(result);
    }catch(err){
        res.status(500).json(err);
    }

});


//GET A USER
router.get("/:id/users/:id", async (req, res) => {
    const webmodel=mongoose.model(req.params.id,WebsiteusersSchema);
    try{
        const result=await webmodel.findById(req.params.id);
        res.status(200).json(result);
    }catch(err){
        res.status(500).json(err);
    }
});



// UPDATE USER
router.put("/:id/users/:id", async (req, res) => {
    const webmodel=mongoose.model(req.params.id,WebsiteusersSchema);
    try{
        const result=await webmodel.findByIdAndUpdate(req.params.id,{$set:req.body});
        res.status(200).json(result);
    }catch(err){
        res.status(500).json(err);
    }
}); 


// DELETE USER
router.delete("/:id/users/:id", async (req, res) => {
    const webmodel=mongoose.model(req.params.id,WebsiteusersSchema);
    try{
        const result=await webmodel.findByIdAndDelete(req.params.id);
        res.status(200).json(result);
    }catch(err){
        res.status(500).json(err);
    }
});





  module.exports = router;