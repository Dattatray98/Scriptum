import { useEffect, useState } from "react"
import { PiBrain } from "react-icons/pi";

const navabaritem = [
  { id: 1, label: "Features" },
  { id: 2, label: "Pricing" },
  { id: 3, label: "Docs" },
  { id: 4, label: "Services" }
]

const Navbar = () => {
  const [IsScroll, setIsScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <nav className={`z-50 bg-gray-50  flex justify-between items-center px-4 transition-all duration-500 ${IsScroll === true ? "fixed top-0 w-full h-18" : "absolute top-10 h-15 w-[90%] shadow-[0_20px_60px_rgba(0,0,0,0.12),0_8px_24px_rgba(0,0,0,0.08)] rounded-3xl"}`}>

      <div className='flex items-center gap-1'>
        <PiBrain className="text-[#016b7b] text-3xl mt-1" />
        <h1 className="text-shadow-2xs text-2xl font-bold bg-linear-to-r from-[#016b7b] via-[#032f8e]  to-[#8d06b6] bg-clip-text text-transparent">
          ScripTum
        </h1>
      </div>

      <div className="flex gap-9">
        {navabaritem.map((items) => (
          <p key={items.id} className="font-medium text-gray-500 cursor-pointer">{items.label}</p>
        ))}
      </div>

      <div>
        <button className="px-5 py-2 border border-gray-200 shadow-sm rounded-xl font-medium bg-linear-to-br from-pink-400 via-purple-500 to-purple-900 text-white cursor-pointer">Start Free Trial</button>
      </div>
    </nav>
  )
}

export default Navbar
