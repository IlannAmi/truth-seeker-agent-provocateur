
import HeaderInstitutionnel from "@/components/HeaderInstitutionnel";
import AnalyseInput from "@/components/AnalyseInput";
import EmptyState from "@/components/EmptyState";
import FooterInstitutionnel from "@/components/FooterInstitutionnel";
import { useState } from "react";

const Index = () => {
  const [hasInput, setHasInput] = useState(false);

  return (
    <div className="bg-background min-h-screen w-full flex flex-col font-inter">
      <HeaderInstitutionnel />
      <main className="flex-grow flex items-center flex-col justify-start pt-8 px-2 w-full">
        <AnalyseInput onAnalyze={() => setHasInput(true)} />
        {!hasInput && (
          <EmptyState />
        )}
      </main>
      <FooterInstitutionnel />
    </div>
  );
};

export default Index;

