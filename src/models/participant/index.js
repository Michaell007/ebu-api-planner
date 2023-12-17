import mongoose, { Schema } from "mongoose";
import timestampPlugin from 'mongoose-timestamp';
import _ from "lodash";

const participantSchema = new Schema({
    libelle: {
        type: String,
        required: true,
    },
    nbreParticipant: {
        type: Number,
        required: true
    },
});

participantSchema.methods = {};
participantSchema.statics = {};
participantSchema.plugin(timestampPlugin);

const model = mongoose.model("Participant", participantSchema);

export const schema = model.schema;
export default model;
