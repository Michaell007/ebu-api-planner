import User from "../../../models/user";

export default async (req, res, next) => {
    
    try {
        const { user } = req;
        let users = await User.find({ type : req.params.role } )
            .select('-password');

        return res.json({
            success: true,
            results: users
        })
        
    } catch (error) {
        return next(error)
    }

}