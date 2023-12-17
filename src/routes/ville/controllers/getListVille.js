import Ville from "../../../models/ville";

export default async (req, res, next) => {
    try {
        const { user } = req;
        let villes = await Ville.find({});

        return res.json({
            success: true,
            results: villes
        })
        
    } catch (error) {
        return next(error)
    }

}