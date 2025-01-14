import { CategoryDao } from '../dao/CategoryDao';
import { CategoryDto } from '../dto/CategoryDto';
import { Category } from '../entity/Category';

export class CategoryService {
  private readonly categoryDao: CategoryDao;

  constructor() {
    this.categoryDao = new CategoryDao();
  }

  async getAllCategories(): Promise<CategoryDto[]> {
    const categories = await this.categoryDao.findAll();

    if (categories.length === 0) return [];

    return categories.map((category) => new CategoryDto(category));
  }

  async getCategoryById(id: number): Promise<CategoryDto | null> {
    const category = await this.categoryDao.findById(id);

    if (!category) return null;

    return new CategoryDto(category);
  }

  async createCategory(category: Category): Promise<CategoryDto | null> {
    const createdCategory = await this.categoryDao.create(category);

    if (!createdCategory) return null;

    return new CategoryDto(createdCategory);
  }

  async updateCategory(id: number, category: Partial<Category>): Promise<CategoryDto | null> {
    const updatedCategory = await this.categoryDao.update(id, category);

    if (!updatedCategory) return null;

    return new CategoryDto(updatedCategory);
  }

  async deleteCategory(id: number): Promise<CategoryDto | null> {
    const deletedCategory = await this.categoryDao.delete(id);

    if (!deletedCategory) return null;

    return new CategoryDto(deletedCategory);
  }
}
