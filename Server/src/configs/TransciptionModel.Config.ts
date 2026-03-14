import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const Transcription_model_API = process.env.TRANSCRIPTION_MODEL_API!

if (!Transcription_model_API) {
    console.log("model api is missing")
}

export const Transcribe = async (url:string) => {
    console.log("transcribe url : ",url);

    try {

        const response = await axios.post(`${Transcription_model_API}`,
            {
                media_url:url
            },
            {
                headers:{
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data;

    } catch (error) {
        console.log(error)
    }
}