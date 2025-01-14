import express from 'express';
import { addPost, getPost, updatePost, deletePost} from '../controllers/postsControllers.js';
const router = express.Router();

router.route('/').post(addPost).get(getPost);
router.route('/:id').put(updatePost).delete(deletePost);

export default router;