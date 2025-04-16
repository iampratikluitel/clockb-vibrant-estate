import { Model, model, models, Schema } from "mongoose";

const investorMainSchema = new Schema(
  {
    title: String,
    subtitle: String,
    description: String,
  },
  { strict: false }
);

let InvestorMainModel: Model<any>;
try {
  InvestorMainModel =
    models.InvestorMainModel ||
    model("InvestorMainModle", investorMainSchema, "InvestorMainModel");
} catch (error) {
  InvestorMainModel = model(
    "InvestorMainModel",
    investorMainSchema,
    "InvestorMainModel"
  );
}
export default InvestorMainModel;
