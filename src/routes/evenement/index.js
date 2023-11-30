import { Router } from 'express';
import { middleware as body } from 'bodymen';
import { token } from "../../services/passport";
import { createEvent } from "./controllers";

const multer = require('multer');
const path = require('path');

const router = new Router();

// Multer configuration
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'public/uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     },
// });
// const upload = multer({ storage: storage });

// Multiple file upload endpoint
// router.post('/create', upload.array('files', 5), (req, res) => {
//     console.log('tu es une servante ...');
//     res.json({ message: 'Files uploaded successfully' });
// });



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
router.post("/create", upload.single("file"), (req, res) => {
    console.log('tu es une servante ...');
    res.json({ message: 'Files uploaded successfully' });
});






router.post('/create',
    // token({ required: true}),
    body({
        firstName: {
            type: String,
            trim: true,
            required: true
        }
    }), createEvent)


export default router;