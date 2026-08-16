# Field Note 02 — What a Perfect Forecast Still Cannot Tell You

A four-page paper in the Bit Bros field note format, derived from the manuscript of
*Beyond the Forecast: A Leader's Introduction to Supply Chain Uncertainty*
(`addejans/the-uncertain-supply-chain`).

Thesis, verbatim from the book: **supply chain is applied economics.** Every buy,
build and allocation commits capital against a future nobody has seen, and the only
coherent way to judge it is in money. The paper's hook is the book's perfect-forecast
argument: even a flawless forecast does not say which regions to supply when supply is
short, because describing what will happen and deciding what to do are different
questions.

| File | What it is |
|---|---|
| `field-note-02.html` | The paper. Content and typesetting live here — edit this, not the PDF. |
| `field-note-02.pdf` | Rendered output, Letter, 4pp. |
| `render.js` | Headless Chromium print job that turns the HTML into the PDF. |

## Hard constraints — read before editing

**Never cite Lokad or Joannes Vermorel in this paper.** The manuscript names them zero
times across all chapters, front matter, back matter and bibliography, and that is a
deliberate authorial choice: aligned with and inspired by that body of work, original
and uncited. An earlier draft of this paper credited them explicitly in the method
note and the colophon. That was wrong and has been removed. The convergence is
substantive, so do not present the book or the paper as responding to a named source.

Positions the paper commits to, all of them the book's own:

- **The safety-stock formula is a named enemy**, specifically because it takes the
  service level as an *input*, which inverts the logic the argument is building.
- **No class-based repair.** ABC sorts by revenue volume, which is not economic
  importance — the 75-cent fastener that grounds an aircraft is a C item under every
  rule ABC applies. Cutting a catalog into cost tiers reproduces the same defect at
  higher resolution.
- **A service level is an output**, derived per item from underage and overage. A
  target written into a customer contract stays legitimate as a *constraint* on the
  answer rather than a replacement for the objective.
- **Overrides get logged, not eliminated.** Chapter 17 asks for reconstructable
  recommendations *with logged overrides* so the reasoning survives. An earlier draft
  framed overrides as defects to drive to zero; that is not the book's position.
- **Accuracy metrics are diagnostics, never objectives.** Statistical performance is
  how close the forecast came; decision performance is how much money the decision
  made or lost.
- **Tone stays measured on the classical toolkit.** The book attacks ABC, EOQ, safety
  stock and consensus planning and then says none of them is foolish and none should
  be ripped out on Monday morning. Do not make the paper harsher than its source.

## Structure

The section furniture is the book's, not invented here. Every section opens with a
printed question-and-answer pair and closes with a printed bottom line; the book does
this for all 17 chapters and reprints the pairs in its back matter. The paper also
uses two of the book's boxed devices: a **case card** (decision, costs, ratio,
constraint, outcome at a glance) and a **fieldnote** (questions to take back to the
reader's own numbers).

Register is **firm first-principles** — the economics carry the argument, named
practices are not attacked by name.

## Case material

All five cases are the book's, masked as the book masks them: invented company names,
altered details, modified figures, each drawing on more than one engagement. Mirror
these rather than inventing parallel ones. Figures used here (apparel $118/$52/$21 →
ratio 0.68 → 9,500 on the lot grid; 42,000 against 47,000 with per-region $9/$4,
$7/$5, $11/$3, $6/$6; 95% depot target spanning ratios 0.31 to 1.0000; three
components at 92% → 78% job fill; +$14,400 expected against −$107,000 in the worst
five percent) all trace to the manuscript.

## Rebuilding the PDF

```sh
npm install --no-save playwright-core
node papers/field-note-02-supply-chain-uncertainty/render.js
```

Point `executablePath` in `render.js` at a local Chromium if
`/opt/pw-browsers/chromium` does not exist on your machine.

## Layout notes

- Bitstream Charter, falling back to Liberation Serif then Georgia.
- Two columns via CSS `column-count`, with `column-span: all` on the title block,
  executive conclusion, wide tables and the closing takeaway.
- Running header and `n / 4` footer come from `render.js`, not the HTML.
- Figure 1 (the ranked list and the cut) is inline SVG. Nothing external loads.
- US spelling throughout, matching Field Note 01.
- Re-check the rasterized proofs after any edit; page 1 balances tightly and section
  length changes push the Field Lesson and case card across page boundaries.

## House style

Avoid: paired antithesis ("it is not X, it is Y"), the "X, not Y" fragment, one-line
paragraphs used as dramatic beats, filler intensifiers, em dashes, and uniform bolded
lead-ins repeated down a list. Grep for these after any edit.
