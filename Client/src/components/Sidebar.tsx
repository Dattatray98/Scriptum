import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PiBrain } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { FaBars, FaPlus } from "react-icons/fa";


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
        <div className={`h-full flex flex-col gap-5 border  bg-white border-gray-200 shadow-sm rounded-xl transition-all duration-1000 ${IsSidebarOpen === false ? "p-2.5 w-[60px]" : "w-[25%] p-3 "}`}>
            <div className="flex justify-between border-b border-gray-200 pb-3">
                <div className={`transition-all flex gap-2 items-center ${IsSidebarOpen ? "flex" : "hidden"}`}>
                    <PiBrain className="text-[#016b7b] text-3xl mt-1" />
                    <h1 className="text-shadow-2xs text-2xl font-bold text-black ">
                        ScripTum
                    </h1>
                </div>

                <div className={IsSidebarOpen ? "" : "w-full flex justify-center"} >
                    {IsSidebarOpen ? (
                        <RxCross2 onClick={handleSidebar} className="h-6 w-6 cursor-pointer" />
                    ) :
                        (
                            <FaBars onClick={handleSidebar} className="h-6 w-6 cursor-pointer" />
                        )}
                </div>
            </div>

            <div >
                <button className={`p-2 border w-full border-gray-200 shadow-sm focus:bg-blue-300 bg-gray-200 rounded-xl cursor-pointer font-medium transition-all duration-500 flex items-center justify-center`}
                    onClick={() => navigate("/scriptum")}
                >{IsSidebarOpen ? "New Script" : <FaPlus className="h-6 w-6" />}</button>
            </div>

            {IsSidebarOpen &&
                <div
                    className={`grow flex-col p-2 `} >
                    <h1 className=" font-medium text-gray-600 border-b border-gray-200 pb-1 px-1 cursor-pointer " onClick={handleHistoryOpen} >{IsSidebarOpen ? "History" : ""}</h1>
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: OpenHistory ? "auto" : 0, opacity: OpenHistory ? 1 : 0 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className={` overflow-hidden py-3 flex flex-col gap-2 items-start`}
                    >
                        {history.map((item) => (
                            <button key={item.id} className="border border-gray-200 shadow-sm rounded-xl bg-gray-200 focus:bg-blue-200 py-2 px-3 font-medium text-sm w-full text-start cursor-pointer transition-all duration-500 ">{item.label}</button>
                        ))}
                    </motion.div>
                </div>

            }


            <div className={`border-t border-gray-300  h-15 items-center justify-start  ${IsSidebarOpen === false ? " opacity-0" : " opacity-100 flex justify-between gap-5"}`}>

                <div>
                    {IsSidebarOpen ? <IoSettingsOutline /> : ""}

                </div>
            </div>

        </div>
    )
}

export default Sidebar



//  from-[#016b7b] via-[#032f8e]  to-[#8d06b6]  -->  logo colors, style --> bg-linear-to-rbg-clip-text text-transparent