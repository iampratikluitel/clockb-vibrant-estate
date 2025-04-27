import { Schema, model, models, Model } from 'mongoose';

const newsCategorySchema = new Schema({
  name: String,
  slug: String,
  status: {
    type: Boolean,
    default: true,
  },
}, { strict: false });

const NewsInsightCategory = models.newsCategory || model('newsCategory', newsCategorySchema, 'newsCategory');

export default NewsInsightCategory;