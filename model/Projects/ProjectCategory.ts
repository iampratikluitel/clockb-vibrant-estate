import { Schema, model, models, Model } from 'mongoose';

const projectCategorySchema = new Schema({
  name: String,
  slug: String,
  status: {
    type: Boolean,
    default: true,
  },
}, { strict: false });

const ProjectCategory = models.projectCategory || model('projectCategory', projectCategorySchema, 'projectCategory');

export default ProjectCategory;