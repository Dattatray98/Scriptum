import { FaGraduationCap } from "react-icons/fa"

const Navbar = () => {
  return (
    <div className=" h-15 w-full border-b-2 border-gray-200 flex items-center px-4">
      <div className='flex gap-1'>
        <FaGraduationCap className="text-[#540178] text-3xl" />
        <h1 className="text-shadow-2xs text-2xl font-bold bg-linear-to-r from-[#016b7b] via-[#032f8e]  to-[#8d06b6] bg-clip-text text-transparent">
          ScripTum
        </h1>
      </div>
    </div>
  )
}

export default Navbar
