import { LuRedo2, LuUndo2 } from "react-icons/lu"
import React from "react";

const ContentTab: React.FC<any> = ({ videoName, DownloadSRT, historyContent}) => {
    
    return (
        <div className="relative h-full">
            
            <div className="border-b border-gray-300 h-15 rounded-t-xl flex items-center justify-between px-8">
                <div>
                    <p className="text-lg font-medium text-gray-800">{videoName}</p>
                </div>

                <div className="flex items-center gap-8">
                    <div className="flex gap-3 items-center">
                        <LuUndo2 className="w-5 h-5 cursor-pointer hover:text-gray-600 transition-all duration-300" />
                        <LuRedo2 className="w-5 h-5 cursor-pointer hover:text-gray-600 transition-all duration-300" />
                    </div>

                    <div className="flex items-center gap-6">
                        <button className=" bg-gray-200 shadow-sm px-5 py-1 text-gray-800 rounded-sm font-medium cursor-pointer">Share</button>
                        <button className="border shadow-sm px-4 py-1 bg-[#0D7281] text-white rounded-sm font-medium cursor-pointer" onClick={DownloadSRT}>Export</button>
                    </div>
                </div>
            </div>
            <div className="flex h-[93.4%] justify-between py-2">

                <div className="p-5 flex flex-col gap-8 w-[70%]  overflow-y-scroll scrollbar-hidden" >
                    {Array.isArray(historyContent) && historyContent.map((item: any) => (
                        <div key={item.id} className="flex flex-col gap-4 items-start justify-center py-3 border-t border-gray-200 ">
                            <p className="font-medium text-lg text-gray-800 border border-gray-300 shadow-sm bg-gray-100 px-2 ml-1.5 rounded-md ">{item.start} - {item.end}</p>
                            <p className="text-[19px] text-gray-800  px-2 rounded-md ">{item.text}</p>
                        </div>
                    ))}
                </div>

                <div className="border-l border-gray-300 h-full w-[30%] p-5">
                    <div className="border border-gray-300 shadow-sm h-60 rounded-xl">
                    </div>
                    <div className="px-2 py-3 border-b border-gray-300">

                        {/* <p>{contentdata.title}</p> */}
                        <p>This is the video description</p>
                        <p>Source of video : uploaded</p>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default ContentTab