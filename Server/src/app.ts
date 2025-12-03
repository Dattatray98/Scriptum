import express, {Request, Response} from "express";
import cors from "cors";
import CreateUser from "./routers/userAuth.route";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.get("/", (req:Request, res:Response)=>{
    res.send("scriptum server started")
})
app.use("/api/auth", CreateUser);

export default app;
