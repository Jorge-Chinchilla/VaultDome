const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
   username:{
       type:String, require: true, min:3, max:20, unique:true,
   },
    email:{
       type:String, require: true, max:50, unique:true,
    },
    password:{
        type:String, require: true, min:6,
    },
    subscription:{
       type:Date, default:Date.now,
    },
    followers:{
       type:Array, default:[],
    },
    following:{
       type: Array, default:[],
    },
    sharedFiles:{
       type: Array, default:[]
    },
    isAdmin:{
       type: Boolean, default: false,
    },
    desc:{
       type: String, max:50
    },
    city:{
       type:String, max: 50
    }
},
{timestamps:true}
);

module.exports = mongoose.model("User", UserSchema);