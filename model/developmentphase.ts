import { model, Model, models, Schema } from "mongoose";

const developmentPhaseSchema = new Schema({
  card1title: String,
  card1description: String,
  card1Date: String,
  card2title: String,
  card2description: String,
  card2Date: String,
  card3title: String,
  card3description: String,
  card3Date: String,
},{ strict: false});

let DevelopmentPhase: Model<any>;

try {
    DevelopmentPhase = models.DevelopmentPhase || model("DevelopmentPhase", developmentPhaseSchema, "DevelopmentPhase");
} catch(error) {
  DevelopmentPhase = model("DevelopmentPhase", developmentPhaseSchema, "DevelopmentPhase");
}

export default DevelopmentPhase;