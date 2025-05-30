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
  _id: string;
  brochure?: string;
  title: string;
}

export interface EmailItem {
  label: string;
  address: string;
}

export interface PhoneItem {
  label: string;
  number: string;
}

export interface SocialHandles {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  whatsapp?: string;
}

export interface FOOTER {
  _id?: string;
  logo?: string;
  about?: string;
  emails: EmailItem[];
  phones: PhoneItem[];
  address?: string;
  socialHandles: SocialHandles;
}

export interface NEWSLETTER {
  _id: string;
  email: string;
  subscribedDate: Date;
}

export interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

export interface APPOINTMENT {
  _id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  note: string;
}

export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: {
    name: string;
  };
  categoryId: string;
}

export interface FAQCATEGORY {
  _id: string;
  name: string;
  faqCount?: number;
}

export interface NEWSINSIGHT {
  _id: string;
  title: string;
  image: string;
  description: string;
  author: string;
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
  _id: string;
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
  card5EndDate: string;
}

export interface DEVELOPMENTPHASE {
  _id: string;
  card1title: string;
  card1description: string;
  card1Date: string;

  card2title: string;
  card2description: string;
  card2Date: string;

  card3title: string;
  card3description: string;
  card3Date: string;
}

export interface ApiResponse {
  message: string;
  data: string;
}
