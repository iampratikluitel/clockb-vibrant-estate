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

    addPartner: `${ROOTS.admin}/about/addPartner`,
    editPartner: `${ROOTS.admin}/about/editPartner`,

    testimonial: `${ROOTS.admin}/testimonial`,
    addTestimonial: `${ROOTS.admin}/testimonial/add`,
    editTestimonial:  `${ROOTS.admin}/testimonial/edit`,

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
