import { model, Model, models, Schema } from "mongoose";

const projectSchema = new Schema({
  _id: String,
  title: String,
  description: String,
  image: String,
  date: String,
  overview: String,
  addedDate: {
    type: Date,
    default: Date.now(),
  },
});

let UpcommingProject: Model<any>;
try {
  UpcommingProject =
    models.UpcommingProject ||
    model("UpcommingProject", projectSchema, "UpcommingProject");
} catch (error) {
  UpcommingProject = model(
    "UpcommingProject",
    projectSchema,
    "UpcommingProject"
  );
}

export default UpcommingProject;
