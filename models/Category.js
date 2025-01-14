import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    nameCategory: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    postRef: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Posts'
        }
    ]
})

const Category = mongoose.model('Category', categorySchema);

export default Category;