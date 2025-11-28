import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const Landing = () => {
    const [count, setCount] = useState(0);
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
                <div className="flex h-[93vh]">
                    <div className="h-full w-[60%] flex flex-col  justify-center pl-[8vh]">
                        <h1 className="text-shadow-2xs text-6xl text-center font-medium flex">Transcription Made
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
                        <h1 className="text-shadow-2xs text-7xl mt-3 ml-2 font-medium">with ScripTum</h1>
                        <p className="text-shadow-2xs text-lg text-gray-600 font-medium mt-2 ml-2">Turn your audio and video into clear, reliable text in seconds — with ScripTum.</p>
                    </div>
                </div>
            </div >

            <Footer />
        </>
    )
}

export default Landing;