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

export enum BookCondition {
  NEW = 'new',
  LIKE_NEW = 'like new',
  VERY_GOOD = 'very good',
  GOOD = 'good',
  ACCEPTABLE = 'acceptable',
}

export interface IBook {
  title: string;
  author: string;
  description?: string;
  price: number;
  isSold: boolean;
  condition: BookCondition;
  userId: number;
}
