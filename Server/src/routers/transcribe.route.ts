import { Router } from "express";
import { Transcribe } from "../configs/TransciptionModel.Config";
import { GenerateTranscript } from "../controllers/transcripts.controller";
import { Auth } from "../middlewares/Auth.middleware";
import { DeleteTransChat, transChats, TranscriptHisotry } from "../controllers/transHistory.controller";

const router = Router();


router.post("/transcribe",Auth, GenerateTranscript);
router.get("/get/transChat",Auth, transChats);
router.get("/get/transcript", TranscriptHisotry);
router.delete("/delete/chat/:trans_id", DeleteTransChat);

export default router;