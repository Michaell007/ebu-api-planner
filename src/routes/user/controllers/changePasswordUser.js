import User from "../../../models/user";
import { SALT } from "../../../config";
import  bcrypt from "bcryptjs";
import _ from "lodash";

export default async ({ body, params }, res, next) => {
    try {
        // check user
        const user = await User.findById(params.id);
        if (user == null) {
            return res.sendUserError('Vous n’êtes pas autorisé à accéder à continuer.');
        }

        // check password is Ok
        const passwordvalid = await bcrypt.compare(body.oldPassword, user.password);
        if(!passwordvalid) return res.sendUserError("Echec de l'opération'");

        // hash du password
        const salt = await bcrypt.genSalt(SALT);
        const hashedPassword = await bcrypt.hash(body.newPassword, salt);
        user.password = hashedPassword;
        await user.save()

        return res.json({
            success: true
        })

    } catch (error) {
        next(error)
    }
}