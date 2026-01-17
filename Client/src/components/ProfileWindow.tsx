import type React from "react"
import { RxCross2 } from "react-icons/rx"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

const ProfileWindow: React.FC<any> = ({ closeProfile }) => {
    const auth = useContext(AuthContext);
    const user = auth?.user;
    
    return (
        <div className="border border-gray-300 shadow-md rounded-2xl bg-white z-50 h-[50%] w-[50%] p-5">
            <div className="flex justify-between">
                <h1>Profile</h1>
                <RxCross2 className="h-6 w-6 cursor-pointer" onClick={closeProfile} />
            </div>
            <div className="p-8 flex gap-5">
                <div className="border h-20 w-20 rounded-full"></div>
                <div className="p-2 space-y-2">
                    <p>username :{user._id}</p>
                    <p>Name : Jojewar Dattatray</p>
                </div>
            </div>
            <div className="px-10 space-y-1">
                <p>Email : {user.email}</p>
                <p>Mobile : 9823495758</p>
            </div>
        </div>
    )
}

export default ProfileWindow