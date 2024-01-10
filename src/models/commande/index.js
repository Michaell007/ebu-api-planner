import mongoose, { Schema } from "mongoose";
import timestampPlugin from 'mongoose-timestamp';
import User from '../user';
import _ from "lodash";

const commandeSchema = new Schema({
    description: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false
    },
    userId: {type: mongoose.Types.ObjectId, ref: "User"},
    evenements: [{type: mongoose.Types.ObjectId, ref: "Evenement"}],
    detailsCommandes: [{ type: mongoose.Types.ObjectId, ref: "DetailsCommande" }]
});

commandeSchema.methods = {};
commandeSchema.statics = {};
commandeSchema.plugin(timestampPlugin);

const model = mongoose.model("Commande", commandeSchema);

export const schema = model.schema;
export default model;
