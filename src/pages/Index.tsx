import HeaderInstitutionnel from "@/components/HeaderInstitutionnel";
import AnalyseInput from "@/components/AnalyseInput";
import EmptyState from "@/components/EmptyState";
import FooterInstitutionnel from "@/components/FooterInstitutionnel";
import AnalysisProgress from "@/components/AnalysisProgress";
import ResultsList from "@/components/ResultsList";
import TrustBarSummary from "@/components/TrustBarSummary";
import { useState } from "react";
// import { analyzeDebate } from "@/services/agentService";

// Types identiques
type AgentStatus = "idle" | "analyzing" | "completed" | "error";
type AnalysisResult = any[]; // Accept any backend result for now

const BACKEND_URL = "http://127.0.0.1:8000/api/chat";

const Index = () => {
  const [status, setStatus] = useState<AgentStatus>("idle");
  const [inputText, setInputText] = useState("");
  const [results, setResults] = useState<AnalysisResult>([]);
  const [agentThoughts, setAgentThoughts] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Nouvelle version: envoie la requête vers le backend.
  const handleAnalyze = async (txt: string) => {
    setStatus("analyzing");
    setInputText(txt);
    setResults([]);
    setAgentThoughts([]);
    setErrorMsg(null);

    try {
      setAgentThoughts(["Sending request to backend..."]);
      const resp = await fetch(BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input_text: txt,
        }),
      });

      setAgentThoughts(thoughts => [...thoughts, "Awaiting server response..."]);

      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(text || `Backend error: ${resp.status}`);
      }

      const data = await resp.json();
      setAgentThoughts(thoughts => [...thoughts, "Response received!"]);

      // Unifier formats : { facts_checked }, Array ou objet seul
      let resultsArr: any[] = [];
      if (data && Array.isArray(data.facts_checked)) {
        resultsArr = data.facts_checked;
      } else if (Array.isArray(data)) {
        resultsArr = data;
      } else if (data && typeof data === "object" && (data.statement && data.classification)) {
        resultsArr = [data];
      } else {
        resultsArr = [];
      }

      // correction: unpack explanation if JSON stringified with answer+sources
      resultsArr = resultsArr.map((item) => {
        // item.explanation peut être string ou JSON stringifié
        let parsedExplanation = item.explanation;
        let customSources = null;
        if (typeof parsedExplanation === "string") {
          try {
            const explObj = JSON.parse(parsedExplanation);
            if (explObj && explObj.answer) {
              parsedExplanation = explObj.answer;
              // Si jamais le back oublie de les séparer...
              customSources = explObj.sources || null;
            }
          } catch {
            // ce n'est pas un JSON stringifié, tant pis
          }
        }
        // Les sources additionnelles (liens) peuvent être injectés plus tard dans le composant détail !
        return {
          ...item,
          explanation: parsedExplanation,
          customSources,
        };
      });

      setResults(resultsArr);
      setStatus("completed");
    } catch (e: any) {
      setErrorMsg("Analysis failed. " + (e?.message || ""));
      setStatus("error");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setInputText("");
    setResults([]);
    setAgentThoughts([]);
    setErrorMsg(null);
  };

  return (
    <div className="bg-background min-h-screen w-full flex flex-col font-inter">
      <HeaderInstitutionnel />
      <main className="flex-grow flex items-center flex-col justify-start pt-8 px-2 w-full">
        {results.length > 0 && (
          <TrustBarSummary items={[]} className="mb-3" />
        )}
        {(status === "idle" || status === "error") && (
          <AnalyseInput
            onAnalyze={handleAnalyze}
            initialValue={inputText}
            isError={status === "error"}
            errorMsg={errorMsg ?? ""}
          />
        )}
        {status === "idle" && <EmptyState />}
        {status === "analyzing" && (
          <AnalysisProgress agentThoughts={agentThoughts} />
        )}
        {status === "completed" && (
          // Simple affichage brut du résultat, à améliorer selon format backend !
          <div className="card max-w-2xl w-full p-5 mx-auto my-10 text-sm text-primary-text">
            <pre className="whitespace-pre-wrap break-words">{JSON.stringify(results[0], null, 2)}</pre>
            <button
              className="mt-6 px-5 py-2 bg-institutional-blue text-white rounded font-medium shadow hover:bg-institutional-blue/90 transition"
              onClick={handleReset}
            >
              Start a New Analysis
            </button>
          </div>
        )}
        <div className="mt-7">
          <a href="/audio" className="inline-block text-institutional-blue hover:underline text-base font-medium">
            or try voice analysis →
          </a>
        </div>
      </main>
      <FooterInstitutionnel />
    </div>
  );
};

export default Index;
