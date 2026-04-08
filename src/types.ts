export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  author: string;
  image: string;
  excerpt: string;
}

export interface Book {
  title: string;
  author: string;
  cover: string;
}
