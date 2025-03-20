import mongoose from "mongoose"

const mainSchema = new mongoose.Schema(
    {
      name: String,
      description: String,
    }, {strict: false}
);

const Main = mongoose.model("Main", mainSchema)
export default Main;