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
        required: false
    },
    prix: {
        type: Number,
        required: true
    },
    categorieBoisson: {
        type: String,
        default: null,
        required: false
    },
    categorieTraiteur: {
        type: String,
        default: null,
        required: false
    },
    nbPersonnes: {
        type: Number,
        required: false
    },
    type: {
        type: String,
        required: true
    },
    indisponibilites: {
        type: Array,
        required: false
    },
    longitude: {
        type: String,
        required: false
    },
    latitude: {
        type: String,
        required: false
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
