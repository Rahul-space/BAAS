const express= require("express");
const app = express();
const mongoose = require("mongoose")
const authRoute = require("./routes/auth");
const webAuthRoute=require("./routes/webAuth");
const forgotPasswordRoute=require("./routes/forgotPassword");
const userRoute=require("./routes/users");



const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))
mongoose.set("strictQuery", false);
mongoose
  .connect("connection string", {
  })
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });



app.get("/",(req,res)=>{
    res.send("Welcome to Bass server by Rahul.R <br/><br/> Please dont use broken link . our service is fully free<br/>so you can signup and enjoy our service <br/> you can signup using below link <a href=facebook.com>hi</a>");
  })

app.use(express.json())
app.use("/api/auth", authRoute);
app.use("/api/webAuth",webAuthRoute);
app.use("/api/forgotPassword",forgotPasswordRoute);
app.use("/api/users",userRoute);

app.listen(8800, () => {
    console.log("Backend is live");
  });




