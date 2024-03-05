import Commande from "../../../models/commande";
import DetailsCommande from "../../../models/detailsCommande";
import _ from "lodash";

export default async ({ bodymen: { body, user }}, res, next) => {
    try {
        const newCmde = await Commande.create({ userId: body.userId, status: 'EN COURS' });

        for (const event of body.evenements) {
            let details = await DetailsCommande.create({
                commandeId: newCmde._id, 
                evenementId: event._id,
                horaire: event?.horaire,
                nombrePersChoisi: event?.nombrePersChoisi,
                qteBouteilleChoisi: event?.qteBouteilleChoisi,
                dateChoisi: event?.dateChoisi
            });

            newCmde.evenements.push(event._id);
            newCmde.detailsCommandes.push(details._id);
            await newCmde.save();
        }

        return res.json({
            success: true
        })        
    } catch (error) {
        return next(error)
    }
}