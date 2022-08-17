const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
        userID:{
            type:String
        },
        desc:{
            type:String, max:500
        },
        hash:{
            type:String, require: true,
        },
        baseDir:{
            type:String, require: true,
        }
    },
    {timestamps:true}
);

module.exports = mongoose.model("File", FileSchema);