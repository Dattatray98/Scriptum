import axios from "axios";
import { useState } from "react";

export const useDownloadSRT = (filename: string) => {
    const [loadingsrt, setLoading] = useState(false);

    const DownloadSRT = async () => {
        try {
            setLoading(true);

            const srtName = `${filename}.srt`;

            console.log("filename : ",filename)
            const response = await axios.get(
                `http://localhost:8000/download/${filename}`,
                { responseType: "blob" }
            );

            const url = window.URL.createObjectURL(response.data);
            const link = document.createElement("a");
            link.href = url;
            link.download = srtName; // FIXED
            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error("SRT download failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return { DownloadSRT, loadingsrt };
};
