import React from "react";

const TONES = ["Professional", "Playful", "Bold", "Friendly", "Luxury", "Minimalist", "Urgent"];

export default function InputForm({ formData, setFormData }) {
  const handle = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div className="glass rounded-2xl p-6 space-y-4 animate-slide-up">
      <h2 className="text-lg font-semibold text-white">📋 Product Details</h2>

      <div>
        <label className="text-xs text-slate-400 uppercase tracking-wider">Product / Service Name *</label>
        <input
          name="product_name"
          value={formData.product_name}
          onChange={handle}
          placeholder="e.g. Launchify SaaS"
          className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition"
        />
      </div>

      <div>
        <label className="text-xs text-slate-400 uppercase tracking-wider">Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handle}
          rows={4}
          placeholder="Describe your product, what it does, its core value..."
          className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition resize-none"
        />
      </div>

      <div>
        <label className="text-xs text-slate-400 uppercase tracking-wider">Target Audience</label>
        <input
          name="target_audience"
          value={formData.target_audience}
          onChange={handle}
          placeholder="e.g. Startup founders, freelancers over 25"
          className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition"
        />
      </div>

      <div>
        <label className="text-xs text-slate-400 uppercase tracking-wider">Tone</label>
        <select
          name="tone"
          value={formData.tone}
          onChange={handle}
          className="mt-1 w-full bg-[#1a1a2e] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition"
        >
          {TONES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>
    </div>
  );
}
