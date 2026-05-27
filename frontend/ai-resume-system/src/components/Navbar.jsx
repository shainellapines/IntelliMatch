import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  LogOut,
  BrainCircuit
} from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <div
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-2 rounded-xl shadow-lg shadow-purple-900/40">
            <BrainCircuit size={22} className="text-white" />
          </div>

          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              IntelliMatch
            </h1>

            <p className="text-xs text-gray-400">
              AI Resume Intelligence
            </p>
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="flex items-center gap-3">

          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-purple-600/20 border border-white/10 transition"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <button
            onClick={() => navigate("/upload")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-indigo-600/20 border border-white/10 transition"
          >
            <Upload size={18} />
            Upload
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 transition"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>
      </div>
    </div>
  );
}