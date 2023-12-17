import { Router } from 'express';
import { middleware as body } from 'bodymen';
import { token } from "../../services/passport";
import { createTypeEvenement, getListTypeEvent } from "./controllers";

const router = new Router();

router.post('/create',
    token({ required: true}),
    body({
        libelle: {
            type: String,
            required: true
        },
        description: {
            type: String,
            trim: true,
            required: false
        },
        userId: {
            type: String,
            required: true
        },
    }), createTypeEvenement)


router.get('/liste',
    token({ required: true}),
    getListTypeEvent)

export default router;