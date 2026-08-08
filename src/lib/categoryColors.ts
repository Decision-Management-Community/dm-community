// Consistent color-coding for domain categories/tags across Q&A, Tools, and
// Challenge tags. Known labels get a fixed assignment so the same domain
// (e.g. "Decision Intelligence Platforms", used by both Q&A and Tools) always
// reads the same color. Anything unrecognized — e.g. a free-form Challenge
// tag a contributor invents — falls back to a deterministic hash pick from
// the same palette, so it's still stable across builds without needing this
// file updated for every new tag.
const PALETTE = [
  '#7d5ba6', // violet
  '#b5542a', // rust
  '#1f7a68', // teal
  '#4a5fa5', // indigo
  '#5b7a35', // moss
  '#96394a', // burgundy
  '#2f6f8f', // steel blue
  '#8a6d1f', // ochre
];

const NAMED: Record<string, string> = {
  'Agentic AI': PALETTE[0],
  'Business Rules': PALETTE[1],
  'Decision Intelligence Platforms': PALETTE[2],
  'Decision Optimization': PALETTE[3],
  'Machine Learning': PALETTE[4],
  'DMN, BPMN, CMMN': PALETTE[5],
  'DMN Tools': PALETTE[5],
  'Rules Engines': PALETTE[1],
  'Constraint Solvers': PALETTE[6],
  'Optimization Solvers': PALETTE[3],
};

// "agentic-ai" (a free-form Challenge tag) and "Agentic AI" (the Q&A category
// enum) should land on the same color — normalize case/separators before
// matching against NAMED so the two taxonomies agree wherever they overlap.
function normalize(label: string): string {
  return label.toLowerCase().replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim();
}

const NAMED_NORMALIZED: Record<string, string> = Object.fromEntries(
  Object.entries(NAMED).map(([key, value]) => [normalize(key), value]),
);

export function categoryColor(label: string): string {
  const match = NAMED_NORMALIZED[normalize(label)];
  if (match) return match;
  let hash = 0;
  for (const char of label) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return PALETTE[hash % PALETTE.length];
}

// Inline style string for a badge tinted to a category's color, matching the
// existing .badge.ok/.broken/.unverified convention (text color + ~33% alpha
// border + ~8% alpha background).
export function categoryBadgeStyle(label: string): string {
  const hex = categoryColor(label);
  return `color:${hex}; border-color:${hex}55; background:${hex}14;`;
}
