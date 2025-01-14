import { RequestHandler } from 'express';
import { CategoryService } from '../services/CategoryService';
import { Category } from '../entity/Category';

export class CategoryController {
  private readonly categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
  }

  getAllCategories: RequestHandler = async (req, res) => {
    try {
      const categories = await this.categoryService.getAllCategories();

      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch categories', error: error instanceof Error ? error.message : error });
    }
  };

  getCategoryById: RequestHandler = async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const category = await this.categoryService.getCategoryById(id);

      if (category == null) {
        res.status(404).json({ message: 'Category not found' });
        return;
      }

      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch category', error: error instanceof Error ? error.message : error });
    }
  };

  createCategory: RequestHandler = async (req, res) => {
    try {
      const category = new Category();
      Object.assign(category, req.body);

      const createdCategory = await this.categoryService.createCategory(category);

      if (createdCategory == null) {
        res.status(400).json({ message: 'Category could not be created' });
        return;
      }

      res.status(200).json(createdCategory);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create category', error: error instanceof Error ? error.message : error });
    }
  };

  updateCategory: RequestHandler = async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const category = new Category();
      Object.assign(category, req.body);

      const updatedCategory = await this.categoryService.updateCategory(id, category);

      if (updatedCategory == null) {
        res.status(404).json({ message: 'Category not found' });
        return;
      }

      res.status(200).json(updatedCategory);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update category', error: error instanceof Error ? error.message : error });
    }
  };

  deleteCategory: RequestHandler = async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);

      const deletedCategory = await this.categoryService.deleteCategory(id);

      if (deletedCategory == null) {
        res.status(404).json({ message: 'Category not found' });
        return;
      }

      res.status(200).json(deletedCategory);
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete category', error: error instanceof Error ? error.message : error });
    }
  };
}
