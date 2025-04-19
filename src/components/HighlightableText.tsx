import React, { useRef, useState } from "react";

interface Highlight {
  start: number;
  end: number;
  color: string;
} // color is a CSS color string

function getSelectionOffsets(container: HTMLElement): Highlight | null {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return null;
  const range = selection.getRangeAt(0);
  if (!container.contains(range.commonAncestorContainer)) return null;
  const preSelectionRange = range.cloneRange();
  preSelectionRange.selectNodeContents(container);
  preSelectionRange.setEnd(range.startContainer, range.startOffset);
  const start = preSelectionRange.toString().length;
  const end = start + range.toString().length;
  if (start === end) return null;
  return { start, end };
}

function splitByHighlights(text: string, highlights: Highlight[]) {
  if (highlights.length === 0) return [text];
  const parts = [];
  let last = 0;
  highlights.forEach(({ start, end, color }, i) => {
    if (last < start) parts.push(text.slice(last, start));
    parts.push(
      <mark key={i} style={{ background: color, padding: 0 }}>{text.slice(start, end)}</mark>
    );
    last = end;
  });
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export default function HighlightableText({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [showMenu, setShowMenu] = useState(false);
  const [menuPos, setMenuPos] = useState<{ x: number; y: number } | null>(null);
  const [pending, setPending] = useState<{start: number; end: number} | null>(null);
  const [colorChoice, setColorChoice] = useState<string | null>(null);

  const HIGHLIGHT_COLORS = [
    '#fef08a', // yellow
    '#a7f3d0', // green
    '#bae6fd', // blue
    '#fca5a5', // red
    '#fcd34d', // orange
    '#ddd6fe', // purple
  ];

  const handleMouseUp = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;
    const sel = getSelectionOffsets(container);
    if (sel) {
      setPending(sel);
      setShowMenu(true);
      setMenuPos({ x: e.clientX, y: e.clientY });
    } else {
      setShowMenu(false);
      setPending(null);
    }
  };

  const handleHighlight = (color: string) => {
    if (pending) {
      setHighlights([...highlights, { ...pending, color }]);
    }
    setShowMenu(false);
    setPending(null);
    setColorChoice(null);
    window.getSelection()?.removeAllRanges();
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={containerRef}
        onMouseUp={handleMouseUp}
        style={{ cursor: "text", minHeight: 24 }}
      >
        {splitByHighlights(text, highlights)}
      </div>
      {showMenu && menuPos && (
        <div
          style={{
            position: "fixed",
            left: menuPos.x,
            top: menuPos.y + 8,
            background: "#fffbe9",
            border: "1px solid #fbbf24",
            borderRadius: 6,
            padding: "10px 16px",
            boxShadow: "0 2px 8px 0 #0001",
            zIndex: 1000,
            fontSize: 15,
            display: 'flex',
            gap: 8,
            alignItems: 'center',
          }}
        >
          <span style={{marginRight: 8, color: '#78350f'}}>Highlight:</span>
          {HIGHLIGHT_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => handleHighlight(color)}
              style={{
                background: color,
                border: color === '#fffbe9' ? '1px solid #fbbf24' : 'none',
                borderRadius: '50%',
                width: 22,
                height: 22,
                margin: '0 2px',
                cursor: 'pointer',
                outline: color === colorChoice ? '2px solid #78350f' : 'none',
              }}
              aria-label={`Highlight with color ${color}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
