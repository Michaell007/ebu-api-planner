import Role from "../../../models/roles";

export default async ({ params }, res, next) => {
    try {
        // get liste
        let liste = await Role.findAll({ });

        return res.json({
            succes: true,
            results: liste
        })
        
    } catch (error) {
        return next(error)
    }

}