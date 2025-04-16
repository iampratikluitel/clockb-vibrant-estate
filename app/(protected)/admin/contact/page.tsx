import React from "react";
import ContactTable from "../components/contact/contactTable";

const Contact = () => {
  return (
    <div className="space-y-2">
      <h1 className="pb-4">
        Contact Details
      </h1>
      <ContactTable />
    </div>
  );
};

export default Contact;
