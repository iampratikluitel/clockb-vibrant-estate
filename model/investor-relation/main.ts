import mongoose from "mongoose"

const investorMainSchema = new mongoose.Schema(
    {
      title: String,
      subtitle: String,
      description: String,
    }, {strict: false}
);

const InvestorMainModel = mongoose.model("Main", investorMainSchema)
export default InvestorMainModel;