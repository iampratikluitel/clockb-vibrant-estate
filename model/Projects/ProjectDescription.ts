import { model, Model, models, Schema } from "mongoose";

const projectSchema = new Schema({
  slug: String,
  title: String,
  description: String,
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "NewsInsightCategoryy",
    required: [true, "News Category is required"],
  },
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
