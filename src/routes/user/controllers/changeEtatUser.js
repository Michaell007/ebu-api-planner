import User from "../../../models/user";
import _ from "lodash";

export default async ({ body, params }, res, next) => {
    try {
        const user = await User.findById(params.id);
        if (user == null) {
            return res.sendUserError('Vous n’êtes pas autorisé à accéder à continuer.');
        }

        user.isActive = body.state
        await user.save()

        return res.json({
            success: true,
        })

    } catch (error) {
        next(error)
    }
}