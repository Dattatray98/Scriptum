import axios from "axios";
import dotenv from "dotenv";
import FormData from "form-data";

dotenv.config();

const Transcription_model_API = process.env.TRANSCRIPTION_MODEL_API

// if (!Transcription_model_API) {
//     console.log("model api is missing")
// }

export const Transcribe = async (file: Express.Multer.File) => {

    const formData = new FormData();

    formData.append("file", file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
    });


    try {

        const response = await axios.post("http://127.0.0.1:8000/scriptum",
            formData,
            {
                headers: formData.getHeaders(),
            }
        );

        console.log(response.data.result);
        return response.data.result;

    } catch (error) {

    }
}