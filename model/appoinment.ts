import mongoose, { model, Model, models } from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    date: {
      type: Date,
      default: Date.now(),
    },
    time: String,
    note: String,
  },
  {
    strict: false,
  }
);

let Appointment: Model<any>;
try {
  Appointment = models.Appointment || model("Appointment", appointmentSchema, "Appointment");
} catch (error) {
  Appointment = model("Appointment", appointmentSchema, "Appointment");
}

export default Appointment;
