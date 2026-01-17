import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { WiStars } from "react-icons/wi";
import Flowtingparticals from "../components/Flowtingparticals";
import SignUp from "../components/Auth/SignUp";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


const card_data = [
    { id: 1, time: "00:00", label: "Welcom to ScripTum, where cutting-edge AI meets..." },
    { id: 2, time: "00:24", label: "The transcription engine leverages state-of-the-art..." },
    { id: 3, time: "00:48", label: "Our intelligent system automatically detects speaker..." }
]

const Feature_Data = [
    { id: 1, heading: "Fast AI Transcription", subheading: "Process hours of audio in minutes with our lightning-fast AI engine." },
    { id: 2, heading: "99% Accuracy", subheading: "Industry-leading accuracy that captures every word with precision." },
    { id: 3, heading: "Multi-Language Support", subheading: "Transcribe in 50+ languages with native-level understanding." },
]

const edit_data = [
    { id: 1, time: "00:00", label: "Welcome to ScripTum, where cutting-edge AI meets effortless transcription. Our advanced language models have processed your audio with remarkable accuracy, capturing every word, pause, and nuance to deliver a transcript that reads naturally and professionally." },
    { id: 2, time: "00:24", label: "The transcription engine leverages state-of-the-art deep learning architecture trained on millions of hours of diverse audio content. This ensures exceptional performance even in challenging conditions." },
    { id: 3, time: "00:48", label: "Our intelligent system automatically detects speaker changes, adds natural punctuation, and structures the text for optimal readability." }
]

const bottom_text = [
    { id: 1, label: "COMPANY" },
    { id: 2, label: "STARTUP" },
    { id: 3, label: "BRAND" },
    { id: 4, label: "AGENCY" },
    { id: 5, label: "STUDIO" }
]


const Landing = () => {
    const [count, setCount] = useState(0);
    const [LoginOpen, setLoginOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const words = ["Faster", "Accurate", "Automatic"];
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prev) => (prev + 1) % words.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const OpenLoginWindow = () => {
        if (auth?.user) {
            navigate('/workspace')
        } else {
            setLoginOpen(true);
        }
    }


    useEffect(() => {
        if (LoginOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [LoginOpen]);

    return (
        <>
            {/* <div className="bg-[url('/transcriptbg.jpg')] bg-cover h-screen "> */}
            <div className="bg-black h-screen ">
                <div className="w-full flex justify-center">
                    <Navbar LoginOpen={LoginOpen} OpenLoginWindow={OpenLoginWindow} />
                </div>
                <AnimatePresence>
                    {LoginOpen && (
                        <SignUp setLoginOpen={setLoginOpen} LoginOpen={LoginOpen} />
                    )}
                </AnimatePresence>

                <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-pink-200 rounded-full blur-[140px] opacity-30"></div>
                <div className="absolute top-3 left-[35vh] w-[450px] h-[450px] bg-blue-300 blur-[250px] rounded-full  opacity-40"></div>

                <div className="flex items-center h-full z-11 relative">
                    <div className="h-full w-[60%] flex flex-col justify-center pl-[8vh]">
                        <div className="w-58 z-10 bg-transparent rounded-3xl border border-purple-200 shadow-sm px-3 py-1.5 flex items-center gap-2 mb-10">
                            <WiStars className="text-purple-300 h-7 w-7 animate-pulse" />
                            <button className=" bg-linear-to-br bg-clip-text text-transparent from-purple-200 via-blue-100 to-blue-400 font-medium">Powered by NeuroEon</button>
                        </div>
                        <Flowtingparticals />
                        <div className="flex flex-col gap-3 z-11">
                            <h1 className="text-shadow-2xs text-white text-6xl font-normal flex gap-3 justify-start">Transcription Made
                                <motion.div className=" inline-block overflow-hidden w-auto  h-16 items-center">
                                    <AnimatePresence mode="wait">
                                        <motion.span
                                            key={words[count]}
                                            initial={{ opacity: 0, y: 60 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -60 }}
                                            transition={{ duration: 1, ease: "easeInOut" }}
                                            className="inline-block text-white"
                                        >
                                            {words[count]}
                                        </motion.span>
                                    </AnimatePresence>
                                </motion.div>
                            </h1>
                            <div className="text-shadow-2xs text-6xl text-white mt-3 font-normal flex h-20 gap-3 z-11">with<h1 className="bg-linear-to-r from-cyan-700 via-cyan-600 to-cyan-500 bg-clip-text text-transparent">ScripTum</h1></div>
                            <p className="text-shadow-2xs text-lg text-gray-300 font-medium mt-2">Turn your audio and video into clear, reliable text in seconds — with ScripTum.</p>
                        </div>

                        <div className=" flex gap-5 mt-15 z-11">
                            <button className="py-3 px-[8vh] font-medium text-lg text-black rounded-xl shadow-md bg-white cursor-pointer hover:scale-[0.90] transition-all duration-500 " onClick={OpenLoginWindow}>Get Started</button>

                            <button className="py-3 px-[8vh] font-medium text-lg text-white rounded-xl shadow-md border border-white cursor-pointer hover:scale-[0.90] transition-all duration-500">Learn More</button>
                        </div>
                    </div>

                    <div style={{ perspective: '1400px' }} className="mr-[10vh] animate-pulse hover:animate-none">
                        <div className="h-75 w-[68vh] border border-gray-700 backdrop-blur-3xl bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.12),0_8px_24px_rgba(0,0,0,0.08)] rounded-4xl bg-g p-8 hover:scale-[1.02] transition-all duration-500 transform-[rotateY(-18deg)_rotateX(7deg)] hover:transform-[rotateY(0deg)_rotateX(0deg)] "
                            style={{
                                transformStyle: 'preserve-3d'
                            }}>
                            <div className="flex gap-5 items-center border-b border-gray-200 pb-3">
                                <div className="flex gap-1.5 items-center">
                                    <div className="bg-red-500 h-3 w-3 rounded-full"></div>
                                    <div className="bg-yellow-500 h-3 w-3 rounded-full"></div>
                                    <div className="bg-green-500 h-3 w-3 rounded-full"></div>
                                </div>
                                <h1 className="font-medium text-sm text-gray-500">Transcript</h1>
                            </div>

                            <div className="flex flex-col gap-5 py-10">
                                {card_data.map((items) => (
                                    <div key={items.id} className="">
                                        <p className="text-purple-300 text-sm font-medium">{items.time}</p>
                                        <p className="text-sm font-medium text-gray-500">{items.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className=" relative">
                <Flowtingparticals />
                <div className=" px-10 py-[5vh] bg-black relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            initial={{ scale: 0.90 }}
                            whileInView={{ scale: 1 }}
                            exit={{ scale: 0.90 }}
                            transition={{ duration: 0.8, ease: "easeInOut", type: "tween", stiffness: 120, damping: 20 }}
                            className=" w-full p-[10vh] flex gap-8">
                            {Feature_Data.map((items) => (
                                <div
                                    key={items.id} className="h-[30vh] w-[50vh] rounded-4xl bg-gray-950 border border-gray-800  transition-all duration-500 hover:shadow-[0_20px_80px_-28px_rgba(141,167,251,0.6)] hover:-translate-y-2 p-8">
                                    <h1 className="font-normal text-white text-3xl">{items.heading}</h1>
                                    <p className="text-lg text-gray-500">{items.subheading}</p>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className="w-full flex flex-col items-center py-[10vh] bg-black ">
                    <motion.div
                        initial={{ scale: 0.80 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="w-[49.5%] flex flex-col items-center justify-center">
                        <h1 className="text-6xl text-center flex gap-3 text-gray-300">The Transcript Editor <p className="bg-linear-to-r from-indigo-400 via-cyan-300 to-blue-100 bg-clip-text text-transparent">You'll Love</p></h1>
                        <p className="text-2xl text-center text-gray-500 mt-3">A beautiful, intuitive interface designed for professionals who demand precision.</p>
                    </motion.div>
                    <AnimatePresence>

                        <motion.div
                            initial={{ scale: 0.80 }}
                            whileInView={{ scale: 1 }}
                            exit={{ scale: 0.80 }}
                            transition={{ duration: 0.7, ease: "easeInOut", }}
                            className="h-screen w-full px-[15vh] py-[10vh] ">
                            <div className="hover:-translate-y-6 border border-gray-800 backdrop-blur-3xl shadow-[0_0_80px_-24px_rgba(141,167,251,0.6)] h-[70vh] w-auto rounded-4xl relative transition-all duration-500  bg-gray-950 cursor-default">


                                <div className="flex justify-between items-center z-11 border-b border-gray-800 rounded-t-4xl p-8">
                                    <div className="flex gap-2 items-center">
                                        <div className="bg-gray-500 h-4 w-4 rounded-full"></div>
                                        <div className="bg-gray-500 h-4 w-4 rounded-full"></div>
                                        <div className="bg-gray-500 h-4 w-4 rounded-full"></div>
                                    </div>
                                    <div className="flex gap-8 items-center">
                                        <p className="py-2 px-4 border border-gray-600 text-gray-400 rounded-xl shadow-sm">Transcript</p>
                                        <p className="py-2 px-4 border border-gray-600 text-gray-400 rounded-xl shadow-sm">Analysis</p>
                                        <p className="py-2 px-4 border border-gray-600 text-gray-400 rounded-xl shadow-sm">Export</p>
                                    </div>
                                    <div className="flex gap-5">
                                        <button className="py-2 px-5 border border-gray-600 text-white shadow-sm rounded-md">Share</button>
                                        <button className="py-2 px-5 shadow-sm rounded-md bg-[#0D7281] text-white">Export</button>
                                    </div>
                                </div>
                                <div className="flex w-full h-[83.5%] z-11">
                                    <div className="w-[85%] h-full p-10 flex flex-col gap-10 ">
                                        {edit_data.map((items) => (
                                            <div key={items.id} className="flex flex-col gap-2">
                                                <p className="py-0.5 px-2 bg-purple-100/60 text-center text-sm text-purple-500 font-medium w-13 rounded-md">{items.time}</p>
                                                <p className="text-lg font-normal text-gray-500">{items.label}</p>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="z-55">
                        <div className="w-full flex justify-center gap-10">
                            {bottom_text.map((items) => (
                                <p key={items.id} className="text-2xl font-normal text-gray-800 hover:text-gray-400 transition-all duration-500 cursor-default">{items.label}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Landing;