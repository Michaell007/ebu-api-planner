import { Router } from 'express';
import { middleware as body } from 'bodymen';
import { token } from "../../services/passport";
import { createVille, getListVille } from "./controllers";

const router = new Router();

router.post('/create',
    token({ required: true}),
    body({
        libelle: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        },
    }), createVille)


router.get('/liste',
    token({ required: true}),
    getListVille)

export default router;