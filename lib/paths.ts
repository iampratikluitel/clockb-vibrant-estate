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

    faqs: `${ROOTS.admin}/faqs`,
    addfaq: `${ROOTS.admin}/faqs/add`,
    editfaq: `${ROOTS.admin}/faqs/edit`,

    configuration: `${ROOTS.admin}/configuration`,
    landingpage: `${ROOTS.admin}/configuration/landingpage`,
    footer: `${ROOTS.admin}/configuration/footer`,
    brochure: `${ROOTS.admin}/configuration/brochure`,
  },
};
