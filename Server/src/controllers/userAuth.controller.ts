import { Request, Response } from "express";
import User from "../models/userAuth.model"
import { GenerateToken } from "../utils/GenerateToken.utils";
import bcrypt from "bcryptjs";

export const CreateUser = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashedPassword
        });

        const user_Id = user._id.toString();
        const token = GenerateToken(user_Id)

        res.status(200).json({
            message: "user created successfully",
            user: {
                id: user._id,
                email: user.email,
            },
            token: token
        });

    } catch (error) {
        res.status(500).json({ message: "server error", error });
        console.log("server error ", error);
    }
}


export const UserLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(401).json({ message: "please provide email and password" });
    }
    try {

        const user = await User.findOne({ email: email });
        if (!user) {
            console.log("user not found");
            return res.status(404).json({ message: "user not found" });
        };

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Password" });
        };

        const User_Id = user._id.toString();
        const token = GenerateToken(User_Id);
        res.status(200).json({
            user: {
                id: user._id,
                email: user.email,
            },
            token: token,
        });

    } catch (error) {
        console.log("server error : ", error);
        return res.status(500).json({ message: "server error : ", error });
    }
}



export const UserProfile = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.user).select("-password");

        if (!user) {
            return res.status(401).json({ messsage: "User not found" });
        };

        res.status(200).json({
            user: user
        })
        
    } catch (error) {
        console.log(error);
    }
} 