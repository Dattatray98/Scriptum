import { Router } from "express";
import { Transcribe } from "../configs/TransciptionModel.Config";
import { GenerateTranscript } from "../controllers/transcripts.controller";

const router = Router();


router.post("/transcribe", GenerateTranscript)


export default router;