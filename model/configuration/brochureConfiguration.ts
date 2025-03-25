import mongoose, { Schema } from "mongoose";

const brochureSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  brochure: { type: String, required: true }, // URL or filename of the brochure
});

// Check if the model is already compiled and avoid recompiling
const Brochure = mongoose.models.BrochureConfiguration || mongoose.model('BrochureConfiguration', brochureSchema);

export default Brochure;
