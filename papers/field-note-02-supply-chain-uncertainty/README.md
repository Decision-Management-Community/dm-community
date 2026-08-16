# Field Note 02 — Every Supply Chain Already Has an Uncertainty Model

A four-page client learning paper in the Bit Bros field note format, companion to
Field Note 01 (*When Better Models Stop Creating Better Decisions*). Six composite
supply chain engagements, organised around one finding: the buffers already in place
are the organisation's uncertainty model, and nobody wrote it down.

| File | What it is |
|---|---|
| `field-note-02.html` | The paper. Content and typesetting live here — edit this, not the PDF. |
| `field-note-02.pdf` | Rendered output, Letter, 4pp. |
| `render.js` | Headless Chromium print job that turns the HTML into the PDF. |

## Rebuilding the PDF

`render.js` needs `playwright-core` and a Chromium binary. Neither is a dependency of
this site, so install them outside the project or with `npx`:

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

## On the case material

Per the paper's own method note, the six engagements are anonymised and two are
composites. Any figure specific enough to identify a client has been changed or
removed, and the paper carries no outcome metrics. Swap in real numbers only where
they can be disclosed.
