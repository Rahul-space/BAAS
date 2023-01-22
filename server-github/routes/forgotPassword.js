const router=require('express').Router();
const nodemailer=require('nodemailer');
const mongoose=require('mongoose');
const User=require('../models/Website');
const jwt = require("jsonwebtoken");



const WebsiteusersSchema=new mongoose.Schema({
    username : {type:String,required:true},
    password : {type:String,required:true},
    email : {type:String,required:true,unique:true},
    content: {type:Object,required:true},
    isVerified: {type:Object,default:1},
    lastlogin: {type:Date,required:true},
},{timestamps:true}
);





// Forgot Password
router.post("/:id/sendmail", async (req, res) => {
    const { email } = req.body;
    const web=mongoose.model(req.params.id,WebsiteusersSchema);
    try {
      const website=await User.findById(req.params.id);
      const oldUser = await web.findOne({ email });
      if (!oldUser) {
        return res.json({ status: "User Not Exists!!" });
      }
      const secret = website._id+"secret";
      const token = jwt.sign({ email: oldUser.email, id: oldUser._id, websiteName:website.websitename }, secret, {
        expiresIn: "5m",
        
      });
      const link = `http://baas-password-reset/reset-password/${website._id}/${website.websitename}/${oldUser._id}/${token}`;
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "rr.corpration@gmail.com",
          pass: "21022003@rahul",
        },
      });
  
      var mailOptions = {
        from: "youremail@gmail.com",
        to: "rahulearth2003@gmail.com",
        subject: "Password Reset",
        text: `Hi ${oldUser.username}! \n\n Please click on the following link ${link} to reset your password. \n\n If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.status(500).json(link);
        } else {
          res.status(201).json( info.response);
        }
      });
    } catch (error) {
        res.status(500).json(error.message);
    }
  });
  

  //Reset Passwpord
  router.post("/:id/reset", async (req, res) => {
    const { password, token } = req.body;
    const web=mongoose.model(req.params.id,WebsiteusersSchema);
    try {
      // website=await User.findById(req.params.id);
      const secret = req.params.id+"secret";
      const payload = jwt.verify(token, secret);
      const oldUser = await web.findOne
      ({ email
        : payload.email });
        if (!oldUser) {
          return res.json({ status: "User Not Exists!!",code: 404 });
        }
        oldUser.password = password;
        
      await oldUser.save();
      res.status(201).json({ status: "Password Updated!!",code: 201 });
    } catch (error) {
      res.status(500).json({status: error.message,code: 500});
    }
  });








  //Forgot Password for Website Admin DashBoard

///////////////////////////////////////////////////////////////////////////////////////////starts///////////////////////////////////////////










// Forgot Password
router.post("/sendmail", async (req, res) => {
  const { email } = req.body;
  // const web=mongoose.model(req.params.id,WebsiteusersSchema);
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = oldUser._id+"secret";
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id}, secret, {
      expiresIn: "15m",
      
    });
    const link = `http://baas-password-reset.netlify.app/reset-password/${oldUser._id}/${token}`;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rr.corpration@gmail.com",
        pass: "ubordgwetizuaant",
      },
    });

    var mailOptions = {
      from: "no-reply@gmail.com",
      to: email,
      subject: "Password Reset",
      text: `Hi ${oldUser.username}! \n\n Please click on the following link ${link} to reset your password. \n\n If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.status(500).json(error.message);
      } else {
        res.status(201).json( info.response);
      }
    });
  } catch (error) {
      res.status(500).json(error.message);
  }
});


//Reset Passwpord
router.put("/:id/reset", async (req, res) => {
  const { password, token } = req.body;
  // const web=mongoose.model(req.params.id,WebsiteusersSchema);
  try {
    // website=await User.findById(req.params.id);
    const secret = req.params.id+"secret";
    const payload = jwt.verify(token, secret);
    const oldUser = await User.findOne
    ({ email
      : payload.email });
      if (!oldUser) {
        return res.json({ status: "User Not Exists!!",code: 404 });
      }
      oldUser.password = password;
      
    await oldUser.save();
    res.status(201).json({ status: "Password Updated!!",code: 201 });
  } catch (error) {
    res.status(500).json({status: error.message,code: 500});
  }
});





module.exports=router;
