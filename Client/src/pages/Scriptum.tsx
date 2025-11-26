import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

const Scriptum = () => {
    return (
        <div className="">
            <Navbar />
            <div className="flex gap-2 p-2 h-[93.2vh]">
                <Sidebar />
                <div className="border border-gray-200 shadow-sm rounded-xl w-[75%]">

                </div>
            </div>
        </div>
    )
}

export default Scriptum
