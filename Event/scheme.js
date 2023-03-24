const mongoose=require("mongoose");

const eventscheme=new mongoose.Schema({
    title:String,
    description:String,
    location:String,
    startTime:String,
    endTime:String
})

const mainScheme=mongoose.model("final",eventscheme);
 module.exports=mainScheme;