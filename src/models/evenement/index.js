import mongoose, { Schema } from "mongoose";
import User from '../user';
import _ from "lodash";

const evenementSchema = new Schema({
    title: {
        type: String,
        trim: true,
        default: null,
    },
    nbPersonnes: {
        type: Number,
        required: true
    },
    userId: {type: mongoose.Types.ObjectId, ref: "User"}
});

evenementSchema.methods = {};

evenementSchema.statics = {};

// userSchema.plugin(timestampPlugin);

const model = mongoose.model("Evenement", evenementSchema);

export const schema = model.schema;
export default model;
