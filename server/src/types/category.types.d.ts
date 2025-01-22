export interface ICategory {
  name: string;
}

export interface IBookCategory {
  bookId: number;
  categoryId: number;
}

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
