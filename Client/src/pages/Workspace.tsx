import { WiStars } from "react-icons/wi";
import Sidebar from "../components/Sidebar"
import { useState } from "react";
import { useFetchTranscript } from "../hooks/useFetchTranscript";
import { useDownloadFile } from "../hooks/useDownloadFile";
import ContentTab from "../components/ContentTab";
import ProfileWindow from "../components/ProfileWindow";
import { useTransChat } from "../hooks/useFetchChatHistory";
import type { TranscriptDataTypes } from "../types/transcript.types";
import { useDeleteChat } from "../hooks/useDeleteChat";
import WindowComponent from "../components/WindowComponent";

const Workspace = () => {

  // States
  const [IsSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [NewTranscribeTab, setNewTranscribeTab] = useState<boolean>(true);
  const [File, setFile] = useState<File | null>(null);
  const [historyContent, setHistorycontent] = useState<TranscriptDataTypes>();
  const [OpenProfile, setOpenProfile] = useState<boolean>(false);
  const [isWindow, setIsWindow] = useState<boolean>(false);
  const [deleteChat, setDeleteChat] = useState<string | null>(null);


  // Custom Hooks 
  const { Loading, transcriptfetching, srtFile, videoName } = useFetchTranscript(File);
  const { DownloadSRT } = useDownloadFile(srtFile, videoName);
  const { transChats } = useTransChat();


  // functions 

  // Sidebar opening function
  const handleSidebar = () => {
    setIsSidebarOpen(!IsSidebarOpen);
  }

  // transcription tab handling function
  const handletranscribeTab = (data: boolean) => {
    setNewTranscribeTab(data)
  }

  // file handling function
  const handlefileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  }


  return (
    <div className={`h-screen flex p-2 bg-gray-200 ${IsSidebarOpen ? "gap-2" : ""}`}>
      <Sidebar
        IsSidebarOpen={IsSidebarOpen}
        handleSidebar={handleSidebar}
        handletranscribeTab={handletranscribeTab}
        NewTranscribeTab={NewTranscribeTab}
        setIsWindow={setIsWindow}
        setOpenProfile={setOpenProfile}
        OpenProfile={OpenProfile}
        transChats={transChats ?? []}
        setHistorycontent={setHistorycontent}
        setDeleteChat={setDeleteChat}
      />

      <div className=" border absolute top-10 left-10 w-[400px] h-[400px] bg-purple-400 rounded-full blur-[180px] opacity-40 z-0"></div>
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] blur-[200px] bg-blue-500  rounded-full  opacity-40"></div>

      <div className={`w-full relative border-white/20 shadow-sm bg-white z-50 transition-all duration-500 ${IsSidebarOpen ? "rounded-xl border" : " border-l-0 rounded-r-xl "} `}>
        {NewTranscribeTab === true ? (
          <div className=" w-full h-full flex items-center justify-center">
            <div className="flex flex-col  gap-10 justify-center items-start w-[55%] h-full px-8">

              <div className="w-58 bg-transparent rounded-3xl border border-purple-200 shadow-sm px-3 py-1.5 flex items-center gap-2 ">
                <WiStars className="text-blue-500 h-7 w-7 animate-pulse" />
                <button className=" bg-linear-to-br bg-clip-text text-transparent from-blue-500 via-blue-500 to-cyan-400 font-medium">Powered by NeuroEon</button>
              </div>

              <div className="text-6xl lg:text-7xl tracking-tight leading-tight space-x-2 flex flex-col gap-3">
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

                <div className="border-2 border-dashed border-[#8ABBC2] hover:border-[#0D7281] transition-all duration-300 w-[80%] h-[25vh] rounded-xl flex flex-col justify-center items-center gap-5" onClick={() => document.getElementById('fileInput')?.click()}>
                  <p className="text-xl text-center font-medium text-gray-700">{File ? `${File.name}` : "Drag & Drop or Browse Your File Here"}</p>
                  <button className="px-4 py-2 bg-gray-300 border border-gray-50 shadow-sm rounded-xl font-medium text-lg cursor-pointer">Click to Browse File</button>
                </div>
                <input
                  id="fileInput"
                  type="file"
                  className="hidden"
                  onChange={handlefileChange}
                />

                <div>
                  <button className="border px-5 py-2 rounded-xl font-medium text-lg bg-linear-to-r from-blue-600 via-cyan-600 to-cyan-700 cursor-pointer text-white hover:scale-[0.98] transition-all duration-300 "
                    onClick={transcriptfetching}
                    disabled={Loading}
                  >{Loading ? "Transcribing" : "Generate Transcript"}</button>
                </div>
              </div>
            </div>

          </div>

        ) : (
          <ContentTab historyContent={historyContent?.original_transcript ?? []} contentdata={historyContent} videoName={videoName} DownloadSRT={DownloadSRT} />
        )}

        {isWindow && (
          <div className="h-full w-full absolute top-0 flex justify-center rounded-xl items-center backdrop-blur-md">
            <WindowComponent
              deleteChat={deleteChat}
              setIsWindow={setIsWindow}
              handletranscribeTab={handletranscribeTab}
              OpenProfile={OpenProfile}
              setOpenProfile={setOpenProfile}
              setDeleteChat={setDeleteChat}
            />
          </div>
        )}

      </div>
    </div>
  )
}

export default Workspace