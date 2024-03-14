import { Router } from 'express';
import { middleware as body } from 'bodymen';
import { token } from "../../services/passport";
import { createProgramme, getListProgrammeByUser, deleteProgramme } from "./controllers";
import _, { split } from "lodash";

const router = new Router();

router.post('/create',
    token({ required: true}),
    body({
        id: {
            type: String,
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        with: {
            type: String,
            required: true
        },
        time: {
            type: Object,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        isEditable: {
            type: Boolean,
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
        eventId: {
            type: String,
            required: true
        },
    }), createProgramme)

router.get('/my-liste',
    token({ required: true}),
    getListProgrammeByUser)

router.delete('/:id',
    token({ required: true}),
    deleteProgramme)


export default router;