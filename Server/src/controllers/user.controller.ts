import { Request, Response } from "express";
import User from "../models/user.model"


export const CreateUser = async (req:Request, res:Response)=>{
    try{

        const {email, password} = req.body;

        const user = await User.create({
            email,
            password
        });

        res.status(200).json({message: "user created successfully", user});
    }catch(error){
        res.status(500).json({message: "server error", error});
        console.log("server error ", error);
    }
}