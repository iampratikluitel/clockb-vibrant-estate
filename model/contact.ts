import mongoose, { Model, models } from "mongoose";
import { model } from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    subject: String,
    message: String,
    Date: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    strict: false,
  }
);

let Contact: Model<any>;
try{
  Contact = models.Contact || model("Contact", contactSchema, "Contact")
} catch (error) {
  Contact = model("Contact", contactSchema, "Contact")
}

export default Contact;
