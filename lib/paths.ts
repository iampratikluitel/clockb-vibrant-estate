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

    home: "/",
    about: "/about",
    contact: "/contact",
    faqs: "/faqs",
    ongoingprojects: "/ongoingproject",
    investorelations: "/investorelations",
    projectdescription: "/projectdescription",
    newsInsight: "/newsInsights",
    categorizedNews: "/newsInsights/category",
    resources: "/resources",
  },

  admin: {
    dashboard: `${ROOTS.admin}`,

    about: `${ROOTS.admin}/about`,

    addTeamMember: `${ROOTS.admin}/about/addMember`,
    editTeamMember: `${ROOTS.admin}/about/editMember`,

    addPartner: `${ROOTS.admin}/about/addPartner`,
    editPartner: `${ROOTS.admin}/about/editPartner`,

    testimonial: `${ROOTS.admin}/testimonial`,
    addTestimonial: `${ROOTS.admin}/testimonial/add`,
    editTestimonial: `${ROOTS.admin}/testimonial/edit`,

    faqs: `${ROOTS.admin}/faqs`,
    addfaq: `${ROOTS.admin}/faqs/add`,
    editfaq: `${ROOTS.admin}/faqs/edit`,

    newsinsight: `${ROOTS.admin}/newsinsight`,
    addNews: `${ROOTS.admin}/newsinsight/add`,
    editNews: `${ROOTS.admin}/newsinsight/edit`,

    configuration: `${ROOTS.admin}/configuration`,
    projectjourney: `${ROOTS.admin}/configuration/landingpage`,
    footer: `${ROOTS.admin}/configuration/footer`,
    brochure: `${ROOTS.admin}/configuration/brochure`,

    investorelations: `${ROOTS.admin}/investorelations`,

    privacypolicy: `${ROOTS.admin}/privacypolicy`,

    phases: `${ROOTS.admin}/phases`,
    appointment: `${ROOTS.admin}/appointment`,
    resources: `${ROOTS.admin}/resources`,

    project: `${ROOTS.admin}/projects`,
    addproject: `${ROOTS.admin}/projects/add`,
    editproject: `${ROOTS.admin}/projects/edit`,

    termsandcondition: `${ROOTS.admin}/termsandcondition`,

    contact: `${ROOTS.admin}/contact`,
  },
};
