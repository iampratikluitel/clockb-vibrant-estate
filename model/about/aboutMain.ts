import { Model, model, models, Schema } from "mongoose";

const AboutSchema = new Schema(
  {
    title: String,
    description: String,
  },
  { strict: false }
);

let AboutModel: Model<any>;
try {
  AboutModel =
    models.AboutModel || model("AboutModel", AboutSchema, "AboutModel");
} catch (error) {
  AboutModel = model("AboutModel", AboutSchema, "AboutModel");
}
export default AboutModel;
