import Demande from "../../../models/demande";
import _ from "lodash";

export default async ({ bodymen: { body }}, res, next) => {
    try {
        const existPhone = await await Demande.findOne({ phone: body.phone });
        if (existPhone !== null) {
            return res.sendUserError('Cet numéro est déjà utilisé.');
        }

        const demande = await Demande.create(body);

        return res.json({
            success: true
        })        
    } catch (error) {
        return next(error)
    }
}