# Field Note 02 — When the Buffer Is the Policy

A four-page client learning paper in the Bit Bros field note format. Six composite
supply chain engagements, organised around one finding: safety stock settings,
planning fences, min/max levels and expedite approvals *are* the operating policy,
and most of them were written during a bad week and never reopened.

Sits between two other things. *The Decision Factory* (DeJans & Elam, 2026) argues
for policies built in calm conditions to run under pressure; this paper documents the
inverse, which is what supply chains mostly contain. Field Note 01, *When Better
Models Stop Creating Better Decisions*, is the general decision-system version of the
same argument.

| File | What it is |
|---|---|
| `field-note-02.html` | The paper. Content and typesetting live here — edit this, not the PDF. |
| `field-note-02.pdf` | Rendered output, Letter, 4pp. |
| `render.js` | Headless Chromium print job that turns the HTML into the PDF. |

## Rebuilding the PDF

`render.js` needs `playwright-core` and a Chromium binary. Neither is a dependency of
this site, so install them outside the project:

```sh
npm install --no-save playwright-core
node papers/field-note-02-supply-chain-uncertainty/render.js
```

Point `executablePath` in `render.js` at a local Chromium if
`/opt/pw-browsers/chromium` does not exist on your machine.

## Notes on the layout

- Body text is Bitstream Charter, the serif the field note series uses. Falls back to
  Liberation Serif, then Georgia. Install Charter for output that matches Field Note 01.
- Two columns via CSS `column-count`, with `column-span: all` on the title block,
  executive conclusion, wide tables, and the closing takeaway.
- The running header and the `n / 4` footer come from `render.js`, not the HTML —
  Chromium supplies them through `headerTemplate` / `footerTemplate`.
- Figure 1 is inline SVG. No external assets, fonts, or scripts are loaded, so the
  HTML renders identically offline.
- Page 1 balances tightly. Adding or cutting a paragraph in section 1 will push the
  Field Lesson box onto page 2 and leave a hole; re-check the render after edits.

## On the case material

The six engagements are anonymised and two are composites, per the paper's own method
note. Any figure specific enough to identify a client has been changed or removed, and
the paper carries no outcome metrics. Swap in real numbers only where they can be
disclosed.

## House style

The series avoids a handful of constructions on purpose: paired antithesis ("it is not
X, it is Y"), the "X, not Y" fragment, one-line paragraphs used as dramatic beats, and
uniform bolded lead-ins repeated down a list. Every case study is deliberately ended a
different way. Worth re-checking after any edit.
