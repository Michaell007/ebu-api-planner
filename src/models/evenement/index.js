import mongoose, { Schema } from "mongoose";
import timestampPlugin from 'mongoose-timestamp';
import User from '../user';
import _ from "lodash";

const evenementSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    lieu: {
        type: String,
        required: true
    },
    prix: {
        type: Number,
        required: true
    },
    nbPersonnes: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    userId: {type: mongoose.Types.ObjectId, ref: "User"},
    images: [{type: mongoose.Types.ObjectId, ref: "Image"}]
});

evenementSchema.methods = {};
evenementSchema.statics = {};
evenementSchema.plugin(timestampPlugin);

const model = mongoose.model("Evenement", evenementSchema);

export const schema = model.schema;
export default model;
