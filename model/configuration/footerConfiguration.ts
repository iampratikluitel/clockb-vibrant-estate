import { Schema, model, models, Model } from "mongoose";

const footerSchema = new Schema(
  {
    logo: String,
    about: String,
    email: String,
    address: String,
    phone: String,
    phone2: String,
    socialHandles: {
      facebook: String,
      twitter: String,
      whatsapp: String,
      linkedin: String,
      youtube: String,
      instagram: String,
    },
  },
  { strict: false }
);

let FooterConfiguration: Model<any>;
try {
  FooterConfiguration =
    models.FooterConfiguration ||
    model("FooterConfiguration", footerSchema, "FooterConfiguration");
} catch (error) {
  FooterConfiguration = model(
    "FooterConfiguration",
    footerSchema,
    "FooterConfiguration"
  );
}

export default FooterConfiguration;
