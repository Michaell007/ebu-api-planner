import { Router } from 'express';
import { middleware as body } from 'bodymen';
import { token } from "../../services/passport";
import { createEvent, getAllEvent, getAllByuser, getOneEvent, 
    getAllEventByCategory, getLocations, deleteEvent } from "./controllers";
import Evenement from '../../models/evenement';
import Image from '../../models/image';
import _, { split } from "lodash";

const multer = require('multer');
const path = require('path');

const router = new Router();

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

router.post("/create", upload.array("file"), async (req, res) => {
    const existTitle = await Evenement.findOne({ title: req.body.title });
    if (existTitle !== null) {
        return res.sendUserError('Cet titre existe déjà.');
    }

    const newEvent = await Evenement.create(req.body);
    for (const file of req.files) {
        let pathSplitStep = file.path.split('/');

        // windows
        let firstNameArray = pathSplitStep[0].split('\\');
        let fileName = firstNameArray[2];

        // LINUX
        // let fileName = pathSplitStep[2];

        const img = await Image.create({ name: fileName, evenement: newEvent.id });
        newEvent.images.push(img.id);
        await newEvent.save();
    }

    return res.json({
        success: true
    }) 
});

router.get('/all/:type',
    // token({ required: true}),
    getAllEvent)

router.get('/locations',
    // token({ required: true}),
    getLocations)

router.get('/all/:type/:category',
    // token({ required: true}),
    getAllEventByCategory)

router.get('/all-by-user',
    token({ required: true}),
    getAllByuser)

router.get('/:id',
    // token({ required: true}),
    getOneEvent)

router.delete('/delete/:id',
    token({ required: true}),
    deleteEvent)

export default router;