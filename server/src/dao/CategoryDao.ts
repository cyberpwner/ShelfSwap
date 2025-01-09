import { Category } from '../entity/Category';
import { BaseDao } from './BaseDao';

export class CategoryDao implements BaseDao<Category> {
  async findAll(): Promise<Category[]> {
    return Category.find();
  }

  async findById(id: number): Promise<Category | null> {
    return Category.findOne({ where: { id } });
  }

  async create(category: Category): Promise<Category> {
    const foundCategory = await Category.findOneBy({ name: category.name });

    if (foundCategory != null) {
      throw new Error('category already exists');
    }

    return category.save();
  }

  async update(id: number, category: Partial<Category>): Promise<Category | null> {
    const existingCategory = await Category.findOneBy({ id });

    if (!existingCategory) return null;

    Object.assign(existingCategory, category);
    return existingCategory.save();
  }

  async delete(id: number): Promise<Category | null> {
    const existingCategory = await Category.findOneBy({ id });

    if (!existingCategory) return null;

    return Category.remove(existingCategory);
  }
}
