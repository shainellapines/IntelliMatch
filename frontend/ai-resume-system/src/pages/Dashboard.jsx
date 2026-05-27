import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

import {
  FileText,
  Trophy,
  BarChart3,
  Pencil,
  Trash2,
  Briefcase,
  Sparkles,
} from "lucide-react";

export default function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const res = await API.get("/resumes");
      setResumes(res.data.data);
    } catch (err) {
      console.error("Error fetching resumes:", err);
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/resumes/${id}`);
      setResumes(resumes.filter((r) => r._id !== id));
    } catch (err) {
      alert("Failed to delete resume");
    }
  };

  // EDIT
  const handleEdit = async (resume) => {
    const newText = prompt("Edit your resume:", resume.text);

    if (!newText || newText.trim() === "") return;

    try {
      await API.put(`/resumes/${resume._id}`, {
        text: newText,
      });

      fetchResumes();
    } catch (err) {
      alert("Failed to update resume");
    }
  };

  const avgScore =
    resumes.length > 0
      ? Math.round(
          resumes.reduce((a, b) => a + (b.score || 0), 0) /
            resumes.length
        )
      : 0;

  const topScore = Math.max(...resumes.map((r) => r.score || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090f] text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* HEADER */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <Sparkles className="text-purple-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Dashboard Overview
            </h1>
          </div>

          <p className="text-gray-400 mt-2">
            Track your AI-powered resume performance and job matching insights.
          </p>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-5 mb-8">

          {/* TOTAL */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">
                  Total Resumes
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {resumes.length}
                </h2>
              </div>

              <div className="bg-purple-600/20 p-3 rounded-xl">
                <FileText className="text-purple-400" />
              </div>
            </div>
          </div>

          {/* AVERAGE */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">
                  Average Score
                </p>

                <h2 className="text-3xl font-bold mt-2 text-purple-400">
                  {avgScore}%
                </h2>
              </div>

              <div className="bg-indigo-600/20 p-3 rounded-xl">
                <BarChart3 className="text-indigo-400" />
              </div>
            </div>
          </div>

          {/* TOP */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">
                  Top Score
                </p>

                <h2 className="text-3xl font-bold mt-2 text-green-400">
                  {topScore}%
                </h2>
              </div>

              <div className="bg-green-600/20 p-3 rounded-xl">
                <Trophy className="text-green-400" />
              </div>
            </div>
          </div>
        </div>

        {/* EMPTY STATE */}
        {resumes.length === 0 && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-300">
              No resumes uploaded yet
            </h2>

            <p className="text-gray-500 mt-2">
              Upload your first resume to begin AI analysis.
            </p>
          </div>
        )}

        {/* RESUME CARDS */}
        <div className="grid md:grid-cols-2 gap-6">

          {resumes.map((r, index) => (
            <div
              key={r._id}
              className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 hover:border-purple-500/40 transition duration-300 hover:shadow-purple-900/20 hover:shadow-2xl"
            >

              {/* HEADER */}
              <div className="flex justify-between items-start">

                <div>
                  <h2 className="text-xl font-bold">
                    Resume Analysis
                  </h2>

                  <p className="text-gray-400 text-sm mt-1">
                    AI-generated performance report
                  </p>
                </div>

                <div className="text-right">
                  <h2 className="text-3xl font-bold text-purple-400">
                    {r.score || 0}%
                  </h2>

                  {index === 0 && (
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                      Top Resume
                    </span>
                  )}
                </div>
              </div>

              {/* PREVIEW */}
              <div className="mt-5">
                <p className="text-gray-300 leading-relaxed text-sm">
                  {r.text?.substring(0, 150)}...
                </p>
              </div>

              {/* SKILLS */}
              <div className="mt-5">
                <h3 className="text-sm font-semibold text-gray-300 mb-2">
                  Detected Skills
                </h3>

                <div className="flex flex-wrap gap-2">
                  {r.skills?.length > 0 ? (
                    r.skills.map((s, i) => (
                      <span
                        key={i}
                        className="bg-purple-500/20 text-purple-300 border border-purple-500/20 px-3 py-1 rounded-full text-xs"
                      >
                        {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">
                      No skills detected
                    </span>
                  )}
                </div>
              </div>

              {/* ACTIONS */}
              <div className="mt-6 flex flex-col gap-3">

                <button
                  onClick={() => navigate(`/matches/${r._id}`)}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 py-3 rounded-xl font-medium hover:opacity-90 transition"
                >
                  <Briefcase size={18} />
                  View Job Matches
                </button>

                <div className="grid grid-cols-2 gap-3">

                  <button
                    onClick={() => handleEdit(r)}
                    className="flex items-center justify-center gap-2 bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 py-2 rounded-xl hover:bg-yellow-500/20 transition"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(r._id)}
                    className="flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/20 text-red-300 py-2 rounded-xl hover:bg-red-500/20 transition"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}