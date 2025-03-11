export interface FAQTYPE {
  answer: string;
  question: string;
  _id: string;
  addedDate: Date;
}

export interface BlogsCategoryType {
  _id?: string;
  name: string;
  slug?: string;
  status?: boolean;
  blogsCount?: number;
}

export interface BLOGS {
  _id: string;
  title: string;
  slug: string;
  author: string;
  tags: string[];
  description: string;
  image: string;
  categoryId: string;
  category?: string;
  postedDate: Date;
  status: boolean;
}
