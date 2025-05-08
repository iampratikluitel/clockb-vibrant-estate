import { model, Model, models, Schema } from "mongoose";

const milestoneSchema = new Schema({
  period: String,     
  title: String,     
  description: String 
});

const projectJourneySchema = new Schema(
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

// Use a safer approach to model initialization
let ProjectJourney: Model<any>;

try {
  // Try to get the existing model first
  ProjectJourney = models.ProjectJourney || model("ProjectJourney", projectJourneySchema, "ProjectJourney");
} catch(error) {
  // If model doesn't exist yet, create it
  ProjectJourney = model("ProjectJourney", projectJourneySchema, "ProjectJourney");
}

export default ProjectJourney;