export interface BaseDao<T> {
  findAll(page: number, pageSize: number): Promise<{ data: T[]; total: number }>;
  findById(id: string): Promise<T | null>;
  create(entity: T): Promise<T>;
  update(id: string, entity: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<T | null>;
}
