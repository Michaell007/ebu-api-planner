import TypeEvenement from "../../../models/typeEvenement";
import _ from "lodash";

export default async ({ bodymen: { body }}, res, next) => {
    try {
        
        const existLibelle = await TypeEvenement.findOne({ libelle: body.libelle });
        if (existLibelle !== null) {
            return res.sendUserError('Cet libelle est déjà utilisé.');
        }

        await TypeEvenement.create(body);

        return res.json({
            success: true
        })        
    } catch (error) {
        return next(error)
    }
}