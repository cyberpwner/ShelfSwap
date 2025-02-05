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

  getAll: RequestHandler = async (req, res) => {
    let pageNum = req.query?.page;

    if (!pageNum || String(pageNum).trim() === '') {
      pageNum = '1';
    }

    const decodedPageNum = Number(decodeURIComponent(String(pageNum)));

    try {
      const { data, page, total, totalPages } = await this.categoryService.getAll(decodedPageNum);

      res.status(HttpStatusCode.OK).json({ data, page, total, totalPages });
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch categories' });
    }
  };

  getById: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;
      const category = await this.categoryService.getById(id);

      if (category == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ error: 'Category not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(category);
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch category' });
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
        res.status(HttpStatusCode.NOT_FOUND).json({ error: 'Category not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(category);
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch category' });
    }
  };

  createCategory: RequestHandler = async (req, res) => {
    try {
      const category = new Category();
      Object.assign(category, req.body);

      const createdCategory = await this.categoryService.createCategory(category);

      if (createdCategory == null) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: 'Category could not be created' });
        return;
      }

      res.status(HttpStatusCode.OK).json(createdCategory);
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to create category' });
    }
  };

  updateCategory: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;
      const category = new Category();
      Object.assign(category, req.body);

      const updatedCategory = await this.categoryService.updateCategory(id, category);

      if (updatedCategory == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ error: 'Category not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(updatedCategory);
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to update category' });
    }
  };

  deleteCategory: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;

      const deletedCategory = await this.categoryService.deleteCategory(id);

      if (deletedCategory == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ error: 'Category not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(deletedCategory);
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to delete category' });
    }
  };
}
