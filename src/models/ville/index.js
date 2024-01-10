import mongoose, { Schema } from "mongoose";
import timestampPlugin from 'mongoose-timestamp';
import _ from "lodash";

const villeSchema = new Schema({
    libelle: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false
    },
});

villeSchema.methods = {};
villeSchema.statics = {};
villeSchema.plugin(timestampPlugin);

const model = mongoose.model("Ville", villeSchema);

export const schema = model.schema;
export default model;
