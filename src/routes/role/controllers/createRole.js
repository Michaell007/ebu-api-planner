import Role from "../../../models/roles";
import _ from "lodash";

export default async ({ bodymen: { body }}, res, next) => {
    try {
        body.libelle = _.toUpper(body.libelle);
        const libelleExist = await Role.findOne({ where: { libelle: body.libelle } });
        if (libelleExist !== null) {
            return res.sendUserError('Role est déjà utilisé.');
        }

        // enreg. role
        const role = await Role.create(body);

        res.json({
            succes: true,
            results: role
        })

    } catch (error) {
        return next(error)
    }
}