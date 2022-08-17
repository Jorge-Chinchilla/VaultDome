const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
        userID:{
            type:String, required:true
        },
        Date:{
            type:Date, default:Date.now,
        },
        Type:{
            type:String, require: true,
        },
        action:{
            type:String, require: true,
        },
    },
    {timestamps:true}
);

module.exports = mongoose.model("Log", LogSchema);