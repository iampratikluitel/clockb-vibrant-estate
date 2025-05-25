import { model, Model, models, Schema } from "mongoose";

const reportSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["PDF", "DOC", "DOCX", "XLS", "XLSX", "PPT", "PPTX"],
    },
    size: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: [
        "completed",
        "in_progress",
        "pending",
        "approved",
        "draft",
        "rejected",
      ],
    },
    category: {
      type: String,
      required: true,
      enum: ["quarterly", "construction", "land"],
    },
    fileUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

let Report: Model<any>;
try {
  Report = models.Report || model("Report", reportSchema, "Report");
} catch (error) {
  Report = model("Report", reportSchema, "Report");
}

export default Report;
