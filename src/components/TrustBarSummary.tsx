
import React from "react";

const STATUS_PALETTE = [
  { key: "green", color: "#38A169" },
  { key: "orange", color: "#F6AD55" },
  { key: "red", color: "#E53E3E" },
  { key: "grey", color: "#718096" },
];

type Classification = "red" | "orange" | "green" | "grey";
type Props = {
  items: { classification: Classification }[];
  className?: string;
};

export default function TrustBarSummary({ items, className = "" }: Props) {
  const total = items.length || 1;
  const counts = { green: 0, orange: 0, red: 0, grey: 0 };
  items.forEach(({ classification }) => {
    counts[classification]++;
  });
  const segments = STATUS_PALETTE.map(({ key, color }) => ({
    count: counts[key as Classification],
    color,
    label: key,
  }));
  const percents = segments.map(s =>
    total === 0 ? 0 : (s.count / total) * 100
  );
  return (
    <div className={`w-full h-4 rounded-full bg-muted flex overflow-hidden border border-border mb-2 ${className}`}>
      {percents.map((percent, idx) => (
        <div
          key={segments[idx].label}
          style={{
            width: `${percent}%`,
            background: segments[idx].color,
          }}
          className="h-full transition-all"
        />
      ))}
    </div>
  );
}
