import mongoose, { Schema } from "mongoose";
import timestampPlugin from 'mongoose-timestamp';
import _ from "lodash";

const imageSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    evenement: { type: mongoose.Types.ObjectId, ref: "Evenement"}
});

imageSchema.methods = {};
imageSchema.statics = {};
imageSchema.plugin(timestampPlugin);

const model = mongoose.model("Image", imageSchema);

export const schema = model.schema;
export default model;
