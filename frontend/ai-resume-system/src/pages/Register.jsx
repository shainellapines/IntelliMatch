import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

import {
  BrainCircuit,
  User,
  Mail,
  Lock,
  UserPlus,
} from "lucide-react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const submit = async () => {
    try {
      await API.post("/auth/register", form);

      alert("Registered successfully!");

      navigate("/");

    } catch (err) {
      console.error(err);

      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#09090f] flex items-center justify-center px-6">

      {/* BACKGROUND GLOW */}
      <div className="absolute w-[500px] h-[500px] bg-indigo-700/20 blur-3xl rounded-full" />

      <div className="relative w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl">

        {/* LOGO */}
        <div className="flex flex-col items-center mb-8">

          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-2xl shadow-lg shadow-purple-900/30">
            <BrainCircuit size={36} className="text-white" />
          </div>

          <h1 className="text-4xl font-bold mt-4 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Create Account
          </h1>

          <p className="text-gray-400 mt-2 text-center">
            Start your AI-powered resume journey
          </p>
        </div>

        {/* NAME */}
        <div className="mb-4">
          <label className="text-sm text-gray-400">
            Full Name
          </label>

          <div className="mt-2 flex items-center bg-[#11111a] border border-white/10 rounded-2xl px-4 py-3">
            <User size={18} className="text-gray-500" />

            <input
              type="text"
              placeholder="Enter your full name"
              className="bg-transparent outline-none text-white ml-3 w-full"
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />
          </div>
        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="text-sm text-gray-400">
            Email Address
          </label>

          <div className="mt-2 flex items-center bg-[#11111a] border border-white/10 rounded-2xl px-4 py-3">
            <Mail size={18} className="text-gray-500" />

            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent outline-none text-white ml-3 w-full"
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div className="mb-6">
          <label className="text-sm text-gray-400">
            Password
          </label>

          <div className="mt-2 flex items-center bg-[#11111a] border border-white/10 rounded-2xl px-4 py-3">
            <Lock size={18} className="text-gray-500" />

            <input
              type="password"
              placeholder="Create password"
              className="bg-transparent outline-none text-white ml-3 w-full"
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={submit}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 py-4 rounded-2xl font-semibold hover:opacity-90 transition shadow-lg shadow-purple-900/30"
        >
          Register
          <UserPlus size={18} />
        </button>

        {/* LOGIN */}
        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}

          <span
            onClick={() => navigate("/")}
            className="text-purple-400 cursor-pointer hover:text-purple-300"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}