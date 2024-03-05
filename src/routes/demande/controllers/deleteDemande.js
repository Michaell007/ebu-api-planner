import Demande from "../../../models/demande";

export default async ({ params }, res, next) => {
    try {

        let demande = await Demande.findOne({ _id: params.id });
        if (demande && !demande.isTraited) {
            await Demande.findOneAndDelete({ _id: params.id })
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