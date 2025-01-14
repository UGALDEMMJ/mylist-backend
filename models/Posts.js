import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    namePost:{
        type: String,
        required: true,
        trim: true
    }, 
    descriptionPost:{
        type: String,
        required: true,
        trim: true
    },
    imagePost: {
        type: String,
        required: true,
        trim: true
    },
    datePost: {
        type: Date,
        default: Date.now
    }, 
    nameUser:{
        type: String,
        required: true,
        trim: true
    },
    ratingPost:{
        type: Number,
        required: true,
        trim: true
    },
    categoryPost:{
        type: String,
        required: true,
        trim: true
    },
    subCategory: {
        type: String,
        required: true,
        trim: true
    }
},{
    timestamps: true
})

const Posts = mongoose.model('Posts', postSchema);
export default Posts;