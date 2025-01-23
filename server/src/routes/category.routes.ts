import express from 'express';
import { CategoryController } from '../controllers/Category.controller';
import { CategoryValidation } from '../middleware/CategoryValidation.middleware';
import { CommonValidation } from '../middleware/CommonValidation.middleware';

const router = express.Router();
const categoryController = new CategoryController();
const categoryValidation = new CategoryValidation();

router.get('/', categoryController.getCategoryByName, categoryController.getAllCategories);

router.get('/:id', CommonValidation.validateId, categoryController.getCategoryById);

router.post('/', categoryValidation.validateCreateCategory, categoryController.createCategory);

router.put(
  '/:id',
  CommonValidation.validateId,
  categoryValidation.validateUpdateCategory,
  categoryController.updateCategory,
);

router.delete('/:id', CommonValidation.validateId, categoryController.deleteCategory);

export default router;
