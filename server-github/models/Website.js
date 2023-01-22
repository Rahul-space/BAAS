const mongoose = require("mongoose");

const WebsiteSchema = new mongoose.Schema(
  {
    websitename:{type:String,required:true},
    username: { type: String, required: true },
    email: { type: String, required: true,unique:true },
    password: { type: String, required: true },
    profilePic: { type: String, defaut: "" },
    contact: {type: Object,required: true},
    content:{type: Object,requird: true},
    verificationForUsers:{type: Boolean,default: false},
    apiAccessRecord:{type: Array,default: []},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Website", WebsiteSchema);