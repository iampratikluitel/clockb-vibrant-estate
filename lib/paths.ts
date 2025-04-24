const ROOTS = {
  admin: "/admin",
  public: "/",
};

export const paths = {
  auth: {
    signin: "/",
    register: "/register",
    error: "/auth/error",
  },
  public: {
    forgotpassword: "/forgotpassword",
    resetpassword: "/resetpassword",
    login: "/login",

    about: "/about",
    contact: "/contact",
    faqs: "/faqs",
    investorelations: "/investorelations",
    projectdescription: "/projectdescription",
    resources: "/resources",
  },
  admin: {
    dashboard: `${ROOTS.admin}`,

    about: `${ROOTS.admin}`,

    addTeamMember: `${ROOTS.admin}/about/addMember`,
    editTeamMember: `${ROOTS.admin}/about/editMember`,

    addPartner: `${ROOTS.admin}/about/addPartner`,
    editPartner: `${ROOTS.admin}/about/editPartner`,

    testimonial: `${ROOTS.admin}/testimonial`,
    addTestimonial: `${ROOTS.admin}/testimonial/add`,
    editTestimonial:  `${ROOTS.admin}/testimonial/edit`,

    blog: `${ROOTS.admin}/blog`,
    addblog: `${ROOTS.admin}/add`,
    editblog: `${ROOTS.admin}/edit`,

    faqs: `${ROOTS.admin}/faqs`,
    addfaq: `${ROOTS.admin}/faqs/add`,
    editfaq: `${ROOTS.admin}/faqs/edit`,

    news: `${ROOTS.admin}/news`,
    addNews: `${ROOTS.admin}/news/add`,
    editNews: `${ROOTS.admin}/news/edit`,

    configuration: `${ROOTS.admin}/configuration`,
    landingpage: `${ROOTS.admin}/configuration/landingpage`,
    footer: `${ROOTS.admin}/configuration/footer`,
    brochure: `${ROOTS.admin}/configuration/brochure`,

    investorelations: `${ROOTS.admin}/investorelations`,

    privacypolicy: `${ROOTS.admin}/privacypolicy`,

    projectdescription: `${ROOTS.admin}/projectdescription`,
    addproject: `${ROOTS.admin}/projectdescription/add`,
    editproject: `${ROOTS.admin}/projectdescription/edit`,

    termsandcondition: `${ROOTS.admin}/termsandcondition`,
  },
};
