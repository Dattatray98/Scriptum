import { useState } from "react";
import { useAxios } from "./useAxios"

export const useUpdateChatTitle = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const api = useAxios();


    const updateChatTitle = async (trans_id: any, data: any) => {
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


    const updateTranscript = async (trans_id: any, seg_id: any, new_segment:any) => {
        try {
            setLoading(true);

            const response = await api.patch(`/update/chat/segment/${trans_id}/${seg_id}`,{
                new_segment:new_segment
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