
import express, { Request, Response } from "express";
import { MongoConnect } from "./configs/MongoDB.config";
import CreateUser from "./routers/user.route";
const app = express();

const PORT = 5000;
MongoConnect();

app.get("/", (req: Request, res: Response) => {
    res.send("Scriptum server started")
});


app.use("/api", CreateUser);

app.listen(PORT, () => console.log("server started at http://localhost:8000"));