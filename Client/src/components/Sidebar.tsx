import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { motion } from "framer-motion";
import { PiBrain } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { FaPlus, FaRegUserCircle } from "react-icons/fa";
import { GrHistory } from "react-icons/gr";

const history = [
    {
        id: 1, label: "hellow", content: [
            {
                content_id: 1,
                timestamp: "00:00",
                content_str: "Okay, speech to text cloud is"
            },
            {
                content_id: 1,
                timestamp: "[00:00:00,000]",
                content_str: "Okay, speech to text cloud is"
            },
            {
                content_id: 1,
                timestamp: "[00:00:00,000]",
                content_str: "Okay, speech to text cloud is"
            },
            {
                content_id: 1,
                timestamp: "[00:00:00,000]",
                content_str: "Okay, speech to text cloud is"
            },
            {
                content_id: 1,
                timestamp: "[00:00:00,000]",
                content_str: "Okay, speech to text cloud is"
            }
        ]

    }
]



const Sidebar: React.FC<any> = ({ IsSidebarOpen, handleSidebar, handletranscribeTab, setHistorycontent, NewTranscribeTab }) => {
    const [OpenHistory, setOpenHistory] = useState<boolean>(true);

    const handleHistoryOpen = () => {
        setOpenHistory(!OpenHistory);
    }

    const handlehistorycontent = (id: any, content: any) => {
        handletranscribeTab(false)
        setHistorycontent({ id, content })
    }

    return (
        <div className={`z-50 h-full flex flex-col gap-5 border  bg-white border-white/10 shadow-sm rounded-xl transition-all duration-1000 ${IsSidebarOpen === false ? "p-2.5 w-[60px]" : "w-[25%] p-3 "}`}>
            <div className="flex justify-between border-b border-gray-200 pb-3">
                <div className={`transition-all flex gap-2 items-center ${IsSidebarOpen ? "flex" : "hidden"}`}>
                    <PiBrain className="text-[#016b7b] text-3xl mt-1" />
                    <h1 className="text-shadow-2xs text-2xl font-bold  ">
                        ScripTum
                    </h1>
                </div>

                <div className={IsSidebarOpen ? "" : "w-full flex justify-start pl-1"} >
                    {IsSidebarOpen ? (
                        <RxCross2 onClick={handleSidebar} className="h-6 w-6 cursor-pointer" />
                    ) :
                        (
                            <PiBrain onClick={handleSidebar} className="text-[#016b7b] text-3xl mt-1 cursor-pointer" />
                        )}
                </div>
            </div>

            <div >
                <button className={`p-2 w-full shadow-sm ${NewTranscribeTab === true ? " bg-blue-200" : "bg-gray-300"} rounded-xl cursor-pointer font-medium transition-all duration-500 flex items-center ${IsSidebarOpen ? "justify-center" : "justify-start"}`}
                    onClick={() => {
                        handletranscribeTab(true);
                    }}
                >{IsSidebarOpen ? "New Script" : <FaPlus className="h-6 w-6 transition-all" />}</button>
            </div>

            {IsSidebarOpen ? (


                <div
                    className={`grow flex-col p-2 `} >
                    <h1 className=" font-medium text-gray-600 border-b border-gray-200 pb-1 px-1 cursor-pointer " onClick={handleHistoryOpen} >{IsSidebarOpen ? "History" : ""}</h1>
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: OpenHistory ? "auto" : 0, opacity: OpenHistory ? 1 : 0 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className={` overflow-hidden py-3 flex flex-col gap-2 items-start`}
                    >
                        {history.map((item) => (
                            <button key={item.id} className={`border border-gray-200 shadow-sm rounded-xl  py-2 px-3 font-medium text-sm w-full text-start cursor-pointer transition-all duration-500 `} onClick={() => handlehistorycontent(item.id, item.content)}>{item.label}</button>
                        ))}
                    </motion.div>
                </div>
            ) : (
                <div className=" flex justify-start ml-2">
                    <GrHistory  className="h-6 w-6 cursor-pointer" onClick={handleSidebar}/>
                </div>
            )

            }



            <div className={`border-t border-gray-300 h-auto py-5 gap-5 items-center justify-start  ${IsSidebarOpen === false ? " flex-col flex items-start ml-2" : " opacity-100 flex justify-between"}`}>
                <IoSettingsOutline className="w-6 h-6 cursor-pointer" />
                <FaRegUserCircle className="w-6 h-6 cursor-pointer" />
            </div>

        </div>
    )
}

export default Sidebar



//  from-[#016b7b] via-[#032f8e]  to-[#8d06b6]  -->  logo colors, style --> bg-linear-to-rbg-clip-text text-transparent