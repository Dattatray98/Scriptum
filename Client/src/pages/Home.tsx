import axios from "axios";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
const Home = () => {
    const [file, setFile] = useState<File | null>(null);
    const [trancecript, setTranscript] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [count, setCount] = useState(0);

    const handlefileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files?.[0] || null);
    };



    const handlesumit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            alert("Please select a file first!");
            return
        };

        const formData = new FormData();
        formData.append("file", file);

        setIsLoading(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_SCRIPTUM_ROUTE}`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            setTranscript(response.data.result);

            console.log("upload successfull");
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false);
        }
    }

    const words = ["Faster", "Accurate", "Automatic"];

    useEffect(() => {
        const Interval = setInterval(() => {
            setCount((prev) => (prev + 1) % words.length);
        }, 2000);

        return () => clearInterval(Interval);
    }, [])

    return (
        <>
            <div className="bg-[url('/heroback.jpg')] bg-cover h-screen ">
                <Navbar />
                <div className="flex h-[60%]">
                    <div className="h-full w-[60%] flex flex-col justify-center pl-[8vh] pt-[10vh]">
                        <h1 className="text-6xl text-center font-medium flex">Transcription Made
                            <motion.div className="inline-block">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={words[count]}
                                        initial={{ opacity: 0, y: 60 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -60 }}
                                        transition={{ duration: 1.2, ease: "easeInOut" }}
                                        className="px-3"
                                    >
                                        {words[count]}
                                    </motion.span>
                                </AnimatePresence>
                            </motion.div>
                        </h1>
                        <h1 className="text-7xl mt-3 ml-2 font-medium">with ScripTum</h1>
                        <p className="text-lg text-gray-600 font-medium mt-2 ml-2">Turn your audio and video into clear, reliable text in seconds — with ScripTum.</p>
                    </div>


                    <div className="p-[10vh] w-[40%] flex items-center">
                        <form onSubmit={handlesumit} className=" p-2 flex flex-col gap-5 items-center justify-center">
                            <div className="h-10 w-[60vh] rounded-xl border bg-blue-50 hover:bg-blue-200 border-gray-200 shadow-sm flex items-center transition-all duration-300">
                                <input type="file" onChange={handlefileChange} className="h-full w-full rounded-xl py-1.5 px-3 font-medium text-gray-700" />
                            </div>
                            <button type="submit" className="shadow-sm hover:shadow-md bg-blue-50 hover:bg-blue-300 py-2 px-8 font-medium  rounded-xl transition-all duration-300">Submit</button>
                        </form>
                    </div>

                </div>
                <div className="p-10">
                    {isLoading && <div className=" spinner"></div>}
                    <p className="text-lg font-medium">{trancecript}</p>
                </div>
            </div >
        </>
    )
}

export default Home
