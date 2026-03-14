import { Router } from "express";
import { GenerateTranscript, GenerateYoutubeTranscript } from "../controllers/transcripts";
import { Auth } from "../middlewares/Auth.middleware";
import { DeleteTransChat, EditChatName, EditTranscript, transChats, TranscriptHisotry } from "../controllers/transHistory";

const router = Router();


router.post("/transcribe", Auth, GenerateTranscript);
router.post("/transcribe/Yturl", Auth, GenerateYoutubeTranscript);
router.get("/get/transChat", Auth, transChats);
router.get("/get/transcript", TranscriptHisotry);
router.delete("/delete/chat/:trans_id", DeleteTransChat);
router.patch("/update/chat/:trans_id/title", EditChatName);
router.patch("/update/chat/segment/:trans_id/:seg_id", EditTranscript);

export default router;