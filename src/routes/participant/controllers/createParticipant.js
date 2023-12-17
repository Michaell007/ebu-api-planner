import Participant from "../../../models/participant";
import _ from "lodash";

export default async ({ bodymen: { body }}, res, next) => {
    try {
        
        const existLibelle = await Participant.findOne({ libelle: body.libelle });
        if (existLibelle !== null) {
            return res.sendUserError('Cet libelle est déjà utilisé.');
        }

        await Participant.create(body);

        return res.json({
            success: true
        })        
    } catch (error) {
        return next(error)
    }
}