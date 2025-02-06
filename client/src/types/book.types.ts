export interface IBook {
  id: string;
  isbn: string;
  title: string;
  description: string;
  price: number;
  coverUrl: string;
  authors: IAuthor[];
}

interface IAuthor {
  id: string;
  name: string;
}
