import User from "../../../models/user";

export default async ({ params }, res, next) => {
    try {

        let user = await User.findOne({ id: params.id });
        if (user == null) {
            return res.sendUserError('Identifiant incorrect.');
        }

        return res.json({
            succes: true,
            user: user
        })
        
    } catch (error) {
        return next(error)
    }

}