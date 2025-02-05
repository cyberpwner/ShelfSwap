import { CategoryDao } from '../dao/Category.dao';
import { CategoryDto } from '../dto/Category.dto';
import { PaginatedDto } from '../dto/Paginated.dto';
import { Category } from '../entities/Category';
import { BookCategory } from '../types/category.types.d';
import { MapperService } from './Mapper.service';

export class CategoryService {
  private readonly categoryDao: CategoryDao;
  private readonly mapperService: MapperService;

  constructor() {
    this.categoryDao = new CategoryDao();
    this.mapperService = new MapperService();
  }

  async getAll(page = 1, pageSize = 10): Promise<PaginatedDto<CategoryDto>> {
    const { data: categorys, total } = await this.categoryDao.findAll(page, pageSize);

    if (categorys.length === 0) {
      return {
        data: [],
        total: 0,
        page,
        totalPages: 0,
      };
    }

    let totalPages = undefined;

    if (total >= pageSize) {
      totalPages = Math.ceil(total / pageSize);
    } else {
      totalPages = 1;
    }

    return {
      data: categorys.map((category) => this.mapperService.mapCategoryToDto(category)),
      total,
      page,
      totalPages,
    };
  }

  async getById(id: string): Promise<CategoryDto | null> {
    const category = await this.categoryDao.findById(id);

    if (!category) return null;

    return this.mapperService.mapCategoryToDto(category);
  }

  async getByName(name: BookCategory): Promise<CategoryDto | null> {
    const category = await this.categoryDao.findByName(name);

    if (!category) return null;

    return this.mapperService.mapCategoryToDto(category);
  }

  async createCategory(category: Category): Promise<CategoryDto | null> {
    const createdCategory = await this.categoryDao.create(category);

    if (!createdCategory) return null;

    return this.mapperService.mapCategoryToDto(createdCategory);
  }

  async updateCategory(id: string, category: Partial<Category>): Promise<CategoryDto | null> {
    const updatedCategory = await this.categoryDao.update(id, category);

    if (!updatedCategory) return null;

    return this.mapperService.mapCategoryToDto(updatedCategory);
  }

  async deleteCategory(id: string): Promise<CategoryDto | null> {
    const deletedCategory = await this.categoryDao.delete(id);

    if (!deletedCategory) return null;

    return this.mapperService.mapCategoryToDto(deletedCategory);
  }
}
