import { LucideIcon } from "lucide-react";

export interface Member {
  _id?: string;
  name: string;
  role: string;
  description: string;
  image: string;
  icon?: LucideIcon;
}

export interface Partner {
  _id?: string;
  name: string;
  description: string;
  logo: string;
}

export interface TESTIMONIALS {
  _id: string;
  description: string;
  image: string;
  postedDate: string;
  name: string;
  role: string;
}

export interface Brochure {
  brochure?: string;
  name: string;
  description: string;
}
export interface FAQTYPE {
  _id: string;
  answer: string;
  question: string;
  addedDate: Date;
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

export interface NEWSINSIGHT {
  _id: string;
  title: string;
  image: string;
  description: string;
  author: string;
  bannerImage: string;
  slug: string;
  overview: string;
  categoryId?: string;
  category: string;
  addedDate: Date;
  status: boolean;
}

export interface NEWSINSIGHTCATEGORY {
  _id: string;
  name: string;
  slug: string;
  status?: boolean;
  newsCount?: number;
}

export interface PROJECTDESCRIPTION {
  slug: string;
  _id: string;
  title: string;
  description: string;
  categoryId: string;
  category: string;
  image: string;
  overview: string;
  addedDate: Date;
  status: boolean;
}

export interface CONDITIONSOFUSE {
  _id: string;
  description: string;
}

export interface PRIVACYPOLICY {
  _id: string;
  description: string;
}

export interface PROJECTCATEGORY {
  _id: string;
  name: string;
  slug: string;
  status?: boolean;
  projectCount?: number;
}

export interface PROJECTJOURNEY {
  card1title: string;
  card1description: string;
  card1Date: string;

  card2title: string;
  card2description: string;
  card2Date: string;

  card3title: string;
  card3description: string;
  card3Date: string;

  card4title: string;
  card4description: string;
  card4Date: string;

  card5title: string;
  card5description: string;
  card5Date: string;
}

export interface ApiResponse {
  message: string;
  data: string;
}
