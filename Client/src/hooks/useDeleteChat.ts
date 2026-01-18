import { useState } from "react"
import { useAxios } from "./useAxios";

export const useDeleteChat = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [chat, setChat] = useState<string | null>(null);
    const api = useAxios();


    const DeleteChat = async (trans_id: any) => {
        try {
            setLoading(true);

            const response = await api.delete(`/delete/chat/${trans_id}`)

            setChat(response.data.response.title)
            console.log(response.data.response.title)
        } catch (err) {
            console.log(err)
            setError("some error is occured")
        } finally {
            setLoading(false)
        }
    }

    return { DeleteChat, loading, error, chat }
}