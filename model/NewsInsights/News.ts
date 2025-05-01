import { model, Model, models, Schema } from "mongoose";

const newsSchema = new Schema({
  slug: String,
  title: String,
  author: String,
  description: String,
  image: String,
  bannerImage: String,
  date: String,
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "NewsInsightCategoryy",
    required: [true, "News Category is required"],
  },
  overview: String,
  status: {
    type: Boolean,
    default: true,
  },
  addedDate: {
    type: Date,
    default: Date.now(),
  },
},  { strict: false });

let NewsInsight: Model<any>;
try {
  NewsInsight =
    models.NewsInsight || model("NewsInsight", newsSchema, "NewsInsight");
} catch (error) {
  NewsInsight = model("NewsInsight", newsSchema, "NewsInsight");
}

export default NewsInsight;
