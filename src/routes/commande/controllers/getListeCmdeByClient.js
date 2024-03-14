import Commande from "../../../models/commande";
import Evenement from "../../../models/evenement";

export default async ({ params }, res, next) => {
    try {
        const evenementIds = await Evenement.find({ userId: params.idClient }, '_id').distinct('_id');
        const commandes = await Commande.aggregate([
            {   $match: { evenements: { $in: evenementIds } }},
            {   
                $lookup: {
                    from: "evenements",
                    localField: "evenements",
                    foreignField: "_id", 
                    as: "evenements" 
                }
            },
            {
                $lookup: {
                  from: "detailscommandes",
                  localField: "detailsCommandes",
                  foreignField: "_id",
                  as: "detailsCommandes"
                }
            }
        ]).sort({ createdAt : -1 })

        return res.json({
            success: true,
            results: commandes
        })
        
    } catch (error) {
        return next(error)
    }

}