import { useEffect, useState } from "react";
import { useAxios } from "./useAxios";


export const useTransChat = () => {
    const [transChats, setTransChats] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<null | string>(null);
    const api = useAxios();
    useEffect(() => {
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
        FetchTransChats()
    }, [transChats])

    return { transChats, loading, error }
}

export const useTransHistory = (trans_id: any, editsegText : any) => {
    const [transHistory, setTransHistory] = useState<any>(null);
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

            } catch (err) {
                console.log(err);
                setError("Failed to fetch transcript history");
            } finally {
                setLoading(false);
            }
        }

        FetchTransHistory()
    }, [trans_id, editsegText])

    return { transHistory, loading, error }
}