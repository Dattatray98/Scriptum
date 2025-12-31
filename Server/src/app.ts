import express, {Request, Response} from "express";
import cors from "cors";
import CreateUser from "./routers/userAuth.route";
import GenTranscipt from './routers/transcribe.route';

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.get("/", (req:Request, res:Response)=>{
    res.send("scriptum server started")
})
app.use("/api/auth", CreateUser);
app.use("/api", GenTranscipt )

export default app;
