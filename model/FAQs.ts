import { Schema, model, models, Model } from "mongoose";

const faqsSchema = new Schema(
  {
    question: String,
    answer: String,
    category: {
      type: String,
      enum: ["General", "Investment & Returns", "Land & Location", "Exit Options & Taxation", "Project Development"],
      required: true
    },
    addedDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { strict: false }
);

let FAQs: Model<any>;
try {
  FAQs = models.FAQs || model("FAQs", faqsSchema, "FAQs");
} catch (error) {
  FAQs = model("FAQs", faqsSchema, "FAQs");
}

export default FAQs;
