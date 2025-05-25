import { model, Model, models, Schema } from "mongoose";

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

let Event: Model<any>;
try {
  Event = models.Event || model("Event", eventSchema, "Event");
} catch (error) {
  Event = model("Event", eventSchema, "Event");
}

export default Event;
