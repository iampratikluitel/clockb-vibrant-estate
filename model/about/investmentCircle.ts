import mongoose, { Model, model, models } from "mongoose"

const investmentCircleSchema = new mongoose.Schema(
    {
      name: String,
      description: String,
      points: [String],
      logo: String,
    }, {strict: false}
);

let InvestmentCircle: Model<any>;
try {
  InvestmentCircle =
    models.InvestmentCircle ||
    model("InvestmentCircle", investmentCircleSchema, "InvestmentCircle");
} catch (error) {
  InvestmentCircle = model(
    "InvestmentCircle",
    investmentCircleSchema,
    "InvestmentCircle"
  );
}export default InvestmentCircle;