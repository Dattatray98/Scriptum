import React, { useContext, useEffect, useState } from "react";
import { PiBrain } from "react-icons/pi";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const navabaritem = [
  { id: 1, label: "Features" },
  { id: 2, label: "Pricing" },
  { id: 3, label: "Docs" },
  { id: 4, label: "Workspace", link: "/workspace" },
];



const Navbar: React.FC<any> = ({ LoginOpen, OpenLoginWindow }) => {
  const [IsScroll, setIsScroll] = useState(false);
  const Auth = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScroll(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    Auth?.logout();
    // any extra cleanup (close menus, navigate) goes here
  };

  return (
    <nav
      className={`z-50 backdrop-blur-3xl border-gray-400 flex justify-between items-center px-4 transition-all duration-750 ${location.pathname === "/" ? IsScroll
        ? "fixed top-0 w-full h-18 border-b border-gray-700"
        : "absolute top-10 h-15 w-[90%] border shadow-[0_20px_60px_rgba(0,0,0,0.12),0_8px_24px_rgba(0,0,0,0.08)] rounded-3xl"
        : " w-full border-b h-17 "
        }  ${LoginOpen ? "scale-0" : ""}`}

    >
      <div className="flex items-center gap-1">
        <PiBrain className="text-[#016b7b] text-3xl mt-1" />
        <h1 className="text-shadow-2xs text-2xl font-bold bg-white bg-clip-text text-transparent">
          ScripTum
        </h1>
      </div>

      <div className="flex gap-9">
        {navabaritem.map((items) => (
          <p key={items.id} onClick={() => navigate(items.link ? items.link : "")} className="font-medium text-gray-300 cursor-pointer">
            {items.label}
          </p>
        ))}
      </div>

      <div>
        {!Auth?.user ? (
          <button
            className="px-5 py-2 border border-gray-200 shadow-sm rounded-xl font-medium bg-white cursor-pointer hover:scale-95 transition-all duration-300"
            onClick={OpenLoginWindow}
          >
            Start Free Trial
          </button>
        ) : (
          <div className="flex items-center gap-3">
            {/* optional: show user name or avatar */}
            <div className="text-sm text-gray-200">{Auth.user?.email ?? "User"}</div>
            <button
              className="px-4 py-2 border border-gray-200 shadow-sm rounded-xl font-medium bg-white cursor-pointer hover:scale-95 transition-all duration-300"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
