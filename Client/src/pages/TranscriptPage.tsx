
import { useLocation } from 'react-router-dom'
import TranscriptTab from '../components/Tabs/TranscriptTab'
import Sidebar from '../components/Sidebar';
import { useState } from 'react';

const TranscriptPage = () => {

    const [IsSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

    const location = useLocation();
    const { text, srtFile, videoName } = location.state || {}

    const handleSidebar = () => {
        setIsSidebarOpen(!IsSidebarOpen);
    }

    return (
        <div className='flex h-screen p-5 gap-2 bg-black'>
            <Sidebar IsSidebarOpen={IsSidebarOpen} handleSidebar={handleSidebar} />
            <TranscriptTab Transcript={text} srtFile={srtFile} videoName={videoName} />
        </div>
    )
}

export default TranscriptPage
