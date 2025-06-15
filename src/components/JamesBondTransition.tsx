
import React, { useEffect, useState } from "react";

/**
 * JamesBondTransition shows a full-screen expanding/contracting circle (iris/gun barrel effect)
 * Activated when `active` = true, for ~0.8s.
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
      // Call onEnd after animation (so main page content updates underneath)
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
      className={`fixed z-[9999] inset-0 flex items-center justify-center pointer-events-none`}
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
        <div className="jb-barrel-circle" />
      </div>
    </div>
  );
}
