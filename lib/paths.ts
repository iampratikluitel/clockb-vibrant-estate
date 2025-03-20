const ROOTS = {
    admin: "/admin",
    public: "/",
};

export const paths = {
    admin: {
        dashboard: `${ROOTS.admin}`,

        configuration: `${ROOTS.admin}/configuration`,
        landingpage: `${ROOTS.admin}/configuration/landingpage`,
        footer: `${ROOTS.admin}/configuration/footer`,
        brochure: `${ROOTS.admin}/configuration/brochure`,
    }
}