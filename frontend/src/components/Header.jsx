import React from "react";

export default function Header() {
  return (
    <header className="glass sticky top-0 z-50 px-8 py-4 flex items-center justify-between overflow-visible">

      <div className="flex items-center gap-2 text-xl font-bold gradient-text">
        ✍️ Shivam Singh
      </div>
      <nav className="hidden md:flex items-center gap-6 text-sm text-slate-400">
        <a href="#" className="hover:text-white transition-colors">Features</a>
        <a
          href="https://github.com/shivamsinghssr/ai-landing-copywriter"
          target="_blank" rel="noreferrer"
          className="hover:text-white transition-colors"
        >
          GitHub
        </a>
      </nav>
      <a
        href="https://github.com/shivamsinghssr/ai-landing-copywriter"
        target="_blank" rel="noreferrer"
        className="text-xs bg-white/10 hover:bg-white/20 transition px-3 py-1.5 rounded-lg text-white font-medium"
      >
        ⭐ Star on GitHub
      </a>
    </header>
  );
}
