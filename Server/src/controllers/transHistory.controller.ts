import { Request, Response } from "express";
import transcriptsModel from "../models/transcripts.model";
import mongoose from "mongoose";

export const TranscriptHisotry = async (req: Request, res: Response) => {
    try {
        const trans_id = req.query.trans_id;
        if (!trans_id) {
            return res.status(401).json({ message: "transcription id is not found" })
        }

        const transcript = await transcriptsModel.findOne({
            _id: trans_id
        });

        return res.status(201).json({
            title: transcript?.title,
            trans_id: transcript?._id,
            user_id: transcript?.user_id,
            original_transcript: transcript?.original_transcript,
            version_transcript: transcript?.transcript_versions
        })

    } catch (error) {

    }
}


export const transChats = async (req: Request, res: Response) => {
    try {
        // const User_Id = req.query.user_id;
        const User_Id = req.user as any

        if (!User_Id) {
            return res.status(401).json({ message: 'user id not found' });
        }

        const response = await transcriptsModel.find({
            user_id: User_Id
        });

        const chats = response.map((item) => {
            return {
                trans_id: item._id,
                title: item.title,
            }
        });

        return res.status(201).json({
            Chats: chats
        });


    } catch (err) {

    }
}



export const DeleteTransChat = async (req: Request, res: Response) => {
    try {
        const { trans_id } = req.params;

        if (!trans_id || typeof trans_id !== "string") {
            return res.status(401).json({ message: "invalid trans_id", });
        }

        const response = await transcriptsModel.findByIdAndDelete(trans_id);

        if (!response) {
            return res.status(404).json({ message: "chat not found" });
        }
        return res.status(201).json({
            message: 'chat has been deleted',
            response
        });
    } catch (err) {
        res.status(500).json({ message: "server error", err })
    }
}


export const EditChatName = async (req: Request, res: Response) => {
    try {
        const { trans_id } = req.params;
        const { title } = req.body;

        if (!trans_id || typeof trans_id !== "string" || !title) {
            return res.status(401).json({ message: "Invalid transcription id" });
        }

        const response = await transcriptsModel.findByIdAndUpdate(trans_id, { title }, { new: true });

        return res.status(201).json({
            response
        });
    } catch (err) {
        return res.status(500).json({ message: "sever error" });
    }
}


export const EditTranscript = async (req: Request, res: Response) => {
    try {
        const { trans_id, seg_id } = req.params;
        const { new_segment } = req.body;

        console.log("trans_id = ", trans_id, "seg_id = ", seg_id)
        console.log(" new segment = ", new_segment)

        if (!trans_id || typeof trans_id !== "string" || !new_segment) {
            return res.status(401).json({ message: "invalid transcription id" });
        }

        const response = await transcriptsModel.findOneAndUpdate(
            {
                _id: trans_id,
                "original_transcript._id": seg_id,
            },
            {
                $set: {
                    "original_transcript.$.text": new_segment
                }

            }, { new: true }
        );
        
        return res.status(201).json({
            response
        });

    } catch (err) {
        console.log(err)
    }
}