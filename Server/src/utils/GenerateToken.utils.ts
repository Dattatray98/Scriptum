import jwt from "jsonwebtoken";


export const GenerateToken = (id: string) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET_KEY!,
        { expiresIn: "1d" }
    );
};