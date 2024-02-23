import Evenement from "../../../models/evenement";

export default async (req, res, next) => {
    try {
        const { user } = req;
        let events = []

        if (req.params.type == "TRAITEUR") {
            events = await Evenement.find({ type: req.params.type, categorieTraiteur: req.params.category }).populate('images');
        }
        
        if(req.params.type == "BOISSON") {
            events = await Evenement.find({ type: req.params.type, categorieBoisson: req.params.category }).populate('images');
        } else {
            events = await Evenement.find({ type: req.params.type, categorieTraiteur: req.params.category }).populate('images');
        }

        return res.json({
            success: true,
            results: events
        })
        
    } catch (error) {
        return next(error)
    }
}