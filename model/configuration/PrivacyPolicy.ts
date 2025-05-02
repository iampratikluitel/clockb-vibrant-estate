import { Schema, model, models, Model } from "mongoose";

const privacypolicySchema = new Schema(
  {
    description: String,
  },
  { strict: false }
);

let PrivacyPolicy: Model<any>;
try {
  PrivacyPolicy = models.PrivacyPolicy || model("PrivacyPolicy", privacypolicySchema, "PrivacyPolicy");
} catch (error) {
  PrivacyPolicy = model("PrivacyPolicy", privacypolicySchema, "PrivacyPolicy");
}

export default PrivacyPolicy;
