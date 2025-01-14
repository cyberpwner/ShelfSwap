import { CategoryDao } from '../dao/CategoryDao';
import { Category } from '../entity/Category';

export class CategoryService {
  private readonly categoryDao: CategoryDao;

  constructor() {
    this.categoryDao = new CategoryDao();
  }

  async getAllCategories(): Promise<Category[]> {
    return this.categoryDao.findAll();
  }

  async getCategoryById(id: number): Promise<Category | null> {
    return this.categoryDao.findById(id);
  }

  async createCategory(category: Category): Promise<Category | null> {
    return this.categoryDao.create(category);
  }

  async updateCategory(id: number, category: Partial<Category>) {
    return this.categoryDao.update(id, category);
  }

  async deleteCategory(id: number): Promise<Category | null> {
    return this.categoryDao.delete(id);
  }
}
