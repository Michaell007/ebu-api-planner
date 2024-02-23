import Evenement from "../../../models/evenement";

export default async (req, res, next) => {
    try {
        const { user } = req;
        let events = await Evenement.find({ userId: user._id }).populate('images');

        return res.json({
            success: true,
            results: events
        })
        
    } catch (error) {
        return next(error)
    }

}