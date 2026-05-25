import React from "react";
import { HandArrow, Star, Sparkle, Squiggle } from "./doodles";

// Inter-section doodle band (maximal intensity, locked default).
export default function SectionDoodles() {
  return (
    <div style={{ position: "relative", height: 0 }}>
      <div className="doodle" style={{ top: 60, left: "8%" }}>
        <HandArrow width={90} rotate={-18} />
      </div>
      <div className="doodle wiggle" style={{ top: 30, right: "12%" }}>
        <Star size={36} color="var(--coral)" />
      </div>
      <div className="doodle doodle--extra" style={{ top: 100, right: "30%" }}>
        <Sparkle size={20} color="var(--ink)" />
      </div>
      <div className="doodle doodle--extra" style={{ top: 80, left: "40%" }}>
        <Squiggle width={60} color="var(--mint)" />
      </div>
    </div>
  );
}
