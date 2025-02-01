import { axiosInstance } from '@/constants/api.constants';

interface ICategory {
  id: string;
  name: string;
}

export async function fetchCategories(): Promise<ICategory[]> {
  const res = await axiosInstance.get('/categories');
  return res.data;
}
