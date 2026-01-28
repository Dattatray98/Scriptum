import { LuRedo2, LuUndo2 } from "react-icons/lu"
import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useUpdateTranscript } from "../hooks/useUpdateData";
import { useTransHistory } from "../hooks/useFetchChatHistory";
// import { useTransHistory } from "../hooks/useFetchChatHistory";

const ContentTab: React.FC<any> = ({ DownloadSRT, chat_id, }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editSeg_Id, setEditSeg_id] = useState<string | null>(null);
    const [editingText, setEditingText] = useState<string | null>(null);


    
    const { updateTranscript } = useUpdateTranscript();
    const { transHistory, videoUrl } = useTransHistory(chat_id, editingText);

    const historyContent = transHistory?.original_transcript ?? []
    const videoName = transHistory?.title



    useEffect(() => {
        setIsEditing(false);
        setEditSeg_id(null);
        setEditingText("");
    }, [chat_id]);

    return (
        <div className="relative h-full">

            <nav className="border-b border-gray-300 h-15 rounded-t-xl flex items-center justify-between px-8">
                <div>
                    <p className="text-lg font-medium text-gray-800">{videoName}</p>
                </div>

                <div className="flex items-center gap-8">
                    <div className="flex gap-3 items-center">
                        <LuUndo2 className="w-5 h-5 cursor-pointer hover:text-gray-600 transition-all duration-300" />
                        <LuRedo2 className="w-5 h-5 cursor-pointer hover:text-gray-600 transition-all duration-300" />
                    </div>


                    <div className="flex items-center gap-6">
                        {isEditing ? (
                            <button className="border border-gray-200 shadow-sm px-4 py-1 text-black rounded-sm font-medium cursor-pointer flex gap-2 justify-center items-center bg-gray-200" onClick={() => {
                                setIsEditing(false);
                            }}>Save</button>
                        ) : (
                            <button className="border border-gray-200 shadow-sm px-4 py-1 text-black rounded-sm font-medium cursor-pointer flex gap-2 justify-center items-center bg-gray-200" onClick={() => {
                                setIsEditing(true);
                            }}><FiEdit className="h-4 w-4 " />Edit</button>
                        )}

                        <button className=" bg-gray-200 shadow-sm px-5 py-1 text-gray-800 rounded-sm font-medium cursor-pointer">Share</button>

                        <button className="border shadow-sm px-4 py-1 bg-[#0D7281] text-white rounded-sm font-medium cursor-pointer" onClick={DownloadSRT}>Export</button>
                    </div>
                </div>
            </nav>


            <div className="flex h-[93.4%] justify-between py-2">

                <div className="p-5 flex flex-col gap-8 w-[70%]  overflow-y-scroll scrollbar-hidden" >
                    {Array.isArray(historyContent) && historyContent.map((item: any) => (
                        <div key={item._id}
                            onClick={() => {
                                if (!isEditing) return;
                                setEditSeg_id(item._id);
                                setEditingText(item.text);
                            }}
                        >
                            {isEditing ? (
                                <div className="flex flex-col gap-4 items-start justify-center py-3 border-t border-gray-200 ">
                                    <p className="font-medium text-lg text-gray-800 border border-gray-300 shadow-sm bg-gray-100 px-2 ml-1.5 rounded-md ">{item.start} - {item.end}</p>

                                    <textarea
                                        className="w-full resize-none outline-none text-[19px] text-gray-800"
                                        rows={1}
                                        value={editSeg_Id === item._id ? editingText : item.text}
                                        onChange={(e) => setEditingText(e.target.value)}
                                        onBlur={() => {
                                            updateTranscript(chat_id, item._id, editingText)
                                        }}

                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                e.currentTarget.blur();
                                            }
                                            if (e.key === 'Escape') {
                                                setEditSeg_id(null);
                                                setIsEditing(false)
                                            }
                                        }}
                                    />
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4 items-start justify-center py-3 border-t border-gray-200 ">
                                    <p className="font-medium text-lg text-gray-800 border border-gray-300 shadow-sm bg-gray-100 px-2 ml-1.5 rounded-md ">{item.start} - {item.end}</p>
                                    <p className="text-[19px] text-gray-800  px-2  ">{item.text}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="border-l border-gray-300 h-full w-[30%] p-5 overflow-y-scroll scrollbar-hidden">
                    <div className="border border-gray-300 shadow-sm rounded-xl p-1">
                        <video className="h-full w-full rounded-xl" src={videoUrl} controls />
                    </div>
                    <div className="px-2 py-3 space-y-1.5 border-b border-gray-300">
                        <p className="font-medium text-lg truncate">Title : {videoName}</p>
                        <p className="text-lg text-gray-700">This is the video description</p>
                        <p className="text-lg text-gray-700">Source : uploaded</p>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default ContentTab