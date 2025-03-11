import { Schema, model, models, Model } from "mongoose";

const faqsSchema = new Schema(
  {
    question: String,
    answer: String,
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
