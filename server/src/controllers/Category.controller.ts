import { RequestHandler } from 'express';
import { CategoryService } from '../services/Category.service';
import { Category } from '../entities/Category';
import { BookCategory } from '../types/category.types.d';
import { HttpStatusCode } from '../types/http.types.d';

export class CategoryController {
  private readonly categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
  }

  getAll: RequestHandler = async (_req, res) => {
    try {
      const categories = await this.categoryService.getAll();

      res.status(HttpStatusCode.OK).json(categories);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to fetch categories', error: error instanceof Error ? error.message : error });
    }
  };

  getById: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;
      const category = await this.categoryService.getById(id);

      if (category == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Category not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(category);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to fetch category', error: error instanceof Error ? error.message : error });
    }
  };

  getByName: RequestHandler = async (req, res, next) => {
    try {
      const name: BookCategory = req.query?.name as BookCategory;

      // if no name is passed in the query go to the next handler (getAll)
      if (!name || name.trim() === '') {
        next();
        return;
      }

      const category = await this.categoryService.getByName(name);

      if (category == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Category not found' });
        next('route');
        return;
      }

      res.status(HttpStatusCode.OK).json(category);

      // if a category is provided and is found skip the next handler (getAll)
      next('route');
      return;
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to fetch category', error: error instanceof Error ? error.message : error });
    }
  };

  createCategory: RequestHandler = async (req, res) => {
    try {
      const category = new Category();
      Object.assign(category, req.body);

      const createdCategory = await this.categoryService.createCategory(category);

      if (createdCategory == null) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Category could not be created' });
        return;
      }

      res.status(HttpStatusCode.OK).json(createdCategory);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to create category', error: error instanceof Error ? error.message : error });
    }
  };

  updateCategory: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;
      const category = new Category();
      Object.assign(category, req.body);

      const updatedCategory = await this.categoryService.updateCategory(id, category);

      if (updatedCategory == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Category not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(updatedCategory);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to update category', error: error instanceof Error ? error.message : error });
    }
  };

  deleteCategory: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;

      const deletedCategory = await this.categoryService.deleteCategory(id);

      if (deletedCategory == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Category not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(deletedCategory);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to delete category', error: error instanceof Error ? error.message : error });
    }
  };
}
