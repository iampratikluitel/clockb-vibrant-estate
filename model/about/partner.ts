import mongoose, { Model, model, models } from "mongoose"

const partnerSchema = new mongoose.Schema(
    {
      name: String,
      logo: String,
      description: String,
    }, {strict: false}
);

let Partner: Model<any>;
try{
  Partner = models.Partner || model("Partner", partnerSchema, "PartnerSchema");
} catch (error){
  Partner = model(
    "Partner", partnerSchema,"Partner"
  );
}
export default Partner;