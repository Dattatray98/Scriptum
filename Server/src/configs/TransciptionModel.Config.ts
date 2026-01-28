import axios from "axios";
import dotenv from "dotenv";
import FormData from "form-data";

dotenv.config();

const Transcription_model_API = process.env.TRANSCRIPTION_MODEL_API

// if (!Transcription_model_API) {
//     console.log("model api is missing")
// }

export const Transcribe = async (url: String) => {
    console.log("transcribe url : ",url);

    try {

        const response = await axios.post("http://127.0.0.1:8000/scriptum",
            {
                media_url:url
            },
            {
                headers:{
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data.result;

    } catch (error) {

    }
}