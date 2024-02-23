import Programme from "../../../models/programme";

export default async (req, res, next) => {
    try {
        const { user } = req;
        let programmes = await Programme.find({ userId: user.id });

        return res.json({
            success: true,
            results: programmes
        })
        
    } catch (error) {
        return next(error)
    }
}