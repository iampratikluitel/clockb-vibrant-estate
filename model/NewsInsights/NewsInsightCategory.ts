import { Schema, model, models, Model } from 'mongoose';

const newsCategorySchema = new Schema({
    name:String,
    slug: String,
    status: {
      type: Boolean,
      default: true,
    },
}, { strict: false });

let NewsInsightCategory: Model<any>;
try {
    NewsInsightCategory = models.NewsInsightCategory || model('newsCategory', newsCategorySchema, 'newsCategory');
} catch (error) {
    NewsInsightCategory = model('newsCategory', newsCategorySchema, 'newsCategory');
}

export default NewsInsightCategory;