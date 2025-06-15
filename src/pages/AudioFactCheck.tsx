
import { useState, useRef } from "react";
import HeaderInstitutionnel from "@/components/HeaderInstitutionnel";
import EmptyState from "@/components/EmptyState";
import FooterInstitutionnel from "@/components/FooterInstitutionnel";
import ResultsList from "@/components/ResultsList";
import { Button } from "@/components/ui/button";

type AgentStatus = "idle" | "recording" | "transcribing" | "analyzing" | "completed" | "error";
type AnalysisResult = {
  statement: string;
  classification: "red" | "orange" | "green" | "grey";
  confidence: number;
  summary: string;
  sources: {
    supporting: string[];
    contradicting: string[];
    nuanced: string[];
  };
  explanation: string;
}[];

export default function AudioFactCheck() {
  const [status, setStatus] = useState<AgentStatus>("idle");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [results, setResults] = useState<AnalysisResult>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [isMicAllowed, setIsMicAllowed] = useState<boolean>(true);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  // Start recording audio from mic
  const handleStartRecording = async () => {
    setErrorMsg(null);
    setResults([]);
    setTranscript(null);
    setStatus("recording");
    setAudioUrl(null);
    setIsMicAllowed(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunks.current = [];
      mediaRecorder.ondataavailable = event => {
        if (event.data.size > 0) audioChunks.current.push(event.data);
      };
      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunks.current, { type: "audio/webm" });
        setAudioUrl(URL.createObjectURL(blob));
        handleSendAudio(blob);
      };
      mediaRecorder.start();
    } catch {
      setIsMicAllowed(false);
      setStatus("idle");
      setErrorMsg("Permission au micro refusée.");
    }
  };

  // Stop recording (called by UI)
  const handleStopRecording = () => {
    mediaRecorderRef.current?.stop();
    setStatus("transcribing");
  };

  // Simulate audio transcription + analysis
  const handleSendAudio = async (audioBlob: Blob) => {
    setStatus("transcribing");
    // Remplace ici par ton appel d'API qui gère la transcription et le fact-checking
    try {
      // --- Simulation : transcription + analyse
      setTimeout(() => {
        // Simulé : texte reconnu depuis l'audio
        const simulatedText = "Unemployment dropped by 15% this year. CO2 emissions decreased over the past year.";
        setTranscript(simulatedText);

        // Ici, tu réutilises la logique d'analyse textuelle
        setStatus("analyzing");
        setTimeout(() => {
          setResults([
            {
              statement: "Unemployment dropped by 15% this year",
              classification: "orange",
              confidence: 75,
              summary: "Partially accurate but lacks temporal context",
              sources: {
                supporting: ["INSEE Q3 2024", "Employment Agency Stats"],
                contradicting: ["OECD Report 2024"],
                nuanced: ["France Strategy Analysis"]
              },
              explanation: "The figures are correct but need further precision regarding the period considered."
            },
            {
              statement: "CO2 emissions decreased over the past year.",
              classification: "green",
              confidence: 90,
              summary: "Consistent with the latest environmental reports.",
              sources: {
                supporting: ["Ministry of Ecology Report 2024"],
                contradicting: [],
                nuanced: ["European Environment Agency Overview"]
              },
              explanation: "Recent data supports a decline, though local variations may exist."
            }
          ]);
          setStatus("completed");
        }, 1500);
      }, 1750);
    } catch (e) {
      setErrorMsg("Erreur pendant l'analyse de l'audio.");
      setStatus("error");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setAudioUrl(null);
    setResults([]);
    setTranscript(null);
    setErrorMsg(null);
  };

  return (
    <div className="bg-background min-h-screen w-full flex flex-col font-inter">
      <HeaderInstitutionnel />
      <main className="flex-grow flex-col flex items-center justify-start pt-8 px-2 w-full">
        <h2 className="text-2xl font-bold mb-4">Analyse d'un débat par la voix</h2>

        {(status === "idle" || status === "error") && (
          <div className="card p-6 max-w-xl w-full mx-auto mt-6 text-center">
            <Button
              onClick={handleStartRecording}
              className="w-full h-11 rounded-lg font-medium text-base bg-institutional-blue text-white shadow-sm hover:bg-institutional-blue/90 transition-all"
            >
              🎤 Lancer l'enregistrement
            </Button>
            {!isMicAllowed &&
              <div className="text-destructive mt-3">Autorisation micro refusée.</div>
            }
            {errorMsg && (
              <div className="text-destructive mt-3">{errorMsg}</div>
            )}
            <div className="text-secondary-text mt-3 text-sm">Cliquez pour démarrer l'enregistrement avec votre micro.</div>
          </div>
        )}

        {status === "recording" && (
          <div className="card p-6 max-w-xl w-full mx-auto mt-6 text-center">
            <div className="text-lg mb-4">⏺️ Enregistrement en cours...</div>
            <Button
              onClick={handleStopRecording}
              variant="destructive"
              className="w-full h-11 rounded-lg font-medium text-base"
            >
              Arrêter et analyser
            </Button>
            <div className="text-secondary-text mt-3 text-sm">Parlez clairement, puis cliquez quand c'est terminé.</div>
          </div>
        )}

        {status === "transcribing" && (
          <div className="card p-6 max-w-xl w-full mx-auto mt-6 text-center">
            <div className="animate-pulse text-lg font-medium">🔎 Transcription et analyse en cours...</div>
          </div>
        )}

        {/* Affichage transcription et résultats */}
        {(status === "analyzing" || status === "completed") && (
          <div className="w-full">
            {audioUrl && (
              <div className="flex flex-col items-center mb-4">
                <audio src={audioUrl} controls className="mb-2" />
                {transcript && (
                  <div className="text-sm text-secondary-text mb-2">
                    <strong>Transcription :</strong> {transcript}
                  </div>
                )}
              </div>
            )}
            {results.length === 0 && (
              <div className="text-center py-10">Analyse en cours...</div>
            )}
            {results.length > 0 &&
              <ResultsList results={results} onRetry={handleReset} />
            }
          </div>
        )}

        {status === "idle" && <EmptyState />}
      </main>
      <FooterInstitutionnel />
    </div>
  );
}
