import Category from '../models/Category.js'

const categoriesList = async (req, res) => {    
   const categories = await Category.find();    
   res.json(categories);
}


export {
    categoriesList
}