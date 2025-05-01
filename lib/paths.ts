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
    ongoingprojects: "/ongoingproject",
    investorelations: "/investorelations",
    projectdescription: "/projectdescription",
    newsInsight: "/newsInsights",
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

    faqs: `${ROOTS.admin}/faqs`,
    addfaq: `${ROOTS.admin}/faqs/add`,
    editfaq: `${ROOTS.admin}/faqs/edit`,

    newsinsight: `${ROOTS.admin}/newsinsight`,
    addNews: `${ROOTS.admin}/newsinsight/add`,
    editNews: `${ROOTS.admin}/newsinsight/edit`,

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
