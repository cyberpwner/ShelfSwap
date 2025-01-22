import express from 'express';
import { CategoryController } from '../controller/Category.controller';

const router = express.Router();
const categoryController = new CategoryController();

router.get('/', categoryController.getCategoryByName, categoryController.getAllCategories);

router.get('/:id', categoryController.getCategoryById);

router.post('/', categoryController.createCategory);

router.put('/:id', categoryController.updateCategory);

router.delete('/:id', categoryController.deleteCategory);

export default router;
