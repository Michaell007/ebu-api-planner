import mongoose, { Schema } from "mongoose";
import timestampPlugin from 'mongoose-timestamp';
import User from '../user';
import _ from "lodash";

const detailsCommandeSchema = new Schema({
    horaire: {
        type: String,
        required: false
    },
    nombrePersChoisi: {
        type: Number,
        required: false
    },
    qteBouteilleChoisi: {
        type: Number,
        required: false
    },
    commandeId: {type: mongoose.Types.ObjectId, ref: "Commande"},
    evenementId: {type: mongoose.Types.ObjectId, ref: "Evenement"}
});

detailsCommandeSchema.methods = {};
detailsCommandeSchema.statics = {};
detailsCommandeSchema.plugin(timestampPlugin);

const model = mongoose.model("DetailsCommande", detailsCommandeSchema);

export const schema = model.schema;
export default model;
