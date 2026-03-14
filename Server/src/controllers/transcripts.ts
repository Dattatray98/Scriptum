/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import Transcripts from "../models/transcripts.model"
import { Transcribe } from "../configs/TransciptionModel.Config";
import { removeUploadedFile, upload } from "../middlewares/upload.middleware";
import cloudinary from "../configs/Cloudinary.config";
import { YouTube } from "../configs/YouTubeAPI";

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
            console.log(response);


            const segments = response.result.map((item: any) => ({
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

            removeUploadedFile(req.file.path);

            return res.status(200).json({
                result: transcript,
                srt_file: response.srt_url
            });

        } catch (err) {
            console.log("server error : ", err)
        }
    }
];

export const GenerateYoutubeTranscript = async (req: Request, res: Response) => {
    const YTURL = req.query.Yt_url as string;
    const User_Id = req.user as any;
    if (!User_Id) {
        return res.status(400).json({ message: "user id not defined!" });

    }

    try {
        const response = await Transcribe(YTURL);

        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/;
        const match = YTURL.match(regex);

        const videoId = match ? match[1] : ''

        const segments = response.result.map((item: any) => ({
            start: item.start,
            end: item.end,
            text: item.text
        }));

        console.log(segments)

        const videoMetadata = await YouTube.videos.list({
            id: [videoId],
            part: ["snippet", "contentDetails"]
        });

        const videoDetails = videoMetadata?.data.items?.[0]

        const transcript = await Transcripts.create({
            user_id: User_Id,
            title: videoDetails?.snippet?.title as string,
            media: {
                url: YTURL,
            },
            original_transcript: segments,
            transcript_versions: []
        })

        return res.status(200).json({
            response: transcript,
            srt_file: response.srt_url,
            title: videoDetails?.snippet?.title
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server error" });
    }
}