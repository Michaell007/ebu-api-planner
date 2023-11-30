import User from "../../../models/user";
import { SALT } from "../../../config";
import  bcrypt from "bcryptjs";
import _ from "lodash";

export default async ({ bodymen: { body }}, res, next) => {
    try {

        return res.json({
            success: true,
            data: "hello All"
        })        
    } catch (error) {
        return next(error)
    }
}