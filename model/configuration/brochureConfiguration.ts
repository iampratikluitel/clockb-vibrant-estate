import { model, Model, models, Schema } from "mongoose";

const brochureSchema = new Schema(
  {
    brochure: { type: String, required: true },
  },
  { strict: false }
);

let Brochure: Model<any>;
try {
  Brochure = models.Brochure || model("Brochure", brochureSchema, "Brochure");
} catch (error) {
  Brochure = model("Brochure", brochureSchema, "Brochure");
}

export default Brochure;
