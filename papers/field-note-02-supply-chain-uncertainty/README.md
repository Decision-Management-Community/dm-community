# Field Note 02 — Demand Is Not Weather

A four-page paper in the Bit Bros field note format, written as an argument rather
than a case round-up. Thesis: a large share of what a supply chain calls demand is
the echo of its own decisions — price, assortment, allocation, quoted lead time, and
above all availability — so forecasting it is predicting the consequences of choices
already made. Six anonymized engagements supply the evidence.

| File | What it is |
|---|---|
| `field-note-02.html` | The paper. Content and typesetting live here — edit this, not the PDF. |
| `field-note-02.pdf` | Rendered output, Letter, 4pp. |
| `render.js` | Headless Chromium print job that turns the HTML into the PDF. |

## Doctrine this paper commits to

Written to align with Lokad's quantitative supply chain doctrine, and it cites that
debt in the paper. Anyone editing should keep these commitments intact, because
earlier drafts violated all three:

- **Safety stock is presented as a flawed instrument, not a valid lens.** The formula
  requires normal demand *and* normal lead time, and it provisions each SKU as though
  it owned capital. Vermorel's position is that safety stocks violate basic economics
  by design. Do not reintroduce `SS = z√(...)` as the fix.
- **No class-based repair.** Cutting the catalog into cost tiers is ABC analysis in
  disguise; arbitrary classes hide economic reality. The replacement is prioritized
  ordering: rank every candidate unit by expected dollar return, one list, truncated
  where capital runs out.
- **Overrides are defect reports, not a human-in-the-loop feature.** Lokad's line is
  that overrides reflect a bad numerical recipe. The goal is to drive the rate to
  zero by encoding what is missing, never to build a better console for performing
  them.

Also: accuracy is measured in dollars of error, never percentages, and lead time is
forecast as a distribution and composed with demand.

Register is **firm first-principles** — the economics carry the argument, named
practices are not attacked by name. Section 6 answers the three obvious objections
head-on; keep that, it is what separates an argument from a brochure.

## Rebuilding the PDF

```sh
npm install --no-save playwright-core
node papers/field-note-02-supply-chain-uncertainty/render.js
```

Point `executablePath` in `render.js` at a local Chromium if
`/opt/pw-browsers/chromium` does not exist on your machine.

## Notes on the layout

- Body text is Bitstream Charter, the serif the field note series uses. Falls back to
  Liberation Serif, then Georgia. Install Charter to match Field Note 01.
- Two columns via CSS `column-count`, with `column-span: all` on the title block,
  executive conclusion, wide table, and closing takeaway.
- Running header and `n / 4` footer come from `render.js`, not the HTML.
- Figure 1 (the censoring loop) is inline SVG. Nothing external is loaded.
- Page 1 balances tightly. Adding or cutting a paragraph in section 1 will push the
  Field Lesson box onto page 2 and leave a hole; re-check the render after edits.
- US spelling throughout, matching Field Note 01.

## On the case material

The six engagements are anonymized and two are composites. Any figure specific enough
to identify a client has been changed or removed, and the paper carries no outcome
metrics. Swap in real numbers only where they can be disclosed.

## House style

The series avoids: paired antithesis ("it is not X, it is Y"), the "X, not Y"
fragment, one-line paragraphs used as dramatic beats, filler intensifiers, em dashes,
and uniform bolded lead-ins repeated down a list. Grep for these after any edit.
