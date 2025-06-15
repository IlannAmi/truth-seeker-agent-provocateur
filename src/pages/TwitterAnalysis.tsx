
import React from "react";
import HeaderInstitutionnel from "@/components/HeaderInstitutionnel";
import FooterInstitutionnel from "@/components/FooterInstitutionnel";
import { Twitter } from "lucide-react";
import UserTweetsAnalysis from "../components/UserTweetsAnalysis";

export default function TwitterAnalysis() {
  return (
    <div className="bg-background min-h-screen w-full flex flex-col font-inter">
      <HeaderInstitutionnel />
      <main className="flex-grow flex items-center flex-col justify-start pt-8 px-2 w-full">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Twitter className="text-[#1DA1F2]" size={28} />
          Twitter Analysis
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
