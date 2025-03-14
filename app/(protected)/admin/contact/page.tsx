import React from "react";
import ContactTable from "../components/contact/contactTable";
import ContactForm from "../components/contact/contactForm";

const Contact = () => {
  return (
    <div className="space-y-2">
      <ContactForm />
      <ContactTable />
    </div>
  );
};

export default Contact;
