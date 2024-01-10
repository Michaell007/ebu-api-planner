import Ville from "../../../models/ville";
import _ from "lodash";

export default async ({ bodymen: { body }}, res, next) => {
    try {
        
        const existLibelle = await Ville.findOne({ libelle: body.libelle });
        if (existLibelle !== null) {
            return res.sendUserError('Cet libelle est déjà utilisé.');
        }

        await Ville.create(body);

        return res.json({
            success: true
        })        
    } catch (error) {
        return next(error)
    }
}