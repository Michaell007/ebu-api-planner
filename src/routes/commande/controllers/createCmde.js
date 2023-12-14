import Commande from "../../../models/commande";
import _ from "lodash";

export default async ({ bodymen: { body }}, res, next) => {
    try {
        const newCmde = await Commande.create({ userId: body.userId, status: 'EN COURS' });
        for (const event of body.evenements) {
            newCmde.evenements.push(event._id);
            await newCmde.save();
        }

        return res.json({
            success: true
        })        
    } catch (error) {
        return next(error)
    }
}