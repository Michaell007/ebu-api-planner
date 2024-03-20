import Demande from "../../../models/demande";

export default async (req, res, next) => {
    try {
        const { user } = req;
        let demandes = await Demande.find({}).populate('userId');

        return res.json({
            success: true,
            demandes: demandes
        })
        
    } catch (error) {
        return next(error)
    }

}