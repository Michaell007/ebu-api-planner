import User from "../../../models/user";

export default async ({ params }, res, next) => {
    try {

        // get liste include: 'Profile'
        let liste = await User.findAll({ attributes: {exclude: ['password']}, include: 'Profile', 
            order: [
                ['id', 'DESC']
            ] 
        });

        return res.json({
            succes: true,
            details: liste
        })
        
    } catch (error) {
        return next(error)
    }

}