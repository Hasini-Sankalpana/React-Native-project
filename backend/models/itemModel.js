import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    tagline:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    imdb:{
       type:String,
       required:true
    },
    imgURL:{
    type:String
    }

},{timestamps:true})

const Item = mongoose.model("Item",itemSchema)

export default Item;