import React, { useState } from "react";
import { jsPDF } from "jspdf";

const SECTION_LABELS = {
  hero_headline:  "🎯 Hero Headline",
  subheadline:    "📝 Subheadline",
  features:       "⚡ Features / Benefits",
  cta:            "🚀 Call to Action",
  about:          "🏢 About Us",
  faq:            "❓ FAQ",
  testimonials:   "💬 Testimonials",
  footer_tagline: "✨ Footer Tagline",
};

function CopyBlock({ sectionKey, text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass rounded-xl p-5 space-y-3 animate-slide-up">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white text-sm">
          {SECTION_LABELS[sectionKey] || sectionKey}
        </h3>
        <button
          onClick={handleCopy}
          className="text-xs px-3 py-1 rounded-lg bg-brand-500/20 hover:bg-brand-500/40 text-brand-400 transition"
        >
          {copied ? "✅ Copied!" : "📋 Copy"}
        </button>
      </div>
      <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{text}</p>
    </div>
  );
}

export default function OutputDisplay({ output, productName }) {
  const handleDownloadTxt = () => {
    const content = Object.entries(output)
      .map(([k, v]) => `## ${SECTION_LABELS[k] || k}\n${v}`)
      .join("\n\n---\n\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `${productName || "copy"}-landing-page.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(`${productName} — Landing Page Copy`, 15, 20);

    let y = 35;
    Object.entries(output).forEach(([k, v]) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(99, 102, 241);
      doc.text(SECTION_LABELS[k] || k, 15, y);
      y += 7;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      const lines = doc.splitTextToSize(v, 175);
      lines.forEach((line) => {
        if (y > 270) { doc.addPage(); y = 20; }
        doc.text(line, 15, y);
        y += 6;
      });
      y += 8;
    });

    doc.save(`${productName || "copy"}-landing-page.pdf`);
  };

  const copyAll = () => {
    const text = Object.entries(output)
      .map(([k, v]) => `${SECTION_LABELS[k] || k}\n${v}`)
      .join("\n\n");
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-xl font-bold gradient-text">✨ Generated Copy</h2>
        <div className="flex gap-3">
          <button onClick={copyAll}           className="text-sm px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition">📋 Copy All</button>
          <button onClick={handleDownloadTxt} className="text-sm px-4 py-2 rounded-xl bg-brand-500/20 hover:bg-brand-500/40 text-brand-400 transition">⬇️ TXT</button>
          <button onClick={handleDownloadPdf} className="text-sm px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-400 transition">⬇️ PDF</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(output).map(([k, v]) => (
          <CopyBlock key={k} sectionKey={k} text={v} />
        ))}
      </div>
    </div>
  );
}
