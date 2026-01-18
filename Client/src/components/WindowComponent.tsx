import type React from "react"
import { useDeleteChat } from "../hooks/useDeleteChat"
import ProfileWindow from "./ProfileWindow";

const WindowComponent: React.FC<any> = ({ deleteChat, setDeleteChat, setIsWindow, handletranscribeTab, OpenProfile, setOpenProfile }) => {
    const { DeleteChat } = useDeleteChat();

    const handleDeleteChat = (deleteChat: any) => {
        DeleteChat(deleteChat);
        setIsWindow(false);
        handletranscribeTab(true);
    }

    const CancelDeleteChat = ()=>{
        setDeleteChat(null)
        setIsWindow(false)
    }

    const closeProfile = ()=>{
        setOpenProfile(false);
        setIsWindow(false)
    }

    return (
        <div className="absolute rounded-xl flex justify-center items-center h-full w-full bg-transparent backdrop-blur-lg">
            {OpenProfile && (
                <ProfileWindow closeProfile={closeProfile} />
            )}


            {deleteChat && (
                <div className="h-[25vh] w-[55vh] border border-gray-200 shadow-md p-5 flex flex-col justify-between rounded-xl bg-white ">
                    <div className="flex-col flex gap-5">
                        <h1 className="text-xl font-bold">Delete chat?</h1>
                        <p className="text-xl font-medium text-gray-600">This action will delete the generated transcript permanently.</p>
                    </div>

                    <div className="flex justify-end gap-5">
                        <button className="px-5 py-2 border border-gray-300 shadow-sm bg-gray-200 font-medium rounded-xl cursor-pointer" onClick={CancelDeleteChat}>Cancel</button>
                        <button className="px-5 py-2 border border-gray-300 shadow-sm bg-red-600 text-white font-medium  rounded-xl cursor-pointer" onClick={() => handleDeleteChat(deleteChat)}>Delete</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default WindowComponent