import { Schema, model, models, Model } from "mongoose";

const conditionsOfuseSchema = new Schema(
  {
    description: String,
  },
  { strict: false }
);

let ConditionsOfUse: Model<any>;
try {
  ConditionsOfUse = models.ConditionsOfUse || model("ConditionsOfUse", conditionsOfuseSchema, "ConditionsOfUse");
} catch (error) {
  ConditionsOfUse = model("ConditionsOfUse", conditionsOfuseSchema, "ConditionsOfUse");
}

export default ConditionsOfUse;
