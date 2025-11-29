import React from 'react'
import { RiAiGenerateText } from 'react-icons/ri'
import { useDownloadSRT } from '../../hooks/useDownloadSRT'
const TransNav = [
    { id: 1, label: "Download" }
]

const TranscriptTab: React.FC<any> = ({ srtFile, Transcript }) => {

    const { DownloadSRT } = useDownloadSRT(srtFile)

    return (
        <div className={`w-full h-full`}>
            <div className=" border border-gray-200 shadow-sm rounded-xl bg-gray-900 w-full h-15 flex items-center justify-between px-5 mb-2">
                <div className="flex items-center gap-2 ">
                    <RiAiGenerateText className="w-6 h-6 text-gray-200" />
                    <p className="text-lg font-medium text-gray-200">Transcription Completed.</p>
                </div>

                <div>
                    {TransNav.map((item: any) => (
                        <button
                            onClick={DownloadSRT}
                            key={item.id} className="px-5 py-2 shadow-sm bg-blue-200 rounded-xl font-medium cursor-pointer hover:shadow-md transition-all duration-300">{item.label}</button>
                    ))}
                </div>
            </div>
            <div className=" h-[92.5%] border border-gray-200 shadow-sm rounded-xl transition-all duration-700 bg-white p-5">
                <div className={`overflow-y-auto scrollbar-hidden  py-2 px-5 ${Transcript ? "border-y-2 border-gray-300 rounded-2xl" : ""}`}>
                    <p className="text-lg font-medium text-gray-700">{Transcript}</p>
                </div>
            </div>
        </div>
    )
}

export default TranscriptTab
