const router = require("express").Router();
const User = require("../models/Website");
const jwt = require("jsonwebtoken");

// import all controllers
// import SessionController from './app/controllers/SessionController';


//Registration for a new web application
router.post("/register", async (req, res) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password, 
      websitename:req.body.websitename,
      contact: req.body.contact,
      content: req.body.content,
      verificationForUsers:req.body.verificationForUsers
    });
    try {
      const pre=await User.findOne({email:req.body.email});
      if(!pre){
        const user = await newUser.save();
        res.status(201).json(user);
  
        //New collection for the new user 
  
            
  
      }else{
      pre&&res.status(403).json("User with this mail already found");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });




//Web app login  
router.post("/login", async (req, res) => {
    try {
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
    
        const { password, ...info } = user._doc;
    
        res.status(200).json({ ...info, accessToken });
        }
        
        }
    } catch (err) {
      res.status(500).json(err);
    }
  });




router.get("/confidential/users", async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
});
router.get("/confidential/users/:id", async (req, res) => {
  try {
    const users = await User.findById(req.params.id);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});



//UPDATE
router.put("/confidential/users/:id", async (req, res) => {
  try {
    const users = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("Account has been updated");
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete
router.delete("/confidential/users/:id", async (req, res) => {
  try {
    const users = await User.findByIdAndDelete(req.params.id);
    res.status(200).json("Account has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});


// routes.delete('/', SessionController.store);

module.exports = router;
