import { Schema, model, models, Model } from "mongoose";

const newsletterSchema = new Schema(
  {
    email: String,
    subscribedDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { strict: false }
);

let NewsLetter: Model<any>;
try {
  NewsLetter = models.NewsLetter || model("NewsLetter", newsletterSchema, "NewsLetter");
} catch (error) {
  NewsLetter = model("NewsLetter", newsletterSchema, "NewsLetter");
}

export default NewsLetter;
