import TypeEvenement from "../../../models/typeEvenement";

export default async (req, res, next) => {
    try {
        const { user } = req;
        let events = await TypeEvenement.find({});

        return res.json({
            success: true,
            results: events
        })
        
    } catch (error) {
        return next(error)
    }

}