import Participant from "../../../models/participant";

export default async (req, res, next) => {
    try {
        const { user } = req;
        let participants = await Participant.find({});

        return res.json({
            success: true,
            results: participants
        })
        
    } catch (error) {
        return next(error)
    }

}