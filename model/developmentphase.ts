import { model, Model, models, Schema } from "mongoose";

const milestoneSchema = new Schema({
  period: String,     
  title: String,     
  description: String,
  isActive: { type: Boolean, default: false },
});

const DevelopmentPhaseSchema = new Schema(
  {
    milestones: [milestoneSchema],
    card1title: String,
    card1description: String,
    card1Date: String,
    card2title: String,
    card2description: String,
    card2Date: String,
    card3title: String,
    card3description: String,
    card3Date: String,
    card4title: String,
    card4description: String,
    card4Date: String,
    card5title: String,
    card5description: String,
    card5Date: String,
  },
  { 
    strict: false,
    timestamps: true 
  }
);

let DevelopmentPhase: Model<any>;

try {
  DevelopmentPhase = models.DevelopmentPhase || model("DevelopmentPhase", DevelopmentPhaseSchema, "DevelopmentPhase");
} catch(error) {
  DevelopmentPhase = model("DevelopmentPhase", DevelopmentPhaseSchema, "DevelopmentPhase");
}

export default DevelopmentPhase;