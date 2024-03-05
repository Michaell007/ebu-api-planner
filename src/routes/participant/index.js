import { Router } from 'express';
import { middleware as body } from 'bodymen';
import { token } from "../../services/passport";
import { createParticipant, getListParticipants } from "./controllers";

const router = new Router();

router.post('/create',
    // token({ required: true}),
    body({
        libelle: {
            type: String,
            required: true
        },
        nbreParticipant: {
            type: Number,
            required: true
        },
        userId: {
            type: String,
            required: true
        },
    }), createParticipant)


router.get('/liste',
    // token({ required: true}),
    getListParticipants)

export default router;