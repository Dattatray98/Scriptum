import Sidebar from "../components/Sidebar"
import { useState } from "react";

const Workspace = () => {

  const [IsSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const handleSidebar = () => {
    setIsSidebarOpen(!IsSidebarOpen);
  }

  return (
    <div className="h-screen flex p-3 gap-2">
      <Sidebar IsSidebarOpen={IsSidebarOpen} handleSidebar={handleSidebar} />
      <div className="w-full border border-gray-200 shadow-sm rounded-xl"></div>
    </div>
  )
}

export default Workspace
