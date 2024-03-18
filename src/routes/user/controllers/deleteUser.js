import User from "../../../models/user";
import Evenement from "../../../models/evenement";
import Commande from "../../../models/commande";
const mongoose = require('mongoose');

export default async ({ params }, res, next) => {
    try {
        const idUser = new mongoose.Types.ObjectId(params.id);

        let user = await User.findOne({ _id: idUser });
        if (user == null) {
            return res.sendUserError('Identifiant incorrect.');
        }

        let events = await Evenement.find({ userId: user._id });
        if (events.length > 0) {
            return res.sendUserError('Evenements not exist.');
        }

        await User.deleteOne({ _id: user._id });

        return res.json({
            success: true
        })
        
    } catch (error) {
        return next(error)
    }

}