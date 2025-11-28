import axios from "axios";
import { useState } from "react"

export const useFetchTranscript = (file: File | null) => {
    const [Loading, setLoading] = useState<boolean>(false);
    const [Transcript, setTranscript] = useState("");

    const transcriptfetching = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            alert("Please select file first");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            setLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_SCRIPTUM_ROUTE}`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            setTranscript(response.data.result);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return { Transcript, Loading, transcriptfetching };
};