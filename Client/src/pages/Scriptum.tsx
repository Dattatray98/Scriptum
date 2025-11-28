import { useState } from "react";
import { WiStars } from "react-icons/wi";
import { useFetchTranscript } from "../hooks/useFetchTranscript";
import Footer from "../components/Footer";
import { LuSparkles } from "react-icons/lu";
import { RiAiGenerateText } from "react-icons/ri";

const data = [
    { id: 1, label: "File Upload" },
    { id: 2, label: "Youtube Link" }
]

const FeatureData = [
    { id: 1, label: "Real-Time Processing" },
    { id: 2, label: "99% Accuracy" },
    { id: 3, label: "Supports Multiple Languages" }
]
const TransNav = [
    { id: 1, label: "Download" }
]

const Scriptum = () => {
    const [file, setFile] = useState<File | null>(null);
    const { Transcript, Loading, transcriptfetching } = useFetchTranscript(file);
    const [TransMode, setTransMode] = useState(1);
    

    const handleTransMode = (Id: number) => {
        setTransMode(Id)
    }

    const handlefileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files?.[0] || null)
    }

    return (
        <div>
            <div className="flex flex-col gap-2 bg-gray-50">
                <div className="h-screen relative bg-linear-to-br from-[#f0e9fd] via-[#eef3ff] to-[#f3e6ff] transition-all duration-1000 flex ">
                    <div className="relative pl-[14vh] flex flex-col gap-2  justify-center h-full w-[50%] ">

                        {/* Blurry blob 1 */}
                        <div className=" border absolute top-10 left-10 w-[400px] h-[400px] bg-purple-300 rounded-full blur-3xl opacity-40"></div>

                        {/* Blurry blob 2 */}

                        {/* Blurry blob 3 */}
                        <div className="absolute bottom-[10%] left-[50%] w-[300px] h-[300px] bg-pink-300 rounded-full blur-2xl opacity-30"></div>


                        <div className="w-58 z-10 bg-white rounded-3xl border border-purple-200 shadow-sm px-3 py-1.5 flex items-center gap-2 mb-5">
                            <WiStars className="text-purple-600 h-7 w-7 animate-pulse" />
                            <button className=" bg-linear-to-br bg-clip-text text-transparent from-purple-600 via-blue-700 to-blue-800 font-medium">Powered by NeuroEon</button>
                        </div>


                        <div className="text-6xl lg:text-7xl z-10 tracking-tight leading-tight space-x-2 flex flex-col gap-3">
                            <h1 >Your Voice, Perfectly </h1>
                            <h1 className="bg-linear-to-r bg-clip-text text-transparent from-purple-600 via-blue-600 to-indigo-600">Transcribed</h1>
                            <div className="flex items-center gap-6">
                                <h1>with </h1>
                                <span className="text-shadow-2xs bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    ScripTum
                                </span>
                            </div>
                        </div>


                        <p className="text-xl font-normal text-gray-600 mt-4 z-11">Transform your audio and video content into accurate, professional transcripts with enterprise-grade AI. Supports real-time processing, and industry-leading accuracy that saves hours of manual work.</p>

                        <div className="flex gap-5 mt-10 ml-1">
                            {FeatureData.map((item) => (
                                <button className="z-10 px-5 bg-white shadow-sm py-2 rounded-xl ">{item.label}</button>
                            ))}
                        </div>

                        <div className="mt-10">
                            <p className="text-gray-500 text-center text-sm">Trusted by creaters and teams</p>
                        </div>
                    </div>

                    <div
                        className="
                                absolute 
                                top-[19%] left-[52%]
                                h-[64vh]
                                border-l-2 border-purple-200 
                                bg-linear-to-b from-transparent via-purple-500 to-transparent 
                                shadow-sm shadow-purple-200

                                mask-[linear-gradient(to_bottom,transparent,white_30%,white_70%,transparent)]
                            "
                    ></div>


                    <div className=" relative p-10 w-[50%] h-full flex justify-center items-center  ">
                        <div className="border absolute top-10 left-[-90px] w-[450px] h-[450px] bg-blue-900 rounded-full blur-[150px] opacity-40"></div>

                        <div className=" h-[60vh] w-[85%] flex flex-col items-center gap-10 ml-10 p-10 border border-gray-200 shadow-[0_0_100px_-25px_rgba(168,85,247,0.6)] rounded-xl bg-white z-10 hover:scale-[1.01] transition-all duration-500 ">

                            <div className="flex gap-5 border border-gray-200 shadow-sm px-5 py-1 rounded-xl w-[95%]">
                                {data.map((item) => (
                                    <div
                                        onClick={() => handleTransMode(item.id)}
                                        className=""
                                    >
                                        <button className={`bg-linear-to-br from-purple-200 via-indigo-200 to-blue-200 py-2 border px-5 w-60 font-medium transition-all duration-500 cursor-pointer border-gray-200 shadow-sm rounded-xl   ${TransMode === item.id ? "text-white bg-linear-to-br from-purple-600 via-indigo-600 to-blue-600" : ""}`}>{item.label}</button>

                                    </div>
                                ))}
                            </div>

                            <p className="text-lg font-medium text-gray-500">Upload Your Content</p>
                            <div className="flex flex-col justify-center items-center gap-10">
                                <div className="h-[20vh] w-[60vh] border-2 border-dashed border-gray-300 hover:border-purple-400 shadow-sm hover:shadow-md rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-all duration-300 px-5 flex-col gap-5"
                                    onClick={() => document.getElementById('fileInput')?.click()}
                                >
                                    <p className="text-gray-600 text-center font-medium text-xl">{file?.name || "Drag & drop your file here"}</p>
                                    <button className="py-2 px-5 border border-gray-200 shadow-sm rounded-xl cursor-pointer bg-blue-100 "> Click to Browser Files</button>
                                </div>

                                <input
                                    id="fileInput"
                                    type="file"
                                    className="hidden"
                                    onChange={handlefileChange}
                                />

                                <button className="px-4 py-2 flex gap-2 items-center border border-gray-200 shadow-sm rounded-xl bg-linear-to-br from-purple-600 via-indigo-600 to-blue-600 hover:scale-[1.01] transition-all duration-500 cursor-pointer font-medium text-white"
                                    onClick={transcriptfetching}
                                    disabled={Loading}
                                >
                                    <LuSparkles className="w-5 h-5 animate-pulse" />
                                    {Loading ? "Transcribing...." : "Generate Transcript"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* {Transcript && ( */}
                    <div className="py-5 h-screen">
                        <div className=" h-full transition-all duration-700 border border-gray-200 shadow-md bg-linear-to-br from-[#f0e9fd] via-[#eef3ff] to-[#f3e6ff] rounded-xl p-5">
                            <div className=" border border-gray-200 shadow-sm rounded-xl bg-white w-full h-15 flex items-center justify-between px-5 mb-5">
                                <div className="flex items-center gap-2 ">
                                    <RiAiGenerateText className="w-6 h-6 text-gray-500" />
                                    <p className="text-lg font-medium text-gray-500">Transcription Completed.</p>
                                </div>

                                <div>
                                    {TransNav.map((item) => (
                                        <button key={item.id} className="px-5 py-2 shadow-sm bg-blue-200 rounded-xl font-medium cursor-pointer hover:shadow-md transition-all duration-300">{item.label}</button>
                                    ))}
                                </div>
                            </div>
                            <div className="max-h-screen  overflow-y-auto scrollbar-hidden border-y-2 border-gray-300 rounded-2xl py-2 px-5">
                                <p className="text-lg font-medium text-gray-700">{Transcript}</p>
                            </div>
                        </div>
                    </div>

                {/* )} */}

            </div>
            <Footer />
        </div>
    )
}

export default Scriptum
