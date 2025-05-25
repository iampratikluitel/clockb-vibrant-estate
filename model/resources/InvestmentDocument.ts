import mongoose, { model, Model, models } from "mongoose";

const investmentDocSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    enum: ['file-text', 'scroll-text', 'file'],
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

let InvestmentDocument: Model<any>;
try {
  InvestmentDocument =
    models.InvestmentDocument ||
    model("InvestmentDocument", investmentDocSchema, "InvestmentDocument");
} catch (error) {
  InvestmentDocument = model(
    "InvestmentDocument",
    investmentDocSchema,
    "InvestmentDocument"
  );
}

export default InvestmentDocument;
