/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAxios } from "./useAxios";

export const useTransChat = () => {
    const [transChats, setTransChats] = useState<{ Chats: { trans_id: string; title: string }[] } | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<null | string>(null);
    const api = useAxios();


    const FetchTransChats = async () => {
        try {
            setLoading(true)
            const response = await api.get('/get/transChat');

            setTransChats(response.data);

        } catch (err) {
            console.log(err);
            setError("Failed to fetch transcript chats");
        } finally {
            setLoading(false);
        }

    }

    return { transChats, loading, error, FetchTransChats }
}

export const useTransHistory = (trans_id: string | null, editsegText: string | null) => {
    const [transHistory, setTransHistory] = useState<{ title: string; original_transcript: { _id: string; start: number; end: number; text: string }[] } | null>(null);
    const [videoUrl, setVideoUrl] = useState();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<null | string>(null);
    const api = useAxios();

    useEffect(() => {
        if (!trans_id) return;
        const FetchTransHistory = async () => {
            try {
                setLoading(true);
                const response = await api.get('/get/transcript', {
                    params: {
                        trans_id: trans_id
                    }
                });

                setTransHistory(response.data);
                setVideoUrl(response.data.url);

            } catch (err) {
                console.log(err);
                setError("Failed to fetch transcript history");
            } finally {
                setLoading(false);
            }
        }

        FetchTransHistory()
    }, [trans_id, editsegText])

    return { transHistory, videoUrl, loading, error }
}