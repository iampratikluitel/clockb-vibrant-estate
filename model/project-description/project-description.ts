import { model, Model, models, Schema } from "mongoose";

const projectSchema = new Schema({
  slug: String,
  title: String,
  description: String,
  image: String,
  date: String,
  overview: String,
  status: {
    type: Boolean,
    default: true,
  },
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
