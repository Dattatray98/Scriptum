import { Request, Response } from "express";
import Transcripts from "../models/transcripts.model"
import { Transcribe } from "../configs/TransciptionModel.Config";
import { upload } from "../middlewares/upload.middleware";


export const GenerateTranscript = [
    upload.single("file"),

    async (req: Request, res: Response) => {
        try {
            if (!req.file) {
                console.log("file is required.")
                return res.status(400).json({ error: "File is Required" })
            }
            
            const response = await Transcribe(req.file);

            res.status(200).json({
                result: response
            });

        } catch (err) {
            console.log("server error : ", err)
        }
    }

];