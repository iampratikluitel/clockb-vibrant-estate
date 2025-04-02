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
  },
  admin: {
    dashboard: `${ROOTS.admin}`,

    about: `${ROOTS.admin}`,
    addTeamMember: `${ROOTS.admin}/about/addMember`,
    editTeamMember: `${ROOTS.admin}/about/editMember`,

    testimonial: `${ROOTS.admin}/testimonial`,
    addTestimonial: `${ROOTS.admin}/testimonial/addTestimonial`,
    editTestimonial:  `${ROOTS.admin}/testimonial/editTestimonial`,

    Project: `${ROOTS.admin}/project-description`,
    addProject: `${ROOTS.admin}/project-description/add`,
    editProject: `${ROOTS.admin}/project-description/edit`, 

    faqs: `${ROOTS.admin}/faqs`,
    addfaq: `${ROOTS.admin}/faqs/add`,
    editfaq: `${ROOTS.admin}/faqs/edit`,

    news: `${ROOTS.admin}/news`,
    addNews: `${ROOTS.admin}/news/addNews`,
    editNews: `${ROOTS.admin}/news/editNews`,

    configuration: `${ROOTS.admin}/configuration`,
    landingpage: `${ROOTS.admin}/configuration/landingpage`,
    footer: `${ROOTS.admin}/configuration/footer`,
    brochure: `${ROOTS.admin}/configuration/brochure`,
  },
};
