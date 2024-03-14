import mongoose, { Schema } from "mongoose";
import timestampPlugin from 'mongoose-timestamp';
import _ from "lodash";

const programmeSchema = new Schema({
    id: {
        type: String,
        default: null,
    },
    title: {
        type: String,
        default: null,
    },
    description: {
        type: String,
        default: null,
    },
    with: {
        type: String,
        required: true
    },
    time: {
        type: Object,
        default: null,
    },
    color: {
        type: String,
        required: false,
    },
    isEditable: {
        type: Boolean,
        required: true,
    },
    eventId: {
        type: String,
        required: true,
    },
    userId: {type: mongoose.Types.ObjectId, ref: "User"}
});

programmeSchema.methods = {};
programmeSchema.statics = {};
programmeSchema.plugin(timestampPlugin);

const model = mongoose.model("Programme", programmeSchema);

export const schema = model.schema;
export default model;
