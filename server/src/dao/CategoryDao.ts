import { Category } from '../entity/Category';
import { BaseDao } from './BaseDao';

export class CategoryDao implements BaseDao<Category> {
  async findAll(): Promise<Category[]> {
    return Category.find();
  }

  async findById(id: number): Promise<Category | null> {
    return Category.findOne({ where: { id } });
  }

  async create(category: Category): Promise<Category | null> {
    return category.save();
  }

  async update(id: number, category: Partial<Category>): Promise<Category | null> {
    const existingCategory = await Category.findOne({ where: { id } });

    if (!existingCategory) return null;

    Object.assign(existingCategory, category);
    return existingCategory.save();
  }

  async delete(id: number): Promise<boolean> {
    const existingCategory = await Category.findOneBy({ id });

    if (!existingCategory) return false;

    await Category.remove(existingCategory);
    return true;
  }
}
