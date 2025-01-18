import { CategoryDao } from '../dao/CategoryDao';
import { CategoryDto } from '../dto/CategoryDto';
import { Category } from '../entity/Category';
import { BookCategory } from '../types/categoryTypes';
import { MapperService } from './MapperService';

export class CategoryService {
  private readonly categoryDao: CategoryDao;
  private readonly mapperService: MapperService;

  constructor() {
    this.categoryDao = new CategoryDao();
    this.mapperService = new MapperService();
  }

  async getAllCategories(): Promise<CategoryDto[]> {
    const categories = await this.categoryDao.findAll();

    if (categories.length === 0) return [];

    return categories.map((category) => this.mapperService.mapCategoryToDto(category));
  }

  async getCategoryById(id: number): Promise<CategoryDto | null> {
    const category = await this.categoryDao.findById(id);

    if (!category) return null;

    return this.mapperService.mapCategoryToDto(category);
  }

  async getCategoryByName(name: BookCategory): Promise<CategoryDto | null> {
    const category = await this.categoryDao.findByName(name);

    if (!category) return null;

    return this.mapperService.mapCategoryToDto(category);
  }

  async createCategory(category: Category): Promise<CategoryDto | null> {
    const createdCategory = await this.categoryDao.create(category);

    if (!createdCategory) return null;

    return this.mapperService.mapCategoryToDto(createdCategory);
  }

  async updateCategory(id: number, category: Partial<Category>): Promise<CategoryDto | null> {
    const updatedCategory = await this.categoryDao.update(id, category);

    if (!updatedCategory) return null;

    return this.mapperService.mapCategoryToDto(updatedCategory);
  }

  async deleteCategory(id: number): Promise<CategoryDto | null> {
    const deletedCategory = await this.categoryDao.delete(id);

    if (!deletedCategory) return null;

    return this.mapperService.mapCategoryToDto(deletedCategory);
  }
}
