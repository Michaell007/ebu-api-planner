import User from "../../../models/user";
import { SALT } from "../../../config";
import  bcrypt from "bcryptjs";
import _ from "lodash";

export default async ({ bodymen: { body }}, res, next) => {
    try {
        const usernameExist = await User.findOne({ where: { username: _.toLower(body.username)} });
        if (usernameExist !== null) {
            return res.sendUserError('Cet username est déjà utilisé.');
        }

        const emailEmail = await User.findOne({ where: { email: _.toLower(body.email) } });
        if (emailEmail !== null) {
            return res.sendUserError('Cet email est déjà utilisé.');
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