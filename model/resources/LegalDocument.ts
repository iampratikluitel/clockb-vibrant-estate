import { model, Model, models, Schema } from "mongoose";

const legalSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

let LegalDoc: Model<any>;
try {
  LegalDoc = models.LegalDoc || model("LegalDoc", legalSchema, "LegalDoc");
} catch (error) {
  LegalDoc = model("LegalDoc", legalSchema, "LegalDoc");
}

export default LegalDoc;
