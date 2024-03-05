import Commande from "../../../models/commande";

export default async ({ params }, res, next) => {
    try {
        let cmde = await Commande.findOne({ _id: params.id });

        if (cmde && cmde.status == 'EN COURS') {
            await Commande.findOneAndDelete({ _id: params.id })
        } else {
            return res.json({ success: false })
        }

        return res.json({
            success: true
        })
        
    } catch (error) {
        return next(error)
    }
}