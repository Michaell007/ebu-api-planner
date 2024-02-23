import Programme from "../../../models/programme";
import _ from "lodash";

export default async ({ bodymen: { body }}, res, next) => {
    try {
        const existTitle = await await Programme.findOne({ title: body.title });
        if (existTitle !== null) {
            return res.sendUserError('Cet title est déjà utilisé.');
        }

        await Programme.create(body);

        return res.json({
            success: true
        })        
    } catch (error) {
        return next(error)
    }
}