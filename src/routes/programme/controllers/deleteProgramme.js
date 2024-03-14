import Programme from "../../../models/programme";
import Evenement from "../../../models/evenement";
const mongoose = require('mongoose');
import _ from "lodash";

export default async ({ params }, res, next) => {
    try {
        let program = await Programme.findOne({ id: params.id })

        const idd = new mongoose.Types.ObjectId(program.eventId);
        let event = await Evenement.findById(idd);

        const filteredData = _.filter(event.indisponibilites, (item) => {
            return  item.idProgramme.toString() !== program._id.toString()
        });

        event.indisponibilites = filteredData
        event.save()

        if (program) {
            await Programme.deleteOne({ _id: program._id });
        }

        return res.json({
            success: true
        })
        
    } catch (error) {
        return next(error)
    }
}