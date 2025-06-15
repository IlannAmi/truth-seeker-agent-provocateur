
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { CheckCircle, AlertTriangle, XCircle, HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

const STATUS_LABELS = {
  green: { label: "Verified", color: "#38A169", icon: <CheckCircle className="text-[#38A169]" size={18} /> },
  orange: { label: "Needs Context", color: "#F6AD55", icon: <AlertTriangle className="text-[#DD6B20]" size={18} /> },
  red: { label: "Disputed", color: "#E53E3E", icon: <XCircle className="text-[#E53E3E]" size={18} /> },
  grey: { label: "Not Verifiable", color: "#718096", icon: <HelpCircle className="text-[#718096]" size={18} /> },
};

type Tweet = {
  id: string;
  classification: "red" | "orange" | "green" | "grey";
};

type TweetsTrustSummaryProps = {
  tweets: Tweet[];
  username: string;
  name: string;
  avatar: string;
};

export default function TweetsTrustSummary({ tweets, username, name, avatar }: TweetsTrustSummaryProps) {
  const counts = { green: 0, orange: 0, red: 0, grey: 0 };
  tweets.forEach((t) => {
    counts[t.classification]++;
  });

  const data = (["green", "orange", "red", "grey"] as const).map((key) => ({
    name: STATUS_LABELS[key].label,
    value: counts[key],
    key,
    color: STATUS_LABELS[key].color,
  }));

  const total = tweets.length;

  // Indice de confiance simple (vert=3 pts, orange=2, grey=1, rouge=0)
  const score = total
    ? Math.round(
        (counts.green * 3 + counts.orange * 2 + counts.grey) / (total * 3) * 100
      )
    : 0;
  let trustLevel = "Fair";
  let trustColor = "#F6AD55";
  if (score >= 75) {
    trustLevel = "Reliable";
    trustColor = "#38A169";
  } else if (score <= 35) {
    trustLevel = "Low";
    trustColor = "#E53E3E";
  } else if (score < 55) {
    trustLevel = "Questionable";
    trustColor = "#F56565";
  }

  return (
    <Card className="w-full flex flex-col md:flex-row items-center md:items-stretch gap-4 px-4 py-4 mb-4 font-inter">
      <div className="flex flex-col items-center gap-3 md:w-[170px] min-w-[120px] md:border-r pr-6">
        <img
          src={avatar}
          alt={name}
          className="w-14 h-14 rounded-full border"
        />
        <div className="font-bold text-base text-primary">{name}</div>
        <div className="text-xs font-mono text-muted-foreground">@{username}</div>
      </div>
      <div className="flex-1 flex flex-col md:flex-row items-center md:items-center gap-4 w-full pl-2">
        <div className="flex flex-row items-center gap-6 md:gap-3">
          {data.map((entry) => (
            <div className="flex flex-col items-center" key={entry.key}>
              <div>{STATUS_LABELS[entry.key].icon}</div>
              <div className="font-semibold text-sm">{entry.value}</div>
              <div className="text-[12px] text-muted-foreground text-center">{STATUS_LABELS[entry.key].label}</div>
            </div>
          ))}
        </div>

        <div className="w-32 h-24 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={36}
                innerRadius={24}
                stroke="#fff"
              >
                {data.map((entry) => (
                  <Cell key={entry.key} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(_, name) => [`${name}`]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col items-center justify-center flex-1 px-4">
          <div className="text-xs text-muted-foreground mb-1">Account trust index:</div>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-xl" style={{ color: trustColor }}>
              {trustLevel}
            </span>
            <span className="text-sm text-muted-foreground">({score}%)</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1 text-center max-w-[180px]">
            Calculated from the factual accuracy of {total} recent tweets.
          </div>
        </div>
      </div>
    </Card>
  );
}
