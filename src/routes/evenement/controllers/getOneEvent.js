import Evenement from "../../../models/evenement";

export default async (req, res, next) => {
    try {
        const { user } = req;
        let event = await Evenement.findOne({ _id: req.params.id }).populate('images');

        return res.json({
            success: true,
            results: event
        })
        
    } catch (error) {
        return next(error)
    }

}