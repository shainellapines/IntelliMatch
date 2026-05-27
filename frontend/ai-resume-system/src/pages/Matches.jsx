import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

import {
  Briefcase,
  CheckCircle2,
  XCircle,
  Sparkles,
  Trophy,
} from "lucide-react";

export default function Matches() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const res = await API.get(`/jobs/match/${id}`);
      setMatches(res.data);
    } catch (err) {
      alert(err.response?.data?.msg || "Error fetching matches");
    }
  };

  const getProgressColor = (score) => {
    if (score >= 80) return "from-green-500 to-emerald-400";
    if (score >= 50) return "from-yellow-500 to-orange-400";
    return "from-red-500 to-pink-500";
  };

  const getTextColor = (score) => {
    if (score >= 80) return "text-green-400";
    if (score >= 50) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="min-h-screen bg-[#09090f] text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* HEADER */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <Sparkles className="text-purple-400" />

            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              AI Job Matches
            </h1>
          </div>

          <p className="text-gray-400 mt-2">
            Intelligent skill-based job recommendations powered by AI analysis.
          </p>
        </div>

        {/* EMPTY */}
        {matches.length === 0 && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-300">
              No matches available
            </h2>

            <p className="text-gray-500 mt-2">
              Upload or improve your resume to generate job matches.
            </p>
          </div>
        )}

        {/* MATCHES */}
        <div className="grid md:grid-cols-2 gap-6">

          {matches.map((m, i) => (
            <div
              key={i}
              className={`bg-white/5 border backdrop-blur-xl rounded-3xl p-6 transition duration-300 hover:shadow-2xl ${
                i === 0
                  ? "border-purple-500/40 hover:shadow-purple-900/20"
                  : "border-white/10 hover:border-white/20"
              }`}
            >

              {/* HEADER */}
              <div className="flex justify-between items-start">

                <div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="text-purple-400" size={20} />

                    <h2 className="text-2xl font-bold">
                      {m.job.title}
                    </h2>
                  </div>

                  {i === 0 && (
                    <div className="mt-2 inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs border border-purple-500/20">
                      <Trophy size={14} />
                      Best Match
                    </div>
                  )}
                </div>

                {/* SCORE */}
                <div className="text-right">
                  <h2 className={`text-4xl font-bold ${getTextColor(m.score)}`}>
                    {m.score.toFixed(0)}%
                  </h2>

                  <p className={`text-sm mt-1 ${getTextColor(m.score)}`}>
                    {m.level}
                  </p>
                </div>
              </div>

              {/* PROGRESS */}
              <div className="mt-5">
                <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">

                  <div
                    className={`bg-gradient-to-r ${getProgressColor(
                      m.score
                    )} h-3 rounded-full transition-all duration-700`}
                    style={{ width: `${m.score}%` }}
                  />

                </div>
              </div>

              {/* MATCHED */}
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2
                    size={18}
                    className="text-green-400"
                  />

                  <h3 className="font-semibold text-green-400">
                    Matched Skills
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">

                  {m.matchedSkills.length > 0 ? (
                    m.matchedSkills.map((s, idx) => (
                      <span
                        key={idx}
                        className="bg-green-500/10 text-green-300 border border-green-500/20 px-3 py-1 rounded-full text-xs"
                      >
                        {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">
                      No matching skills detected
                    </span>
                  )}

                </div>
              </div>

              {/* MISSING */}
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <XCircle
                    size={18}
                    className="text-red-400"
                  />

                  <h3 className="font-semibold text-red-400">
                    Missing Skills
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">

                  {m.missingSkills.length > 0 ? (
                    m.missingSkills.map((s, idx) => (
                      <span
                        key={idx}
                        className="bg-red-500/10 text-red-300 border border-red-500/20 px-3 py-1 rounded-full text-xs"
                      >
                        {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">
                      No missing skills
                    </span>
                  )}

                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}