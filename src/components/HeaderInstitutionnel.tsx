
import React from "react";
import { Link, useLocation } from "react-router-dom";

// Remplacement de l'URL du logo par celle du logo Hugging Face smolagents en direct.
export default function HeaderInstitutionnel() {
  const location = useLocation();
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 border-b border-border bg-card-bg">
      <div className="flex items-center gap-3">
        <img
          src="https://huggingface.co/datasets/huggingface/brand-assets/resolve/main/hf-logo.png"
          alt="Logo"
          className="w-9 h-9 object-contain"
        />
        <span className="font-bold text-xl text-primary-text">Debate Analyzer</span>
      </div>
      <nav className="flex items-center gap-6">
        <Link to="/" className={`font-medium text-base hover:underline ${location.pathname === "/" ? "text-institutional-blue" : "text-secondary-text"}`}>
          Text Analysis
        </Link>
        <Link to="/audio" className={`font-medium text-base hover:underline ${location.pathname === "/audio" ? "text-institutional-blue" : "text-secondary-text"}`}>
          Voice Analysis
        </Link>
        <Link to="/twitter" className={`font-medium text-base hover:underline ${location.pathname === "/twitter" ? "text-institutional-blue" : "text-secondary-text"}`}>
          Twitter Analysis
        </Link>
      </nav>
    </header>
  );
}
