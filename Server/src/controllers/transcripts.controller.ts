import { Request, Response } from "express";
import Transcripts from "../models/transcripts.model"
import { Transcribe } from "../configs/TransciptionModel.Config";
import { upload } from "../middlewares/upload.middleware";


export const GenerateTranscript = [
    upload.single("file"),
    async (req: Request, res: Response) => {
        try {
            const user_id = req.user as any

            if (!user_id) {
                console.log("user id not found")
            }


            if (!req.file) {
                console.log("file is required.")
                return res.status(400).json({ error: "File is Required" })
            }

            const filename = req.body;
            const response = await Transcribe(req.file);

            const segments = response.map((item: any) => ({
                start: item.start,
                end: item.end,
                text: item.text
            }));

            const transcript = await Transcripts.create({
                user_id: user_id,
                title: filename.filename,
                original_transcript: segments,
                transcript_versions: []
            });

            console.log(transcript);

            res.status(200).json({
                result: transcript
            });

        } catch (err) {
            console.log("server error : ", err)
        }
    }
];