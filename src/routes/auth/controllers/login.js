import _ from 'lodash';
import User from "../../../models/user";
import { sign } from "../../../services/jwt";
import bcript from "bcryptjs";

export default async ({ bodymen: { body } }, res, next) => {
    try {
        // Check user by email
        const user = await User.findOne({ email: body.email });

        if (user === null) {
            return res.sendUserError('Echec de l\'authentification.');
        }

        // check password is Ok
        const passwordvalid = await bcript.compare(body.password, user.password);
        if(!passwordvalid) return res.sendUserError('Echec de l\'authentification.');

        if (user.isActive === false) {
            return res.sendUserError('Ce compte est inactif.');
        }

        // generate token
        const token = await sign(user.id);

        res.json({
            succes: true,
            user: user.view(),
            token: token
        })
        
    } catch (error) {
        return next(error)
    }
}