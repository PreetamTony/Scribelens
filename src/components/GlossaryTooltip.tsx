import React, { useState } from "react";

// Simple glossary dictionary
const GLOSSARY: Record<string, string> = {
  "Reinforcement Learning":
    "A type of machine learning where an agent learns to make decisions by receiving rewards or penalties.",
  "Neural Network":
    "A computational model inspired by the human brain, used in machine learning to recognize patterns.",
  "Eligibility Traces":
    "A mechanism in reinforcement learning that helps an agent assign credit to actions and states that happened in the recent past, making learning more efficient.",
  // Add more glossary terms here
};

// Utility to escape regex special chars
function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Highlight and wrap keywords with tooltips
export function GlossaryTooltip({ text, children }: { text?: string; children?: React.ReactNode }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  // Build regex to match all glossary terms
  const terms = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length); // longest first
  const regex = new RegExp(`\\b(${terms.map(escapeRegExp).join("|")})\\b`, "gi");

  let content: React.ReactNode;
  if (typeof text === "string") {
    // Split text and wrap keywords
    const parts = [] as React.ReactNode[];
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    let idx = 0;
    while ((match = regex.exec(text))) {
      const [word] = match;
      const start = match.index;
      if (start > lastIndex) parts.push(text.slice(lastIndex, start));
      parts.push(
        <span
          key={idx++}
          style={{ background: "#fef3c7", color: "#b45309", cursor: "pointer", borderBottom: "1px dotted #f59e42" }}
          onMouseEnter={e => {
            setHovered(word);
            setAnchor(e.currentTarget);
          }}
          onMouseLeave={() => {
            setHovered(null);
            setAnchor(null);
          }}
        >
          {word}
        </span>
      );
      lastIndex = start + word.length;
    }
    if (lastIndex < text.length) parts.push(text.slice(lastIndex));
    content = parts;
  } else if (children) {
    content = children;
  } else {
    content = null;
  }

  return (
    <span style={{ position: "relative" }}>
      {content}
      {hovered && anchor && (
        <div
          style={{
            position: "fixed",
            left: anchor.getBoundingClientRect().left,
            top: anchor.getBoundingClientRect().bottom + 6,
            background: "#fffbe9",
            color: "#78350f",
            border: "1px solid #fbbf24",
            borderRadius: 6,
            padding: "8px 14px",
            boxShadow: "0 2px 8px 0 #0001",
            zIndex: 1000,
            minWidth: 220,
            maxWidth: 320,
            fontSize: 15,
          }}
        >
          <b>{hovered}</b>
          <div style={{ marginTop: 4 }}>{GLOSSARY[hovered]}</div>
        </div>
      )}
    </span>
  );
}

export default GlossaryTooltip;
