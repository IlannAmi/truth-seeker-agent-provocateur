
import React, { useEffect, useState } from "react";

/**
 * JamesBondTransition shows a full-screen expanding/contracting circle (iris/gun barrel effect)
 * Now enhanced with "barrel" stripes/rainures
 */
const ANIMATION_DURATION = 800; // ms

type JBTransitionProps = {
  active: boolean;
  onEnd?: () => void;
};

export default function JamesBondTransition({ active, onEnd }: JBTransitionProps) {
  const [visible, setVisible] = useState(active);

  useEffect(() => {
    if (active) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onEnd?.();
      }, ANIMATION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [active, onEnd]);

  if (!visible) return null;
  return (
    <div
      className="fixed z-[9999] inset-0 flex items-center justify-center pointer-events-none"
      aria-hidden
      style={{ background: "rgba(0,0,0,0.01)" }}
    >
      <div
        className={`jb-iris-transition ${active ? "jb-iris-open" : "jb-iris-close"}`}
        style={{
          width: "200vw",
          height: "200vw",
        }}
      >
        <div className="jb-barrel-circle-improved">
          {/* Rainures / Stripes */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="jb-barrel-stripe"
              style={{
                transform: `rotate(${i * 60}deg) translateY(-48%)`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
