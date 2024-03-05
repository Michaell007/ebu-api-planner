import Evenement from "../../../models/evenement";
import _ from "lodash";

export default async (req, res, next) => {
    try {
        let locations = []

        let event = await Evenement.find({});
        _.forEach(event, function(item, key) {
            if ( item.latitude != undefined && item.longitude  != undefined ) {
                let loc = { lat: item?.latitude?.trim(), long: item?.longitude?.trim() }
                locations.push(loc)
            }
        });

        return res.json({
            success: true,
            results: locations
        })
        
    } catch (error) {
        return next(error)
    }

}