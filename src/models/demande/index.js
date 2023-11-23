import mongoose, { Schema } from "mongoose";
import User from '../user';
import _ from "lodash";

const demandeSchema = new Schema({
    nom: {
        type: String,
        trim: true,
        default: null,
    },
    modele: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        trim: true,
        default: null,
    },
    phone: {
        type: String,
        // match: /^\+\d{2,20}$/,
        unique: true,
        required: false,
    },
    email: {
        type: String,
        unique: true,
        match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        trim: true,
        lowercase: true,
    },
    nomEntreprise: {
        type: String,
        trim: true,
        default: null,
    },
    fonctionEntreprise: {
        type: String,
        trim: true,
        default: null,
    },
    typEvent: {
        type: String,
        required: true,
    },
    budgetEvent: {
        type: String,
        required: true,
    },
    nbInvites: {
        type: String,
        required: true,
    },
    dateDebut: {
        type: String,
        required: true,
    },
    dateFin: {
        type: String,
        required: false,
    },
    region: {
        type: String,
        required: true,
    },
    choixPrestation: {
        type: Array,
        required: false,
    },
    remarque: {
        type: String,
        required: true,
    },
    isTraited: {
        type: Boolean,
        default: false
    },
    user: {type: mongoose.Types.ObjectId, ref: "User"}
});

demandeSchema.methods = {};

demandeSchema.statics = {};

// userSchema.plugin(timestampPlugin);

const model = mongoose.model("Demande", demandeSchema);

export const schema = model.schema;
export default model;
