
import React, { useEffect, useState } from "react";
import HeaderInstitutionnel from "@/components/HeaderInstitutionnel";
import FooterInstitutionnel from "@/components/FooterInstitutionnel";
import { Loader, XCircle, AlertTriangle, CheckCircle, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type Tweet = {
  id: string;
  text: string;
  created_at: string;
  classification: "red" | "orange" | "green" | "grey";
  explanation: string;
  retweets?: number;
  likes?: number;
  views?: number;
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
    label: "Disputed",
    badge: "bg-[#E53E3E] text-white",
    icon: <XCircle className="text-[#E53E3E]" size={16} />,
  },
  orange: {
    label: "Needs Context",
    badge: "bg-[#DD6B20] text-white",
    icon: <AlertTriangle className="text-[#DD6B20]" size={16} />,
  },
  green: {
    label: "Verified",
    badge: "bg-[#38A169] text-white",
    icon: <CheckCircle className="text-[#38A169]" size={16} />,
  },
  grey: {
    label: "Not Verifiable",
    badge: "bg-[#718096] text-white",
    icon: <AlertTriangle className="text-[#718096]" size={16} />,
  },
} as const;

// Simulate random stats for retweets, likes and views
function addFakeStatsToTweets(tweets: Tweet[]): Tweet[] {
  return tweets.map(t => ({
    ...t,
    retweets: t.retweets ?? Math.floor(Math.random() * 5000 + 500),
    likes: t.likes ?? Math.floor(Math.random() * 10000 + 800),
    views: t.views ?? Math.floor(Math.random() * 100000 + 10000),
  }));
}

export default function TwitterAnalysis() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setTweets(addFakeStatsToTweets(MOCK_TWEETS));
      setLoading(false);
    }, 1200);
  }, []);

  return (
    <div className="bg-background min-h-screen w-full flex flex-col font-inter">
      <HeaderInstitutionnel />
      <main className="flex-grow flex items-center flex-col justify-start pt-8 px-2 w-full">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Twitter className="text-[#1DA1F2]" size={28} />
          Twitter Analysis
        </h2>
        <div className="mb-2 text-sm text-secondary-text max-w-xl text-center">
          Fact-checking of Donald Trump's latest trending tweets.<br/>
          <span className="text-xs text-muted">Live tweets simulated for demo purposes.</span>
        </div>
        {loading && (
          <div className="card p-6 max-w-xl w-full mx-auto mt-10 text-center flex flex-col items-center">
            <Loader className="animate-spin mb-2 text-institutional-blue" />
            <div className="text-lg font-medium">Fetching tweets & analyzing...</div>
          </div>
        )}
        {!loading && (
          <div className="max-w-[500px] w-full flex flex-col gap-4 mt-4 mb-10">
            {tweets.map((tweet) => {
              const status = STATUS_INFO[tweet.classification];
              return (
                <div
                  key={tweet.id}
                  className="bg-white border border-border rounded-xl shadow-card px-4 pt-4 pb-2 flex flex-col gap-2 font-inter transition hover:shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="w-11 h-11">
                      <AvatarImage src="https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_400x400.jpg" alt="@realDonaldTrump" />
                      <AvatarFallback>DT</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-[15px] leading-snug text-primary-text">Donald J. Trump</span>
                        <Badge variant="secondary" className={`ml-2 px-2 py-0 ${status.badge} text-xs font-medium rounded`}>
                          {status.icon}
                          <span className="ml-1">{status.label}</span>
                        </Badge>
                      </div>
                      <div className="text-xs text-secondary-text leading-none">@realDonaldTrump</div>
                    </div>
                    <span className="ml-auto text-xs text-secondary-text">{new Date(tweet.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  </div>
                  <div className="text-[17px] leading-tight text-primary-text mt-1 mb-2" style={{ whiteSpace: "pre-wrap" }}>
                    {tweet.text}
                  </div>
                  <div className="flex gap-6 pb-1 pl-1 text-sm text-secondary-text font-medium">
                    <span>
                      <span className="font-semibold text-primary-text">{tweet.retweets?.toLocaleString()}</span> Retweets
                    </span>
                    <span>
                      <span className="font-semibold text-primary-text">{tweet.likes?.toLocaleString()}</span> Likes
                    </span>
                    <span>
                      <span className="font-semibold text-primary-text">{tweet.views?.toLocaleString()}</span> Views
                    </span>
                  </div>
                  <div className="px-1 pt-2 pb-1">
                    <span className="text-xs text-warning block italic">{tweet.explanation}</span>
                  </div>
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
