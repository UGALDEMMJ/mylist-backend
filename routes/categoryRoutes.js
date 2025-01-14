import express from 'express';
import { categoriesList} from '../controllers/categoriesControllers.js';
const router = express.Router();    

router.route('/').get(categoriesList);

export default router;