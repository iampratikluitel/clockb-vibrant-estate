import { Schema, models, Model, model } from "mongoose";

// Main Landing Page Schema
const landingSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    backgroundImage: { type: String },
    card1name: String,
    card1description: String,
    card2name: String,
    card2description: String,
    card3name: String,
    card3description: String,

    // References to different sections
    secondSection: { type: Schema.Types.ObjectId, ref: "LandingSecondSection" },
    thirdSection: { type: Schema.Types.ObjectId, ref: "LandingThirdSection" },
  },
  { strict: false }
);

// Second Section Schema
const LandingSecondSectionSchema = new Schema(
  {
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
  },
  { strict: false }
);

// Third Section Schema
const LandingThirdSectionSchema = new Schema(
  {
    card8icon: String,
    card8name: String,
    card8description: String,
    card9icon: String,
    card9name: String,
    card9description: String,
    card10icon: String,
    card10name: String,
    card10description: String,
  },
  { strict: false }
);

// Register the models
let LandingConfiguration: Model<any>;
let LandingSecondSection: Model<any>;
let LandingThirdSection: Model<any>;

try {
  LandingConfiguration =
    models.LandingConfiguration ||
    model("LandingConfiguration", landingSchema, "LandingConfiguration");
  LandingSecondSection =
    models.LandingSecondSection ||
    model("LandingSecondSection", LandingSecondSectionSchema, "LandingSecondSection");
  LandingThirdSection =
    models.LandingThirdSection ||
    model("LandingThirdSection", LandingThirdSectionSchema, "LandingThirdSection");
} catch (error) {
  LandingConfiguration = model(
    "LandingConfiguration",
    landingSchema,
    "LandingConfiguration"
  );
  LandingSecondSection = model(
    "LandingSecondSection",
    LandingSecondSectionSchema,
    "LandingSecondSection"
  );
  LandingThirdSection = model(
    "LandingThirdSection",
    LandingThirdSectionSchema,
    "LandingThirdSection"
  );
}

export {
  LandingConfiguration,
  LandingSecondSection,
  LandingThirdSection,
};
