export interface Member {
  id: string;
  name: string;
  position: string;
  description: string;
  image: string;
}

export interface Partner {
  id: string;
  name: string;
  description: string;
  logo: string;
}

export interface Brochure {
  brochure?: string;
  name: string;
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

export interface LandingPage {
  name: string;
  description: string;
  backgroundImage: string;

  card1name: string;
  card1description: string;
  card2name: string;
  card2description: string;
  card3name: string;
  card3description: string;

  card4icon: string;
  card4name: string;
  card4description: string;
  card5icon: string;
  card5name: string;
  card5description: string;
  card6icon: string;
  card6name: string;
  card6description: string;

  card7icon: string;
  card7name: string;
  card7description: string;
  card8icon: string;
  card8name: string;
  card8description: string;
  card9icon: string;
  card9name: string;
  card9description: string;
  card10icon: string;
  card10name: string;
  card10description: string;

  card11icon: string;
  card11name: string;
  card11description: string;
  card12icon: string;
  card12name: string;
  card12description: string;
  card13icon: string;
  card13name: string;
  card13description: string;
}
