
import React from "react";
import { Link, useLocation } from "react-router-dom";

// Logo Smolagent
const SMOLAGENT_LOGO = "https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/smolagents/icon_smolagents.png";

export default function HeaderInstitutionnel() {
  const location = useLocation();
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 border-b border-border bg-card-bg">
      <div className="flex items-center gap-3">
        <img
          src={SMOLAGENT_LOGO}
          alt="Smolagent Logo"
          className="w-9 h-9 object-contain"
        />
        <span className="font-bold text-xl text-primary-text">Debate Analyzer</span>
        <span className="ml-4 flex items-center gap-2 bg-[#F5F6FA] rounded px-2 py-0.5 text-xs font-semibold text-[#754fff] border border-[#ebeaff] whitespace-nowrap">
          POWERED WITH AI AGENTS BASED ON CLAUDE 4 SONNET
        </span>
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
