import mongoose, { Schema, models } from  "mongoose";

const contentSchema = {
  image: String,
  link: String,
};

const landingSchema = new Schema(
  {
    name: String,
    description: String,
    backgroundImage: String,

    card1name: String,
    card1description: String,
    card2name: String,
    card2description: String,
    card3name: String,
    card3description: String,

    card4icon: String,
    card4name: String,
    card4description: String,
    card5icon: String,
    card5name: String,
    card5description: String,
    card6icon: String,
    card6name: String,
    card6description: String,
    card7icon: String,
    card7name: String,
    card7description: String,

  }, { strict: false }
);

const LandingConfiguration = models.LandingConfiguration || mongoose.model("LandingConfiguration", landingSchema);

export default LandingConfiguration;