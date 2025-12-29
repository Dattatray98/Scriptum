import { WiStars } from "react-icons/wi";
import Sidebar from "../components/Sidebar"
import { useState } from "react";
import { LuRedo2, LuUndo2 } from "react-icons/lu";
import { TbVersions } from "react-icons/tb";

const Workspace = () => {


  const [IsSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [NewTranscribeTab, setNewTranscribeTab] = useState<boolean>(true);
  const [Historycontent, setHistorycontent] = useState<{ id: number, content: [] }>();


  const handleSidebar = () => {
    setIsSidebarOpen(!IsSidebarOpen);
  }

  const handletranscribeTab = (data: boolean) => {
    setNewTranscribeTab(data)
  }


  return (
    <div className="h-screen flex p-3 gap-2 bg-gray-200">
      <Sidebar IsSidebarOpen={IsSidebarOpen} handleSidebar={handleSidebar} handletranscribeTab={handletranscribeTab} setHistorycontent={setHistorycontent} NewTranscribeTab={NewTranscribeTab} />

      <div className=" border absolute top-10 left-10 w-[400px] h-[400px] bg-purple-400 rounded-full blur-[180px] opacity-40 z-0"></div>
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] blur-[200px] bg-blue-500  rounded-full  opacity-40"></div>

      <div className="w-full  border border-white/10 shadow-sm rounded-xl bg-white z-50 ">
        {NewTranscribeTab === true ? (
          <div className=" w-full h-full flex items-center justify-center">
            <div className="flex flex-col  gap-10 justify-center items-start w-[55%] h-full px-8">

              <div className="w-58 z-10 bg-transparent rounded-3xl border border-purple-200 shadow-sm px-3 py-1.5 flex items-center gap-2 ">
                <WiStars className="text-blue-500 h-7 w-7 animate-pulse" />
                <button className=" bg-linear-to-br bg-clip-text text-transparent from-blue-500 via-blue-500 to-cyan-400 font-medium">Powered by NeuroEon</button>
              </div>

              <div className="text-6xl lg:text-7xl z-10 tracking-tight leading-tight space-x-2 flex flex-col gap-3">
                <h1 >Your Voice, Perfectly </h1>
                <h1 className="bg-linear-to-r bg-clip-text text-transparent from-cyan-600 via-blue-400 to-cyan-300">Transcribed</h1>
                <div className="flex items-center gap-6">
                  <h1>with </h1>
                  <span className="text-shadow-2xs bg-linear-to-r from-cyan-700 via-cyan-600 to-cyan-500 bg-clip-text text-transparent">
                    ScripTum
                  </span>
                </div>
              </div>
              <p className="text-center text-lg text-gray-500 transition-all duration-300">Transform your audio and video content into accurate, professional transcripts with enterprise-grade AI. Supports real-time processing, and industry-leading5accuracy that saves hours of manual work.</p>

              <div className="flex gap-5">
                <p className="border border-gray-300 shadow-sm font-medium text-gray-700 px-2 py-1 rounded-xl">Support Multiple Languages</p>
                <p className="border border-gray-300 shadow-sm font-medium text-gray-700 px-2 py-1 rounded-xl">Real-Time Processing</p>
                <p className="border border-gray-300 shadow-sm font-medium text-gray-700 px-2 py-1 rounded-xl">99% Accuracy</p>
              </div>
            </div>


            <div className=" h-full w-[45%] px-15 flex items-center">
              <div className="border border-gray-200 shadow-sm bg-gray-50 rounded-2xl py-10  flex flex-col gap-8 justify-center items-center cursor-default w-full">
                <div className="px-5 flex w-[90%] justify-between">
                  <button className="border border-gray-50 shadow-sm bg-[#0D7281] text-white font-medium px-5 py-2 rounded-xl w-[47%] cursor-pointer ">File Upload</button>
                  <button className="border border-gray-50 shadow-sm bg-gray-300 font-medium px-5 py-2 rounded-xl w-[47%] cursor-pointer ">YouTube Link</button>
                </div>
                <p className="font-medium text-xl text-gray-700">Upload Your Content</p>

                <div className="border-2 border-dashed border-[#8ABBC2] hover:border-[#0D7281] transition-all duration-300 w-[80%] h-[25vh] rounded-xl flex flex-col justify-center items-center gap-5">
                  <p className="text-xl text-center font-medium text-gray-700">Drag & Drop or Browse Your File Here</p>
                  <button className="px-4 py-2 bg-gray-300 border border-gray-50 shadow-sm rounded-xl font-medium text-lg cursor-pointer">Click to Browse File</button>
                </div>

                <div>
                  <button className="border px-5 py-2 rounded-xl font-medium text-lg bg-linear-to-r from-blue-600 via-cyan-600 to-cyan-700 cursor-pointer text-white hover:scale-[0.98] transition-all duration-300 ">Generate Transcript</button>
                </div>
              </div>
            </div>

          </div>

        ) : (
          <div className=" h-full">
            <div className="border-b border-gray-300 h-15 rounded-t-xl flex items-center justify-between px-8">
              <div>
                <p className="text-lg font-medium text-gray-800">This the title of the transcription </p>
              </div>

              <div className="flex items-center gap-8">
              <div className="flex gap-3 items-center">
                <LuUndo2 className="w-5 h-5 cursor-pointer hover:text-gray-600 transition-all duration-300" />
                <LuRedo2 className="w-5 h-5 cursor-pointer hover:text-gray-600 transition-all duration-300" />
              </div>

              <div className="flex items-center gap-6">
                <button className=" bg-gray-200 shadow-sm px-5 py-1 text-gray-800 rounded-sm font-medium cursor-pointer">Share</button>
                <button className="border shadow-sm px-4 py-1 bg-[#0D7281] text-white rounded-sm font-medium cursor-pointer">Export</button>
              </div>
              </div>
            </div>
            <div className="flex h-[93.4%] justify-between">
              <div className="p-5 flex flex-col gap-8 w-[70%]">
                {Historycontent?.content.map((item: any) => (
                  <div className="flex flex-col gap-2 items-start p-2">
                    <p className="font-medium text-lg border border-gray-300 shadow-sm bg-gray-100 px-2 rounded-md ">{item.timestamp}</p>
                    <p className="font-medium text-lg ">{item.content_str}</p>
                  </div>
                ))}
              </div>

              <div className="border-l border-gray-300 h-full w-[30%] p-5">
                <div className="border border-gray-300 shadow-sm h-60 rounded-xl">
                </div>
                <div className="px-2 py-3 border-b border-gray-300">
                  <p>This the video content</p>
                  <p>This is the video description</p>
                  <p>Source of video : uploaded</p>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  )
}

export default Workspace
