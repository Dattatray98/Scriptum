import { motion } from "framer-motion"
import { useState } from "react"
import { GiSplitCross } from "react-icons/gi"
import { FcGoogle } from "react-icons/fc";
import WaveformIllustration from "../WaveformIllustration";
import { useAuth } from "../../hooks/useAuth";

const SignUp: React.FC<any> = ({ setLoginOpen, LoginOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [IsSignUP, setIsSignUP] = useState<boolean>(false);
  const { handleSignUp, handleLogin } = useAuth();

  const handleSignSwitch = () => {
    setIsSignUP(!IsSignUP);
  };


  return (
    <div className={`fixed border h-full w-full flex justify-center items-center z-40  inset-0 bg-black/20 `}>
      <motion.div
        initial={{ scale: 0.50, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.50, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`border border-white/50 shadow-2xl w-[100vh] h-[60vh] relative  rounded-4xl bg-gray-950  ${LoginOpen ? "scale-100" : ""}`}
      >

        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-pink-300 rounded-full blur-[70px] opacity-30"></div>
        <div className="absolute top-3 left-[30vh] w-[450px] h-[450px] bg-blue-900 blur-[170px] rounded-full  opacity-40"></div>
        <div className=" border absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-300 rounded-full blur-[140px] opacity-40"></div>

        <div className=" absolute right-5 top-5 flex justify-end z-60">
          <GiSplitCross onClick={() => setLoginOpen(!LoginOpen)} className="h-5 w-5 text-red-500 cursor-pointer" />
        </div>
        <div className="w-full h-[91%] rounded-b-4xl flex relative p-5">
          <div className="w-[50%] h-full rounded-bl-4xl z-55 ">
            {!IsSignUP ? (
              <div className="flex flex-col h-full z-55 items-center justify-center p-4 gap-8 mb-6">

                <div className="flex flex-col gap-5">
                  <div className="border w-[35vh] h-10 rounded-xl shadow-sm border-gray-200 bg-white">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email" className="h-full w-full rounded-xl outline-none px-3 font-medium" required />
                  </div>
                  <div className="border w-[35vh] h-10 rounded-xl shadow-sm border-gray-200 bg-white">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Your Password" className="h-full w-full rounded-xl outline-none px-3 font-medium" required />
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <button className="py-2 px-8 border border-gray-200 shadow-sm rounded-2xl cursor-pointer bg-blue-100 font-medium" onClick={() => handleLogin(email, password)}>Login</button>
                  <p className="text-center text-gray-600 font-medium">Or</p>
                  <div className="flex gap-5 items-center">
                    <p className="font-medium text-gray-600">Continue With</p>
                    <button className="font-medium py-2 px-8 border rounded-xl shadow-sm border-gray-200 bg-white flex items-center text-gray-700 cursor-pointer"><FcGoogle />oogle</button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <p className="font-medium text-gray-600">Don't have an Account?</p>
                  <p className="font-medium text-blue-500 hover:text-blue-700 cursor-pointer transition-all duration-300" onClick={handleSignSwitch}>Create New.</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full rounded-br-4xl">
                <WaveformIllustration />
              </div>
            )}

          </div>
          <div className="
                  absolute 
                  top-7
                  left-[50%]
                  h-[55vh]
                  border-l-2 border-blue-800 
                  mask-[linear-gradient(to_bottom,transparent,white_30%,white_70%,transparent)]
                  "
          ></div>

          <div className="w-[50%] h-full rounded-bl-4xl z-55 ">
            {IsSignUP ? (
              <div className="flex flex-col h-full w-full z-55 items-center justify-center p-4 gap-8 mb-6">
                <div className="flex flex-col gap-5">
                  <div className="border w-[35vh] h-10 rounded-xl shadow-sm border-gray-200 bg-white">
                    <input type="email" placeholder="Enter Your Email" className="h-full w-full rounded-xl outline-none px-3 font-medium" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="border w-[35vh] h-10 rounded-xl shadow-sm border-gray-200 bg-white">
                    <input type="password" placeholder="Enter Your Password" className="h-full w-full rounded-xl outline-none px-3 font-medium" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <button className="py-2 px-8 border border-gray-200 shadow-sm rounded-2xl cursor-pointer bg-blue-100 font-medium" onClick={() => handleSignUp(email, password)}>Sign Up</button>
                  <p className="text-center text-gray-600 font-medium">Or</p>
                  <div className="flex gap-5 items-center">
                    <p className="font-medium text-gray-600">Continue With</p>
                    <button className="font-medium py-2 px-8 border rounded-xl shadow-sm border-gray-200 bg-white flex items-center text-gray-700 cursor-pointer"><FcGoogle />oogle</button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <p className="font-medium text-gray-600">Already have an Account?</p>
                  <p className="font-medium text-blue-500 hover:text-blue-700 cursor-pointer transition-all duration-300" onClick={handleSignSwitch}>Login.</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full rounded-br-4xl">
                <WaveformIllustration IsSignUP={IsSignUP} />
              </div>
            )}
          </div>

        </div>
      </motion.div>
    </div>
  )
}

export default SignUp
