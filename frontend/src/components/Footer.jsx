import React from "react";

export default function Footer() {
  return (
    <footer className="glass mt-10 py-6 px-8 text-center text-sm text-slate-500">
      Built by{" "}
      <a href="https://github.com/shivamsinghssr" target="_blank" rel="noreferrer"
         className="text-brand-400 hover:text-white transition">
        @shivamsinghssr
      </a>{" "}
      · Powered by Gemini AI ·{" "}
      <a href="https://github.com/shivamsinghssr/ai-landing-copywriter"
         target="_blank" rel="noreferrer"
         className="text-brand-400 hover:text-white transition">
        GitHub ↗
      </a>
    </footer>
  );
}
