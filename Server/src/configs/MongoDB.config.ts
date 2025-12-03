import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();

export const MongoConnect = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL!);
        console.log("MongoDB Connected");
    }catch(error){
        console.log("error : ", error);
        process.exit(1);
    }
};