import { Request, Response } from "express";
import Transcripts from "../models/transcripts.model"
import { Transcribe } from "../configs/TransciptionModel.Config";
import { removeUploadedFile, upload } from "../middlewares/upload.middleware";
import cloudinary from "../configs/Cloudinary.config";


export const GenerateTranscript = [
    upload.single("file"),
    async (req: Request, res: Response) => {
        try {
            const user_id = req.user as any;
            const filename = req.body;

            if (!user_id) {
                console.log("user id not found")
            }


            if (!req.file) {
                console.log("file is required.")
                return res.status(400).json({ error: "File is Required" })
            }
            

            const isVideo = req.file.mimetype.startsWith("video/");
            const isAudio = req.file.mimetype.startsWith("audio/");

            if (!isVideo && !isAudio) {
                return res.status(400).json({ error: "Unsupported file type" });
            }

            const Cloudinaryresult = await cloudinary.uploader.upload(
                req.file.path,
                {
                    resource_type: "video",
                    folder: "Scriptum/media"
                }
            );

            if (Cloudinaryresult) {
                console.log("uploaded to cloudinary")
            }
            
            if (!Cloudinaryresult.secure_url) {
                return res.status(400).json({ error: "cloudinary upload failed" })
            }
            
            const response = await Transcribe(Cloudinaryresult.secure_url);


            const segments = response.map((item: any) => ({
                start: item.start,
                end: item.end,
                text: item.text
            }));

            const transcript = await Transcripts.create({
                user_id: user_id,
                title: filename.filename,
                media: {
                    url: Cloudinaryresult.secure_url,
                    public_id: Cloudinaryresult.public_id,
                    duration: Cloudinaryresult.duration,
                    type: isVideo ? "video" : "audio",
                },
                original_transcript: segments,
                transcript_versions: []
            });

            res.status(200).json({
                result: transcript
            });

            removeUploadedFile(req.file.path);
        } catch (err) {
            console.log("server error : ", err)
        }
    }
];