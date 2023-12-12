import { Router } from 'express';
import { middleware as body } from 'bodymen';
import { token } from "../../services/passport";
import { createCmde } from "./controllers";
import Evenement from '../../models/evenement';

const router = new Router();

router.post('/create',
    token({ required: true}),
    body({
        description: {
            type: String,
            required: false
        },
        evenements: [{}],
        userId: {
            type: String,
            required: true
        },
    }), createCmde)


export default router;