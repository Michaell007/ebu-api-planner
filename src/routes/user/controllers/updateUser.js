import User from "../../../models/user";
import _ from "lodash";

export default async ({ body, params }, res, next) => {
    try {
        // check user
        const user = await User.findOne({ where: { id: params.id }, include: 'Profile' });
        if (user == null) {
            return res.sendUserError('Utilisateur incorrect.');
        }

        const usernameExist = await User.findOne({ where: { username: body.username } });
        if ((usernameExist != null) && (user.username != body.username )) {
            return res.sendUserError('Username existe deja.');
        }

        const emailExist = await User.findOne({ where: { email: body.email } });
        if ((emailExist != null) && (user.email != body.email )) {
            return res.sendUserError('Email existe deja.');
        }

        // check id profile
        const profile = await Profile.findOne({ where: { id: body.ProfileId } });
        if (profile == null) {
            return res.sendUserError('Profile incorrect.');
        }

        // control data body and update
        const payload = _.pick(body, ['username', 'email','ProfileId', 'RoleId', 'embaucheDate']);
        await user.update(payload);

        // reload data
        let newData = await User.findOne({ where: { id: params.id }, attributes: {exclude: ['password']}, include: ['Profile','Role'] });

        return res.json({
            succes: true,
            results: newData
        })

    } catch (error) {
        next(error)
    }
}