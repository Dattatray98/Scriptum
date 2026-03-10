import { useState } from "react";
import { useAxios } from "./useAxios"

export const useUpdateChatTitle = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const api = useAxios();


    const updateChatTitle = async (trans_id: string, data: string) => {
        try {
            setLoading(true);

            const response = await api.patch(`/update/chat/${trans_id}/title`, {
                title: data
            });

            console.log(response.data)

        } catch (err) {
            console.log(err);
            setError("got some error");

        } finally {
            setLoading(false);
        }
    }


    return { updateChatTitle, loading, error }
}


export const useUpdateTranscript = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const api = useAxios();


    const updateTranscript = async (trans_id: string | null, seg_id: string, new_segment: string | null) => {
        try {
            setLoading(true);

            const response = await api.patch(`/update/chat/segment/${trans_id}/${seg_id}`, {
                new_segment: new_segment
            });

            return response.data

        } catch (err) {
            console.log(err);
            setError("got some error");
        } finally {
            setLoading(false);
        }
    }

    return { updateTranscript, loading, error }
}