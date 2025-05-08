import { Schema, model, models, Model } from "mongoose";

const faqsCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { strict: false }
);

const FAQsCategory: Model<any> =
  models.FAQsCategory ||
  model("FAQsCategory", faqsCategorySchema, "faqsCategory");

const faqsSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "FAQsCategory",
      required: [true, "FAQs Category is required"],
    },
    status: {
      type: Boolean,
      default: true, 
    },
    addedDate: {
      type: Date,
      default: Date.now,
    },
  },
  { strict: false }
);

const FAQs: Model<any> = models.FAQs || model("FAQs", faqsSchema, "FAQs");

export { FAQs, FAQsCategory };
