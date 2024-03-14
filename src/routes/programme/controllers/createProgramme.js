import Programme from "../../../models/programme";
import Evenement from "../../../models/evenement";
const mongoose = require('mongoose');
import _ from "lodash";

export default async ({ bodymen: { body }}, res, next) => {
    try {
        const id = new mongoose.Types.ObjectId(body.eventId);
        const event = await Evenement.findById(id);
        let program = await Programme.create(body);

        let tabIndispo = {
            start: body.time.start,
            end: body.time.end,
            idProgramme: program._id,
        }

        event.indisponibilites = tabIndispo
        event.save()

        return res.json({
            success: true
        })        
    } catch (error) {
        return next(error)
    }
}