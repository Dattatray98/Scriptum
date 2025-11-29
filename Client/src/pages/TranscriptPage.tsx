
import { useLocation } from 'react-router-dom'
import TranscriptTab from '../components/Tabs/TranscriptTab'
import Sidebar from '../components/Sidebar';
import { useState } from 'react';

const TranscriptPage = () => {

    const [IsSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

    const location = useLocation();
    const { text, srtFile } = location.state || {}

    const handleSidebar = () => {
        setIsSidebarOpen(!IsSidebarOpen);
    }

    return (
        <div className='flex h-screen p-5 gap-2 bg-linear-to-br from-[#f0e9fd] via-[#eef3ff] to-[#f3e6ff]'>
            <Sidebar IsSidebarOpen={IsSidebarOpen} handleSidebar={handleSidebar} />
            <TranscriptTab Transcript={text} srtFile={srtFile} />
        </div>
    )
}

export default TranscriptPage
