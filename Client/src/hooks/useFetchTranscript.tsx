import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAxios } from "./useAxios";
import { useTransChat } from "./useFetchChatHistory";

export const useFetchTranscript = () => {
    const [Loading, setLoading] = useState<boolean>(false);
    const [Transcript, setTranscript] = useState<[
        { id: number, start: number, end: number, text: string }
    ]>();
    const [srtFile, setSrtFile] = useState("");
    const navigate = useNavigate();
    const [videoName, setVideoName] = useState<string>()
    const api = useAxios();
    const { FetchTransChats } = useTransChat();

    const transcriptfetching = async (file: File | null) => {

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
            FetchTransChats();

        }

        return videoName
    }

    return { Transcript, Loading, srtFile, transcriptfetching, videoName };
};




export const useFetchYoutubeTranscript = () => {
    const [Loading, setLoading] = useState<boolean>(false);
    // const [Error, setError] = useState<string>('');
    const [Transcript, setTranscript] = useState<[
        { id: number, start: number, end: number, text: string }
    ]>();
    const [srtFile, setSrtFile] = useState("");

    const [videoName, setVideoName] = useState<string>()

    const api = useAxios();

    const fetchTranscript = async (url: string) => {
        try {
            setLoading(true);
            const response = await api.post(`/transcribe/Yturl?Yt_url=${url}`);

            setTranscript(response.data.response);
            setSrtFile(response.data.srtFile)
            setVideoName(response.data.title);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }


    return { Transcript, Loading, srtFile, videoName, fetchTranscript }
}