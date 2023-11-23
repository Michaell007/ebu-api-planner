import User from "../../../models/user";
import _ from "lodash";

export default async ({ body, params }, res, next) => {
    try {
        // check user
        const user = await User.findById(params.id);
        if (user == null) {
            return res.sendUserError('Vous n’êtes pas autorisé à accéder à continuer.');
        }

        user.firstName = body.firstName
        user.lastName = body.lastName
        user.phone = body.phone
        user.email = body.email
        await user.save()

        return res.json({
            success: true,
            results: user.view()
        })

    } catch (error) {
        next(error)
    }
}