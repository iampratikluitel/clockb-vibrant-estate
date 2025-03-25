import { Schema, models, Model, model } from  "mongoose";

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
    card8icon: String,
    card8name: String,
    card8description: String,
    card9icon: String,
    card9name: String,
    card9description: String,
    card10icon: String,
    card10name: String,
    card10description: String,

    card11icon: String,
    card11name: String,
    card11description: String,
    card12icon: String,
    card12name: String,
    card12description: String,
    card13icon: String,
    card13name: String,
    card13description: String,
  }, { strict: false }
);

let LandingConfiguration: Model<any>;
try {
  LandingConfiguration = models.LandingConfiguration || model("LandingConfiguration", landingSchema, "LandingConfiguration");
} catch (error) {
  LandingConfiguration = model("LandingConfiguration", landingSchema, "LandingConfiguration");
}

export default LandingConfiguration;