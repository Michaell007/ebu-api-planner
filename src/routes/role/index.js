import { Router } from 'express';
import { middleware as body } from 'bodymen';
import { token } from "../../services/passport";
import { createRole, updateRole, getListeRole, getDetailsRole, deleteRole } from "./controllers";

const router = new Router();

router.post('/create',
    token({ required: true }),
    body({
        libelle: {
            type: String,
            required: true
        },
        description: {
            type: String
        }
    }), createRole)

router.put('/edit/:id',
    body({
        libelle: {
            type: String,
            required: true
        },
        description: {
            type: String
        }
    }), updateRole)

router.get('/show/all',
    token({ required: true }),
    getListeRole)

router.get('/show/:id',
    token({ required: true }),
    getDetailsRole)

router.delete('/remove/:id',
    token({ required: true }),
    deleteRole)

export default router;