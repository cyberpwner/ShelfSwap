import { Category } from '../entities/Category';
import { BookCategory } from '../types/category.types.d';
import { BaseDao } from './Base.dao';

type CategoryRelations = 'books';

export class CategoryDao implements BaseDao<Category> {
  async findAll(page = 1, pageSize = 10): Promise<{ data: Category[]; total: number }> {
    const skip = (page - 1) * pageSize;

    const [categories, total] = await Category.findAndCount({
      relations: ['books'] as CategoryRelations[],
      skip,
      take: pageSize,
    });

    return { data: categories, total };
  }

  async findById(id: string): Promise<Category | null> {
    return Category.findOne({ where: { id }, relations: ['books'] as CategoryRelations[] });
  }

  async findByName(name: BookCategory): Promise<Category | null> {
    return await Category.findOne({ where: { name }, relations: ['books'] as CategoryRelations[] });
  }

  async create(category: Category): Promise<Category> {
    const foundCategory = await Category.findOneBy({ name: category.name });

    if (foundCategory != null) {
      throw new Error('category already exists');
    }

    return category.save();
  }

  async update(id: string, category: Partial<Category>): Promise<Category | null> {
    const existingCategory = await Category.findOneBy({ id });

    if (!existingCategory) return null;

    Object.assign(existingCategory, category);
    return existingCategory.save();
  }

  async delete(id: string): Promise<Category | null> {
    const existingCategory = await Category.findOneBy({ id });

    if (!existingCategory) return null;

    return Category.remove(existingCategory);
  }
}
