import { model, Model, models, Schema } from "mongoose";

const investorKitSchema = new Schema({
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

let InvestorKit: Model<any>;
try {
  InvestorKit = models.InvestorKit || model("InvestorKit", investorKitSchema, "InvestorKit");
} catch (error) {
  InvestorKit = model("InvestorKit", investorKitSchema, "InvestorKit");
}
export default InvestorKit; 