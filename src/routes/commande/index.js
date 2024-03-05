import { Router } from 'express';
import { middleware as body } from 'bodymen';
import { token } from "../../services/passport";
import { createCmde, getListCmde, deleteCmde } from "./controllers";
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

router.get('/liste',
    token({ required: true}),
    getListCmde)

router.delete('/delete/:id',
    token({ required: true}),
    deleteCmde)


export default router;