import User from "../../../models/user";
import { SALT } from "../../../config";
import  bcrypt from "bcryptjs";
import _ from "lodash";

export default async ({ bodymen: { body }}, res, next) => {
    try {
        const emailEmail = await await User.findOne({ email: body.email });
        if (emailEmail !== null) {
            return res.sendUserError('Cet Email est déjà utilisé.');
        }

        const phoneExist = await await User.findOne({ phone: body.phone });
        if (phoneExist !== null) {
            return res.sendUserError('Cet numéro est déjà utilisé.');
        }

        // hash du password
        const salt = await bcrypt.genSalt(SALT);
        const hashedPassword = await bcrypt.hash(body.password, salt);
        body.password = hashedPassword;

        // enreg. de l'utilisateur
        const user = await User.create(body);

        return res.json({
            success: true,
            user: user.view()
        })        
    } catch (error) {
        return next(error)
    }
}