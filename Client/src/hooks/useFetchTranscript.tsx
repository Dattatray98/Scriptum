import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAxios } from "./useAxios";

export const useFetchTranscript = (file: File | null,) => {
    const [Loading, setLoading] = useState<boolean>(false);
    const [Transcript, setTranscript] = useState<[
        { id: number, start: number, end: number, text: string }
    ]>();
    const [srtFile, setSrtFile] = useState("");
    const navigate = useNavigate();
    const [videoName, setVideoName] = useState<any>()


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

        setVideoName(clean_videoName)

        const token = localStorage.getItem("token")
        if (!token) {
            console.log("user is not authenticated")
        }

        formData.append("filename", clean_videoName)
        const api = useAxios();

        try {
            setLoading(true);
            const response = await api.post(`/transcribe`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: token ? `Bearer ${token}` : "",
                    }
                }
            );

            setTranscript(response.data.result);
            setSrtFile(response.data.srt_file);
            console.log(response.data.result);

            navigate("/workspace", {
                state: {
                    text: response.data.result,
                    srtFile: response.data.srt_file,
                    videoName: clean_videoName
                }
            })

            return videoName;
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }

        return videoName
    }

    return { Transcript, Loading, srtFile, transcriptfetching, videoName };
};