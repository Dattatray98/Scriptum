import { google } from "googleapis";
import dotenv from 'dotenv';
dotenv.config();

const YOUTUBE_DATA_API_KEY = process.env.YOUTUBE_DATA_API_KEY;

if (!YOUTUBE_DATA_API_KEY) {
    console.log("youtube data api key missing");
}

export const YouTube = google.youtube({
    version: "v3",
    auth: YOUTUBE_DATA_API_KEY
});
