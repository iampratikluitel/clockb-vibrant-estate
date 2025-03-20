import mongoose from "mongoose";

const BrochureSchema = new mongoose.Schema({
    description: { type: String, required: true },
    fileId: { type: mongoose.Schema.Types.ObjectId, required: true },
    filename: { type: String, requires: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Brochure || mongoose.model("Brochure", BrochureSchema);