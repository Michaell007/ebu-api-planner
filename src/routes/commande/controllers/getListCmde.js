import Commande from "../../../models/commande";
import Evenement from "../../../models/evenement";

export default async (req, res, next) => {
    try {
        const { user } = req;
        let commandes = await Commande.find({ userId: user.id })
            .populate('detailsCommandes').populate('evenements')
        ;

        return res.json({
            success: true,
            commandes: commandes
        })
        
    } catch (error) {
        return next(error)
    }

}