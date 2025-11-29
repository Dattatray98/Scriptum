import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();

export const MongoConnect = () => {
    mongoose.connect(process.env.MONGO_URL!)
        .then(() => console.log("MongoDB Database connected"))
        .catch((error) => console.log("error", error))
}