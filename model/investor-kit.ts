import mongoose from "mongoose";

const investorKitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
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

const InvestorKit = mongoose.models.InvestorKit || mongoose.model("InvestorKit", investorKitSchema);

export default InvestorKit; 