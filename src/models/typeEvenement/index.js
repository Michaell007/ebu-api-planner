import mongoose, { Schema } from "mongoose";
import timestampPlugin from 'mongoose-timestamp';
import _ from "lodash";

const typeEvenementSchema = new Schema({
    libelle: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false
    },
});

typeEvenementSchema.methods = {};
typeEvenementSchema.statics = {};
typeEvenementSchema.plugin(timestampPlugin);

const model = mongoose.model("TypeEvenement", typeEvenementSchema);

export const schema = model.schema;
export default model;
