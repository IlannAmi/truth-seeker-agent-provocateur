
import React from "react";
import HeaderInstitutionnel from "@/components/HeaderInstitutionnel";
import FooterInstitutionnel from "@/components/FooterInstitutionnel";
import UserTweetsAnalysis from "../components/UserTweetsAnalysis";
import TrustBarSummary from "@/components/TrustBarSummary";

// SVG du vrai logo X (lucide "x")
const XLogo = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" className="inline-block align-middle" fill="none" stroke="#181818" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" y1="6" x2="18" y2="18" />
    <line x1="6" y1="18" x2="18" y2="6" />
  </svg>
);

export default function TwitterAnalysis() {
  return (
    <div className="bg-background min-h-screen w-full flex flex-col font-inter">
      <HeaderInstitutionnel />
      <main className="flex-grow flex items-center flex-col justify-start pt-8 px-2 w-full">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          {/* Logo X stylisé */}
          <span className="font-black text-3xl text-[#181818] tracking-tight leading-none flex items-center" style={{fontFamily:'monospace'}}>
            <XLogo />
          </span>
          X Analysis
        </h2>
        <div className="mb-2 text-sm text-secondary-text max-w-xl text-center">
          Fact-checking of the latest trending tweets from political personalities.<br/>
          <span className="text-xs text-muted">Live tweets simulated for demo purposes. Choose an account to start.</span>
        </div>
        <UserTweetsAnalysis />
      </main>
      <FooterInstitutionnel />
    </div>
  );
}
