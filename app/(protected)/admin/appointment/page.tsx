import React from "react";
import ContactTable from "../components/contact/contactTable";
import AppointmentTable from "../components/appointment/appointmentTable";

const Contact = () => {
  return (
    <div className="space-y-2">
      <h1 className="pb-4">Appointment </h1>
      <AppointmentTable />
    </div>
  );
};

export default Contact;
