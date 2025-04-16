import mongoose, { Model, model, models } from "mongoose"

const termsAndCondition = new mongoose.Schema(
    {
      name: String,
      description: [String],
      icon: String,
    }, {strict: false}
);

let TermsAndConditions: Model<any>;
try {
  TermsAndConditions =
    models.TermsAndConditions ||
    model("TermsAndConditions", termsAndCondition, "TermsAndConditions");
} catch (error) {
  TermsAndConditions = model(
    "TermsAndConditions",
    termsAndCondition,
    "TermsAndConditions"
  );
}export default TermsAndConditions;