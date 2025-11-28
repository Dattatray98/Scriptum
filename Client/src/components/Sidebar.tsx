import { GiSplitCross } from "react-icons/gi";



const Sidebar: React.FC<any> = ({ IsSidebarOpen, handleSidebar }) => {


    return (
        <div className={`h-full border border-gray-200 shadow-sm rounded-xl bg-[#EAEEFA] transition-all duration-1000 ${IsSidebarOpen === false ? "p-4 w-[3%]" : "w-[20%] p-5 "}`}>
            <div className="flex justify-end" >
                <GiSplitCross onClick={handleSidebar} className={`${IsSidebarOpen === false ? "h-5 w-5" : ""}`} />
            </div>

        </div>
    )
}

export default Sidebar
