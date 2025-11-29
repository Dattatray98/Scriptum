import { GiSplitCross } from "react-icons/gi";
import { useNavigate } from "react-router-dom";



const Sidebar: React.FC<any> = ({ IsSidebarOpen, handleSidebar }) => {

    const navigate = useNavigate();

    return (
        <div className={`h-full flex flex-col gap-5 border bg-white border-gray-200 shadow-sm rounded-xl transition-all duration-1000 ${IsSidebarOpen === false ? "p-4 w-[3%]" : "w-[25%] p-3 "}`}>
            <div className="flex justify-end" >
                <GiSplitCross onClick={handleSidebar} className={`${IsSidebarOpen === false ? "h-5 w-5" : ""}`} />
            </div>

            <button className={`py-2 px-4 border border-gray-200 shadow-sm focus-within:bg-blue-300 bg-gray-200 rounded-xl cursor-pointer font-medium ${IsSidebarOpen === false ? "hidden" : ""}`}
            onClick={()=>navigate("/scriptum")}
            >New Transcript</button>

            <div className={` h-[85%] flex-col p-2 ${IsSidebarOpen === false ? " hidden " : "flex"}`}>
                <h1 className=" font-medium text-gray-600 border-b pb-1 px-1">Transcription History</h1>
                <div>

                </div>
            </div>

        </div>
    )
}

export default Sidebar
