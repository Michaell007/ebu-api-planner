import Evenement from "../../../models/evenement";
import Commande from "../../../models/commande";

export default async ({ params }, res, next) => {
    try {
        let event = await Evenement.findOne({ _id: params.id });
        let cmdes = await Commande.find({ "evenements": { $in: [ event._id ] } })

        if (cmdes.length > 0) {
            return res.json({ success: false })
        }

        await Evenement.findOneAndDelete({ _id: params.id })

        return res.json({
            success: true
        })
        
    } catch (error) {
        return next(error)
    }
}