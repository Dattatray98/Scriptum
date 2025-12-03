import React, { useState } from 'react'
import { RiAiGenerateText } from 'react-icons/ri'
import { useDownloadFile } from '../../hooks/useDownloadFile'
const Downloadformat = [
    { id: 1, label: "SRT" },
    { id: 2, label: "pdf" }
]

const TranscriptTab: React.FC<any> = ({ srtFile, Transcript, videoName }) => {
    const [formateOpetion, setFormateOpetion] = useState<boolean>(false);

    const { DownloadSRT, DownloadPDF } = useDownloadFile(srtFile, videoName )

    const handleTransFileDownload = (file: string) => {
        if (file == "SRT") {
            DownloadSRT();
        } else if(file == "pdf") {
            DownloadPDF()
        }
    }

    return (
        <div className={`w-full h-full`}>
            <div className=" border border-gray-800 shadow-sm rounded-xl bg-gray-900 w-full h-15 flex items-center justify-between px-5 mb-2">
                <div className="flex items-center gap-2 ">
                    <RiAiGenerateText className="w-6 h-6 text-gray-200" />
                    <p className="text-lg font-medium text-gray-200">Transcription Completed.</p>
                </div>

                <div className=' relative'>
                    <button onClick={() => setFormateOpetion(!formateOpetion)} className="px-5 py-2 shadow-sm bg-blue-200 rounded-xl font-medium cursor-pointer hover:shadow-md transition-all duration-300">Download</button>
                    {formateOpetion === true && (
                        <div className=' absolute right-0 top-12 rounded-xl border border-white bg-gray-700 min-w-30 p-2'>
                            {Downloadformat.map((item) => (
                                <p key={item.id} className='text-white cursor-pointer hover:bg-blue-300 hover:text-black px-3 py-1 rounded-xl font-medium' onClick={() => handleTransFileDownload(item.label)}>{item.label}</p>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className=" h-[92.5%] border border-gray-800 shadow-sm rounded-xl transition-all duration-700 bg-black p-5">
                <div className={`overflow-y-auto scrollbar-hidden max-h-full  py-2 px-5 ${Transcript ? "border-y-2 border-gray-800 rounded-2xl" : ""}`}  >
                    <p className="text-lg font-medium text-gray-100">{Transcript}</p>
                </div>
            </div>
        </div>
    )
}

export default TranscriptTab
