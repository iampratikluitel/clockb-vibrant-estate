import { model, Model, models, Schema } from "mongoose";

const brochureSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
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
