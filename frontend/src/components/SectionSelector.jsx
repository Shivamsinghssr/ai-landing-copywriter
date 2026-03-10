import React from "react";

const ALL_SECTIONS = [
  { id: "hero_headline",  label: "🎯 Hero Headline" },
  { id: "subheadline",    label: "📝 Subheadline" },
  { id: "features",       label: "⚡ Features / Benefits" },
  { id: "cta",            label: "🚀 Call to Action" },
  { id: "about",          label: "🏢 About Us" },
  { id: "faq",            label: "❓ FAQ" },
  { id: "testimonials",   label: "💬 Testimonials" },
  { id: "footer_tagline", label: "✨ Footer Tagline" },
];

export default function SectionSelector({ selected, setSelected }) {
  const toggle = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );

  return (
    <div className="glass rounded-2xl p-6 space-y-4 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">🗂️ Select Sections</h2>
        <div className="flex gap-2 text-xs">
          <button
            onClick={() => setSelected(ALL_SECTIONS.map((s) => s.id))}
            className="text-brand-400 hover:text-white transition"
          >
            All
          </button>
          <span className="text-slate-600">|</span>
          <button
            onClick={() => setSelected([])}
            className="text-slate-400 hover:text-white transition"
          >
            None
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {ALL_SECTIONS.map(({ id, label }) => (
          <label
            key={id}
            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition border ${
              selected.includes(id)
                ? "bg-brand-500/20 border-brand-500/50 text-white"
                : "bg-white/3 border-white/5 text-slate-400 hover:border-white/20"
            }`}
          >
            <input
              type="checkbox"
              checked={selected.includes(id)}
              onChange={() => toggle(id)}
              className="accent-indigo-500"
            />
            <span className="text-sm font-medium">{label}</span>
          </label>
        ))}
      </div>
      <p className="text-xs text-slate-500">{selected.length} of {ALL_SECTIONS.length} selected</p>
    </div>
  );
}
