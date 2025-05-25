import { model, Model, models, Schema } from "mongoose";

const guideSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      enum: ["file-text", "scroll-text", "file"],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

let Guide: Model<any>;
try {
  Guide = models.Guide || model("Guide", guideSchema, "Guide");
} catch (error) {
  Guide = model("Guide", guideSchema, "Guide");
}

export default Guide;
