import mongoose from "mongoose"

const partnerSchema = new mongoose.Schema(
    {
      name: String,
      image: String,
      logo: String,
      description: String,
    }, {strict: false}
);

const Partner = mongoose.model("Partner", partnerSchema)
export default Partner;