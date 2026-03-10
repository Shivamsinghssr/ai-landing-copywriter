import React, { useState } from "react";
import Header from "./components/Header";
import InputForm from "./components/InputForm";
import SectionSelector from "./components/SectionSelector";
import OutputDisplay from "./components/OutputDisplay";
import Footer from "./components/Footer";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export default function App() {
  const [formData, setFormData] = useState({
    product_name: "",
    description: "",
    target_audience: "",
    tone: "Professional",
  });
  const [selectedSections, setSelectedSections] = useState([
    "hero_headline", "subheadline", "features", "cta",
  ]);
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!formData.product_name || !formData.description) {
      setError("Please fill in at least the product name and description.");
      return;
    }
    if (selectedSections.length === 0) {
      setError("Please select at least one copy section.");
      return;
    }
    setError("");
    setLoading(true);
    setOutput(null);
    try {
      const res = await fetch(`${BACKEND_URL}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, sections: selectedSections }),
      });
      if (!res.ok) throw new Error("Server error. Please try again.");
      const data = await res.json();
      setOutput(data.copy);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-10 space-y-8">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl font-extrabold gradient-text mb-3">
            AI Landing Page Copywriter
          </h1>
          <p className="text-slate-400 text-lg">
            Describe your product — get scroll-stopping copy in seconds, powered by Gemini AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputForm formData={formData} setFormData={setFormData} />
          <SectionSelector selected={selectedSections} setSelected={setSelectedSections} />
        </div>

        {error && (
          <div className="glass rounded-xl p-4 border border-red-500/30 text-red-400 text-sm text-center">
            ⚠️ {error}
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="glow-btn bg-gradient-to-r from-brand-500 to-accent text-white font-bold text-lg px-12 py-4 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Generating Copy...
              </span>
            ) : "✨ Generate Copy"}
          </button>
        </div>

        {output && <OutputDisplay output={output} productName={formData.product_name} />}
      </main>
      <Footer />
    </div>
  );
}
