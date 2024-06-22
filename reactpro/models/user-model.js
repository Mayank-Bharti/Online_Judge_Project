const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    dob:{
        type:Date,
        require:true,
    },
    Oraganisation:{
        type:String,
        require:true,
    },
    Profilepic:{
        type:Image,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    created_at: { 
         type: Timestamp, 
         default: Date.now,
    },
    updated_at: { 
        type: Timestamp, 
        default: Date.now ,
    }


});
const User=new mongoose.model("User",userSchema);

module.exports=User;