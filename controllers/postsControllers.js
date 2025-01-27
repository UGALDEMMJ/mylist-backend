import Post from '../models/Posts.js'
import Category from '../models/Category.js'

const addPost = async (req, res) => {

    //Prevenir duplicados
    const { namePost, categoryPost, imagePost } = req.body;

    try {
        const postExist = await Post.findOne({ namePost, categoryPost });
        if (postExist) {
            const error = new Error('Post already exists');
            return res.status(400).json({ msg: error.message })
        }

        let imageUrl="";
        if(imagePost){
            const uploadResult = await cloudinary.uploader.upload(imagePost,{
                public_id: `posts/${namePost}`,
                folder: 'posts/'
            })
            imageUrl = uploadResult.secure_url;
        }


        const post = new Post({
            ...req.body,
            imagePost: imageUrl,
        });

        const savePost = await post.save();

        let category = await Category.findOne({ nameCategory: categoryPost });
        if (category) {
            category.postRef.push(post._id);
            await category.save();
        } else {
            category = new Category({ nameCategory: categoryPost, postRef: [post._id]});
            await category.save();
        }
        res.status(201).json({ msg: 'Post created successfully', savePost });
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'There was an error' })
    }
}

const updatePost = async (req, res)=>{

    const { id } = req.params;
    console.log(req.params.id)
    const post = await Post.findById(id);

    if(post){

        //Actualizar post
        post.namePost = req.body.namePost || post.namePost;
        post.descriptionPost = req.body.descriptionPost || post.descriptionPost;
        post.datePost = req.body.datePost || post.datePost;
        post.nameUser = req.body.nameUser || post.nameUser;
        post.ratingPost = req.body.ratingPost || post.ratingPost;
        post.categoryPost = req.body.categoryPost || post.categoryPost;
        post.subCategory = req.body.subCategory || post.subCategory;

        if(req.body.imagePost){
            const uploadResult = await cloudinary.uploader.upload(req.body.imagePost, {
                public_id: `posts/${req.body.namePost}`,
                folder: 'posts/'
            })
            post.imagePost = uploadResult.secure_url;
        }

       try {
         const postUpdated = await post.save();
        res.json(postUpdated);
       } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'There was an error updating' })
       }
    }else{
        res.status(404).json({msg: 'Post not found'});
    }
}

const getPost = async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
}

const deletePost = async (req, res) =>{
    const {id} = req.params;
    try {
        // Buscar el post por ID
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }
        
        const category = await Category.findOne({ postRef: id });

        if (category) {
            // Remover el ID del post del arreglo postRef
            category.postRef.pull(id);
            await category.save(); // Guardar los cambios en la categoría
        }
        await post.deleteOne();

        res.json({ msg: "Post removed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "There was an error deleting the post" });
    }
}

export {
    addPost,
    updatePost,
    getPost,
    deletePost
}