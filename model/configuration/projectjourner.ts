import { model, Model, models, Schema } from "mongoose";

const projectJournerySchema = new Schema(
  {
    card1title: String,
    card1description: String,
    card1Date: Date,
    
    card2title: String,
    card2description: String,
    card2Date: Date,

    card3title: String,
    card3description: String,
    card3Date: Date,

    card4title: String,
    card4description: String,
    card4Date: Date,

    card5title: String,
    card5description: String,
    card5Date: Date,
  },
  { strict: false }
);

let ProjectJourney: Model<any>
try{
    ProjectJourney = models.ProjectJourney || model("ProjectJourney", projectJournerySchema,"ProjectJourney");
} catch(error) {
    ProjectJourney = model("ProjectJourney", projectJournerySchema, "ProjectJournery");
}

export default ProjectJourney