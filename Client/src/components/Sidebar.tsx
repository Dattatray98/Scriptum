import { useState } from "react";
import { GiSplitCross } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


const history = [
    { id: 1, label: "hellow" },
    { id: 2, label: "kay" },
    { id: 3, label: "bolo" }
]


const Sidebar: React.FC<any> = ({ IsSidebarOpen, handleSidebar }) => {
    const [OpenHistory, setOpenHistory] = useState<boolean>(true);

    const handleHistoryOpen = () => {
        setOpenHistory(!OpenHistory);
    }

    const navigate = useNavigate();

    return (
        <div className={`h-full flex flex-col gap-5 border bg-black border-gray-800 shadow-sm rounded-xl transition-all duration-1000 ${IsSidebarOpen === false ? "p-4 w-[60px]" : "w-[25%] p-3 "}`}>
            <div className="flex justify-end" >
                <GiSplitCross onClick={handleSidebar}  className="h-5 w-5 cursor-pointer"/>
            </div>

            <button className={`py-2 px-4 border border-gray-800 shadow-sm focus:bg-blue-300 bg-gray-800 rounded-xl cursor-pointer font-medium ${IsSidebarOpen === false ? "hidden" : ""}`}
                onClick={() => navigate("/scriptum")}
            >New Transcript</button>

            <div
                className={`grow flex-col p-2 ${IsSidebarOpen === false ? " opacity-0 " : "flex opacity-100"}`} >
                <h1 className=" font-medium text-gray-600 border-b border-gray-800 pb-1 px-1 cursor-pointer " onClick={handleHistoryOpen} >Transcription History</h1>
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: OpenHistory ? "auto" : 0, opacity: OpenHistory ? 1 : 0 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className={` overflow-hidden py-3 flex flex-col gap-2 items-start`}
                >

                    {history.map((item) => (
                        <button key={item.id} className="border border-gray-200 shadow-sm rounded-xl bg-gray-700 focus:bg-blue-200 py-2 px-3 font-medium text-sm w-full text-start cursor-pointer transition-all duration-500 ">{item.label}</button>
                    ))}

                </motion.div>
            </div>

            <div className={`border-t border-gray-300  h-15 items-center justify-start  ${IsSidebarOpen === false ? " opacity-0" : " opacity-100 flex"}`}>
                <div className='flex gap-1'>
                    <h1 className="text-shadow-2xs text-2xl font-bold bg-linear-to-r from-[#016b7b] via-[#032f8e]  to-[#8d06b6] bg-clip-text text-transparent">
                        ScripTum
                    </h1>
                </div>
            </div>

        </div>
    )
}

export default Sidebar
