import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export const useFetchTranscript = (file: File | null) => {
    const [Loading, setLoading] = useState<boolean>(false);
    const [Transcript, setTranscript] = useState("");
    const [srtFile, setSrtFile] = useState("");
    const navigate = useNavigate();

    const transcriptfetching = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            alert("Please select file first");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        const clean_videoName = file.name
            .normalize("NFKD")                   // normalize emoji/accents
            .replace(/[^\w\s-]/g, "")            // remove emojis + special chars
            .replace(/\s+/g, "_")                // replace spaces with underscore
            .slice(0, 50);

        console.log(clean_videoName);

        try {
            setLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_SCRIPTUM_ROUTE}`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            setTranscript(response.data.result);
            setSrtFile(response.data.srt_file)

            console.log(response.data.srt_file)
            navigate("/transcript", {
                state: {
                    text: response.data.result,
                    srtFile: response.data.srt_file,
                    videoName: clean_videoName
                }
            })
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return { Transcript, Loading, srtFile, transcriptfetching };
};