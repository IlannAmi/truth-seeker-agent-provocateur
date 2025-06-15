
import React, { useEffect, useState } from "react";
import HeaderInstitutionnel from "@/components/HeaderInstitutionnel";
import FooterInstitutionnel from "@/components/FooterInstitutionnel";
import { Loader, XCircle, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type Tweet = {
  id: string;
  text: string;
  created_at: string;
  classification: "red" | "orange" | "green" | "grey";
  explanation: string;
};

const MOCK_TWEETS: Tweet[] = [
  {
    id: "1",
    text: "The United States has just achieved its lowest unemployment rate in history.",
    created_at: "2025-06-10T15:32:00Z",
    classification: "orange",
    explanation: "Partially accurate: unemployment is low, but not the lowest in history.",
  },
  {
    id: "2",
    text: "We built the strongest economy the world has ever seen.",
    created_at: "2025-06-08T09:22:00Z",
    classification: "red",
    explanation: "Incorrect: Other countries have had stronger economies. This is a subjective statement.",
  },
  {
    id: "3",
    text: "Gas prices have gone up under the new administration.",
    created_at: "2025-06-07T18:14:00Z",
    classification: "green",
    explanation: "Verified: Gas prices have indeed increased compared to last year.",
  }
];

const STATUS_INFO = {
  red: {
    label: "Disputed Information",
    bg: "bg-[#FED7D7]",
    border: "border-l-[4px] border-[#E53E3E]",
    icon: <XCircle className="text-[#E53E3E]" size={20} />,
  },
  orange: {
    label: "Context Required",
    bg: "bg-[#FEEBC8]",
    border: "border-l-[4px] border-[#DD6B20]",
    icon: <AlertTriangle className="text-[#DD6B20]" size={20} />,
  },
  green: {
    label: "Verified Information",
    bg: "bg-[#C6F6D5]",
    border: "border-l-[4px] border-[#38A169]",
    icon: <CheckCircle className="text-[#38A169]" size={20} />,
  },
  grey: {
    label: "Not Verifiable",
    bg: "bg-[#F7FAFC]",
    border: "border-l-[4px] border-[#718096]",
    icon: <AlertTriangle className="text-[#718096]" size={20} />,
  },
} as const;

export default function TwitterAnalysis() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching tweets + analysis (replace with actual API in the future)
    setLoading(true);
    setTimeout(() => {
      setTweets(MOCK_TWEETS);
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="bg-background min-h-screen w-full flex flex-col font-inter">
      <HeaderInstitutionnel />
      <main className="flex-grow flex items-center flex-col justify-start pt-8 px-2 w-full">
        <h2 className="text-2xl font-bold mb-4">Twitter Analysis</h2>
        <div className="mb-2 text-sm text-secondary-text max-w-xl text-center">
          Fact-checking of Donald Trump's latest popular tweets is displayed below.<br/>
          <span className="text-xs text-muted">For demo purposes, tweets are simulated.</span>
        </div>
        {loading && (
          <div className="card p-6 max-w-xl w-full mx-auto mt-10 text-center flex flex-col items-center">
            <Loader className="animate-spin mb-2 text-institutional-blue" />
            <div className="text-lg font-medium">Fetching tweets & analyzing...</div>
          </div>
        )}
        {!loading && (
          <div className="max-w-2xl w-full flex flex-col gap-4 mt-4 mb-10">
            {tweets.map((tweet) => {
              const status = STATUS_INFO[tweet.classification];
              return (
                <div key={tweet.id} className={`card cursor-default px-6 py-5 flex flex-col gap-2 shadow-md ${status.bg} ${status.border}`} style={{ borderRadius: "12px" }}>
                  <div className="flex items-center gap-2 mb-1">
                    {status.icon}
                    <span className="text-xs font-medium">{status.label}</span>
                    <span className="text-xs text-secondary-text ml-auto">{new Date(tweet.created_at).toLocaleString()}</span>
                  </div>
                  <div className="text-base text-primary-text italic leading-snug mb-1">&ldquo;{tweet.text}&rdquo;</div>
                  <div className="text-xs text-secondary-text">{tweet.explanation}</div>
                </div>
              );
            })}
            <Button variant="outline" className="mt-6 mx-auto" onClick={() => window.location.reload()}>
              Refresh Tweets
            </Button>
          </div>
        )}
      </main>
      <FooterInstitutionnel />
    </div>
  );
}
