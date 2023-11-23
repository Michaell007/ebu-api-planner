import { Router } from 'express';
import { middleware as body } from 'bodymen';
import { token } from "../../services/passport";
import { createDemande } from "./controllers";

const router = new Router();

router.post('/create',
    // token({ required: true}),
    body({
        modele: {
            type: String,
            required: true
        },
        nom: {
            type: String,
            trim: true,
            required: true
        },
        prenom: {
            type: String,
            trim: true,
            required: true
        },
        phone: {
            type: String,
            trim: true,
            required: true
        },
        email: {
            type: String,
            trim: true,
            match: /^\S+@\S+\.\S+$/,
            lowercase: true,
            required: true
        },
        nomEntreprise: {
            type: String,
            required: true
        },
        fonctionEntreprise: {
            type: String,
            required: true
        },
        region: {
            type: String,
            required: true
        },
        remarque: {
            type: String,
            required: true
        },
        typEvent: {
            type: String,
            required: true,
            minlength: 5
        },
        budgetEvent: {
            type: String,
            required: true,
            minlength: 5
        },
        choixPrestation: {
            type: [],
            required: false
        },
        nbInvites: {
            type: String,
            required: true
        },
        dateFin: {
            type: String,
            required: false
        },
        dateDebut: {
            type: String,
            required: true
        },
        user: {
            type: String,
            required: true
        },
    }), createDemande)

export default router;