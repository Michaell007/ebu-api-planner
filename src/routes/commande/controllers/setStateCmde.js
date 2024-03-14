import Commande from "../../../models/commande";
const mongoose = require('mongoose');

export default async (req, res, next) => {
    try {
        const { user } = req;
        const id = new mongoose.Types.ObjectId(req.params.id);
        const cmde = await Commande.findById(id);
        cmde.status = req.body.state
        cmde.save()

        return res.json({
            success: true
        })
        
    } catch (error) {
        return next(error)
    }

}