import { Schema, model, models, Model } from 'mongoose';

const testimonialsSchema = new Schema({
    name:String,
    image: String,
    role: String,
    description: String,
    postedDate: {
      type: Date,
      default: Date.now(),
    },
}, { strict: false });

let Testimonials: Model<any>;
try {
  Testimonials = models.Testimonials || model('Testimonials', testimonialsSchema, 'Testimonials');
} catch (error) {
  Testimonials = model('Testimonials', testimonialsSchema, 'Testimonials');
}

export default Testimonials;