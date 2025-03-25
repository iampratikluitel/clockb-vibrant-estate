import { model, Model, models, Schema } from "mongoose";

const keyHighlightsSchema = new Schema(
    {
        card1icon: String,
        card1name: String,
        card1description: [String],

        card2icon: String,
        card2name: String,
        card2description: [String],

        card3icon: String,
        card3name: String,
        card3description: [String],
    }, {strict: false}
);

let keyHighlights : Model<any>;
try {
    keyHighlights = models.keyHighlights || model("keyHighlights",keyHighlightsSchema,"keyHighlights")
} catch (error) {
    keyHighlights = model("keyHighlights", keyHighlightsSchema, "keyHighlightsSchema")
}

export default keyHighlights;