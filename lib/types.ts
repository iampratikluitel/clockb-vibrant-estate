export interface Member {
  name: string;
  position: string;
  description: string;
  image: string;
}

export interface Brochure {
  id: string;
  description: string;
}
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

export interface FOOTER {
  _id: string;
  logo: string;
  email: string;
  about: string;
  address: string;
  phone: string;
  socialHandles: {
    facebook: string;
    linkedin: string;
    instagram: string;
    twitter: string;
    whatsapp: string;
    youtube: string;
  };
  workingHours: string;
}

export interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}