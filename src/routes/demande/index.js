import { Router } from 'express';
import { middleware as body } from 'bodymen';
import Demande from "../../models/demande";
import { token } from "../../services/passport";
import { createDemande, getListDemande, deleteDemande } from "./controllers";
import _, { split } from "lodash";

const router = new Router();

const multer = require('multer');
const path = require('path');


// ZONE UPLOADING
var storage = multer.diskStorage({
    filename: function (req, file, cb) {
        const fileExtension = path.extname(file.originalname);
        const uniqueFilename =Date.now() + fileExtension;
        cb(null, uniqueFilename);
    },
    destination: function (req, file, cb) {
        cb(null, "public/uploads/");
    },
});

let upload = multer({
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024, // 2MB limit (in bytes)
    },
});

router.post("/new", upload.array("file"), async (req, res) => {
    const newDemande = await Demande.create(req.body);
    for (const file of req.files) {
        let pathSplitStep = file.path.split('/');

        // windows
        let firstNameArray = pathSplitStep[0].split('\\');
        let fileName = firstNameArray[2];

        // LINUX
        // let fileName = pathSplitStep[2];

        newDemande.documents.push(fileName);
        await newDemande.save();
    }

    return res.json({
        success: true
    }) 
});

router.post('/create',
    token({ required: true}),
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
        userId: {
            type: String,
            required: true
        },
    }), createDemande)

router.get('/liste',
    token({ required: true}),
    getListDemande)

router.delete('/delete/:id',
    token({ required: true}),
    deleteDemande)

export default router;