import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

import {
  BrainCircuit,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

export default function Upload() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    try {
      setLoading(true);

      const res = await API.post("/resumes", { text });

      setResult(res.data);

    } catch (err) {
      alert(err.response?.data?.msg || "Error analyzing resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090f] text-white">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* HEADER */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <BrainCircuit className="text-purple-400" />

            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              AI Resume Analyzer
            </h1>
          </div>

          <p className="text-gray-400 mt-2">
            Upload your resume and receive intelligent insights, skill extraction, and career recommendations.
          </p>
        </div>

        {/* INPUT CARD */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">

          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="text-purple-400" size={20} />
            Resume Input
          </h2>

          <textarea
            rows="12"
            placeholder="Paste your resume here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full bg-[#11111a] border border-white/10 rounded-2xl p-5 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          />

          <button
            onClick={submit}
            disabled={loading}
            className="mt-5 w-full bg-gradient-to-r from-purple-600 to-indigo-600 py-4 rounded-2xl font-semibold text-lg hover:opacity-90 transition shadow-lg shadow-purple-900/30"
          >
            {loading ? "Analyzing Resume..." : "Analyze with AI"}
          </button>
        </div>

        {/* RESULTS */}
        {result && (
          <div className="mt-8 grid md:grid-cols-2 gap-6">

            {/* SCORE CARD */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6">

              <h2 className="text-xl font-semibold mb-4">
                Resume Score
              </h2>

              <div className="flex items-center justify-center">

                <div className="w-40 h-40 rounded-full border-[10px] border-purple-500 flex items-center justify-center shadow-lg shadow-purple-900/30">

                  <div className="text-center">
                    <h1 className="text-5xl font-bold text-purple-400">
                      {result.resume.score}%
                    </h1>

                    <p className="text-gray-400 text-sm mt-2">
                      AI Evaluation
                    </p>
                  </div>

                </div>
              </div>

              {/* SKILLS */}
              <div className="mt-8">

                <h3 className="font-semibold text-green-400 flex items-center gap-2 mb-3">
                  <CheckCircle2 size={18} />
                  Detected Skills
                </h3>

                <div className="flex flex-wrap gap-2">

                  {result.resume.skills.length > 0 ? (
                    result.resume.skills.map((s, i) => (
                      <span
                        key={i}
                        className="bg-green-500/10 text-green-300 border border-green-500/20 px-3 py-1 rounded-full text-xs"
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
            </div>

            {/* ANALYSIS CARD */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6">

              {/* ISSUES */}
              <div>

                <h3 className="font-semibold text-red-400 flex items-center gap-2 mb-3">
                  <AlertTriangle size={18} />
                  Issues Detected
                </h3>

                <ul className="space-y-2">

                  {result.ai.issues.length > 0 ? (
                    result.ai.issues.map((i, idx) => (
                      <li
                        key={idx}
                        className="bg-red-500/10 border border-red-500/20 text-red-300 p-3 rounded-xl text-sm"
                      >
                        {i}
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500 text-sm">
                      No major issues found
                    </li>
                  )}

                </ul>
              </div>

              {/* SUGGESTIONS */}
              <div className="mt-8">

                <h3 className="font-semibold text-blue-400 flex items-center gap-2 mb-3">
                  <Lightbulb size={18} />
                  AI Suggestions
                </h3>

                <ul className="space-y-2">

                  {result.ai.suggestions.length > 0 ? (
                    result.ai.suggestions.map((s, idx) => (
                      <li
                        key={idx}
                        className="bg-blue-500/10 border border-blue-500/20 text-blue-300 p-3 rounded-xl text-sm"
                      >
                        {s}
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500 text-sm">
                      No suggestions needed
                    </li>
                  )}

                </ul>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}