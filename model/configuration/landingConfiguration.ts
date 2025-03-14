import { Schema, model, models, Model } from "mongoose";

const contentSchema = {
  image: String,
  link: String,
};

const landingSchema = new Schema(
  {
    title: String,
  },
  { strict: false }
);

let LandingConfiguration: Model<any>;
try {
  LandingConfiguration =
    models.LandingConfiguration ||
    model("LandingConfiguration", landingSchema, "LandingConfiguration");
} catch (error) {
  LandingConfiguration = model(
    "LandingConfiguration",
    landingSchema,
    "LandingConfiguration"
  );
}

export default LandingConfiguration;
