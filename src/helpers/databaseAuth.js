import mongoose from "mongoose";
import { MONGODB_URL } from "../config";

const databaseAuth = async () => {
    try {
        const conn = await mongoose.connect(MONGODB_URL);
        console.log( `mongodb connected ${conn.connection.host}` );
    } catch (error) {
        console.log(error);
    }
}

export default databaseAuth;