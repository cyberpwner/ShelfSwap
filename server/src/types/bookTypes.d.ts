export enum BookCategory {
  FICTION = 'fiction',
  NON_FICTION = 'non-fiction',
  SCIENCE = 'science',
  HISTORY = 'history',
  POLITICS = 'politics',
  BIOGRAPHY = 'biography',
  FANTASY = 'fantasy',
  MYSTERY = 'mystery',
  ROMANCE = 'romance',
  THRILLER = 'thriller',
  SELFHELP = 'self-Help',
  BUSINESS = 'business',
  TECHNOLOGY = 'technology',
  ART = 'art',
  POETRY = 'poetry',
  CHILDREN = 'children',
}

export interface IBook {
  title: string;
  author: string;
  description?: string;
  price: number;
  userId: number;
}
