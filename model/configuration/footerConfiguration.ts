import { Schema, model, models, Model } from "mongoose";

if (models.FooterConfiguration) {
  delete models.FooterConfiguration;
}

const emailSchema = new Schema({
  label: { type: String, required: true },
  address: { type: String, required: true }
}, { _id: false });

const phoneSchema = new Schema({
  label: { type: String, required: true },
  number: { type: String, required: true }
}, { _id: false });

const footerSchema = new Schema(
  {
    about: String,
    emails: [emailSchema],
    phones: [phoneSchema],
    address: String,
    socialHandles: {
      facebook: String,
      twitter: String,
      whatsapp: String,
      linkedin: String,
      youtube: String,
      instagram: String,
    },
  },
  { 
    strict: false,
    timestamps: true 
  }
);

const FooterConfiguration: Model<any> = model("FooterConfiguration", footerSchema, "FooterConfiguration");

export default FooterConfiguration;