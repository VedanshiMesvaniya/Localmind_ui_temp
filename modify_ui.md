# LocalMind UI Modification Plan

This document converts ui_audit.md into an exact implementation checklist for the LocalMind frontend.

Status: planning document only. No application code is changed by creating this file.

Primary authorities:
- Taste / design-taste-frontend: product-first direction, anti-generic discipline, semantic tokens, restrained cards, touch targets, reduced motion, and audit-before-redesign rules.
- Emil Kowalski / emil-design-eng: purposeful motion, fast feedback, transform/opacity animation, origin-aware popovers, accessible focus, and concrete Before/After review.
- Impeccable: Operate-mode product UI, where scanability, workflow, native behavior, accessibility, and real state matter more than decoration.

## 1. Non-Negotiable Rules

1. The UI product name is LocalMind. Keep Local Mind only where the existing spaced wordmark is intentional. Do not rename the UI to GlobleMind or GlobalMind.
2. Do not change backend endpoints, payloads, response shapes, store contracts, provider routing, ingestion behavior, SQL validation, streaming, document identity, or export behavior.
3. Do not delete provider selection, provider health, token usage, thinking trace, citations, SQL result cards, Markdown tables, Mermaid diagrams, upload, replace, delete, ingestion stages, theme selection, schema sync, chat management, export, feedback, edit, regenerate, or stop-generation.
4. Remove the About page from the frontend only. Do not remove backend or API behavior.
5. Remove all visible demo language: Loading demo data, Waiting for demo chat data, and static demo data.
6. LocalMind_UI is the source tree. Never hand-edit generated frontend bundles.
7. Do not install a new UI library. Keep the current React, Zustand, Framer Motion, Lucide, Sonner, Hanken Grotesk, and JetBrains Mono dependencies.
8. Every change must preserve the working frontend/backend connection.

## 2. Design Direction

### Concept

Evidence Relay Workbench.

LocalMind routes a question across private documents and structured database data, validates the path, and returns an answer with inspectable evidence. The visual language must make those two evidence channels and the resulting answer legible.

### Product character

Analytical, explainable, operational, private, resourceful, evidence-led.

### Design dials

| Dial | Value | Reason |
| --- | ---: | --- |
| Design variance | 4/10 | A repeatable workbench is more useful than expressive layouts. |
| Visual density | 7/10 | Documents, SQL results, metadata, and provider status need dense scanning. |
| Motion intensity | 3/10 | Motion is reserved for state, continuity, processing, and feedback. |

### Signature

Cool archival neutrals, graphite text, evidence rails, compact metadata, structured result rows, and one mineral-verdigris relay accent. Do not use generic AI purple, SaaS blue, glowing borders, decorative AI effects, or a brown Claude-like visual language.

## 3. Exact Color System

Replace the semantic token values in LocalMind_UI/src/styles/globals.css. Keep variable names where possible.

### Light theme

~~~css
:root,
:root[data-theme-mode='light'] {
  color-scheme: light;
  --brand-900: #063F3A;
  --brand-800: #0B514B;
  --brand-700: #0F6B62;
  --brand-600: #1B7D72;
  --brand-500: #2B9182;
  --brand-400: #5CB7A4;
  --brand-300: #98D3C5;
  --brand-200: #C3E5DC;
  --brand-100: #E2F2ED;
  --brand-50: #F3FBF8;

  --primary: #0F6B62;
  --primary-hover: #0B514B;
  --primary-soft: #DCEFEA;
  --primary-border: #0F6B62;
  --bg: #F2F5F3;
  --bg-soft: #EDF2F0;
  --panel: #FBFCFA;
  --panel-strong: #FFFFFF;
  --panel-border: #D6DFDD;
  --panel-border-strong: #B9C8C5;
  --text-primary: #182225;
  --text-secondary: #435255;
  --text-muted: #667578;
  --icon-primary: #263639;
  --icon-secondary: #596A6C;
  --input-bg: #FFFFFF;
  --input-border: #B9C8C5;
  --focus-ring: #0F6B62;
  --divider: #E3EAE8;
  --accent: #0F6B62;
  --accent-strong: #0B514B;
  --accent-on: #FFFFFF;
  --accent-soft: #DCEFEA;
  --cta-bg: #0F6B62;
  --cta-on: #FFFFFF;
  --success: #2F6B52;
  --warning: #8A5A22;
  --danger: #A43D3A;
  --info: #3C6573;
  --shadow: 0 12px 30px -18px rgba(24, 34, 37, 0.28);
  --radius-xl: 12px;
  --radius-lg: 10px;
  --radius-md: 8px;
  --radius-sm: 6px;
  --sidebar-width: 248px;
  --font-ui: 'Hanken Grotesk', system-ui, sans-serif;
  --font-body: 'Hanken Grotesk', system-ui, sans-serif;
  --font-display: 'Hanken Grotesk', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace;
  --text-xs: 12px;
  --text-sm: 13px;
  --text-md: 14px;
  --text-base: 15px;
  --text-lg: 18px;
  --text-xl: 20px;
  --text-2xl: 28px;
  --text-hero: 32px;
  --sidebar-bg: #FCFDFC;
  --composer-bg: #FFFFFF;
  --chat-item-active-bg: #DCEFEA;
  --placeholder-color: #667578;
}
~~~

### Dark theme

~~~css
:root[data-theme='dark'],
:root[data-theme-mode='dark'] {
  color-scheme: dark;
  --bg: #101718;
  --bg-soft: #131C1D;
  --panel: #172122;
  --panel-strong: #1D2A2B;
  --panel-border: #304041;
  --panel-border-strong: #46595A;
  --text-primary: #E8F0ED;
  --text-secondary: #B9C9C5;
  --text-muted: #8EA39E;
  --icon-primary: #D5E2DE;
  --icon-secondary: #9DB0AB;
  --input-bg: #172122;
  --input-border: #46595A;
  --focus-ring: #5CB7A4;
  --divider: #263536;
  --primary: #5CB7A4;
  --primary-hover: #78CDB8;
  --primary-soft: #193E38;
  --primary-border: #5CB7A4;
  --accent: #5CB7A4;
  --accent-strong: #78CDB8;
  --accent-on: #101718;
  --accent-soft: #193E38;
  --cta-bg: #5CB7A4;
  --cta-on: #101718;
  --success: #70B08F;
  --warning: #D29A58;
  --danger: #E17D76;
  --info: #86B6C0;
  --shadow: 0 16px 36px -20px rgba(0, 0, 0, 0.65);
  --sidebar-bg: #121B1C;
  --composer-bg: #1D2A2B;
  --chat-item-active-bg: #193E38;
  --placeholder-color: #8EA39E;
}
~~~

Use 82-88% neutrals, 8-12% relay accent, and 3-6% semantic states. Never use color alone for state. Remove decorative gradients from body, sidebar, composer, and dialogs.

## 4. Exact Typography

Keep Hanken Grotesk and JetBrains Mono. Remove Newsreader from the design system and remove the external Google Fonts stylesheet/preconnect tags from LocalMind_UI/index.html.

Set --font-display to Hanken Grotesk. Use:

| Element | Exact target |
| --- | --- |
| Page title | 28px / 1.2 / 600 / -0.02em |
| Section title | 20px / 1.3 / 600 |
| Answer heading | 20px / 1.3 / 600 |
| Body answer | 15px / 1.6 / 400 |
| Button | 14px / 1.2 / 600 |
| Metadata | 12px / 1.4 / 500 |
| SQL/table | JetBrains Mono, 13px / 1.5 |

Use uppercase tracking only for short labels such as RECENT CHATS, SOURCES, and INGESTION STAGES.

## 5. Exact Brand and Logo

### Naming

Set the browser title in LocalMind_UI/index.html to:

~~~html
<title>LocalMind</title>
~~~

Do not rename backend/repository identifiers in this UI task.

### Mark concept

Two evidence channels enter a relay and leave as one validated answer:

- Left rail: uploaded documents.
- Right rail: structured database records.
- Center bridge: validated answer.
- Open negative space: inspectable evidence, not a hidden brain.

Do not use nodes, brain, sparkle, robot, chat bubble, circuit traces, database cylinder, or infinity symbol.

### Exact geometry

Use a 32x32 viewBox:

- Left rail: (8,7) to (8,21), stroke 2.6.
- Right rail: (24,7) to (24,21), stroke 2.6.
- Inward connectors: left (8,21) to (13,24), right (24,21) to (19,24).
- Answer bridge: (13,24) to (19,24), stroke 3.
- Rounded line caps, round joins, no endpoint circles, open top.
- Source rails use currentColor.
- Light bridge: #0F6B62.
- Dark bridge: #5CB7A4.
- Monochrome: all currentColor.

Conceptual SVG:

~~~svg
<svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
  <path d="M8 7V21L13 24H19L24 21V7" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M13 24H19" stroke="#0F6B62" stroke-width="3" stroke-linecap="round"/>
</svg>
~~~

### Variants

1. Sidebar: 20px mark + Local Mind + Private data intelligence.
2. Compact sidebar: 20px mark + wordmark, no subtitle.
3. Collapsed rail: symbol only.
4. Favicon/app icon: symbol only.
5. Print/PDF: monochrome.
6. Light: graphite rails and #0F6B62 bridge.
7. Dark: #E8F0ED rails and #5CB7A4 bridge.

At 16px, simplify to two rails and one solid bridge if the inward connectors collapse. Keep favicon filenames unchanged.

## 6. Exact Copy and About Removal

### Remove demo wording

Loader.jsx:
~~~jsx
export default function Loader({ label = 'Loading your workspace' }) {
~~~

Chat.jsx:
~~~jsx
toast.info('Loading your chats.')
~~~

InputBox.jsx:
~~~jsx
placeholder = 'Ask about your documents or connected data...'
~~~

Documents.jsx upload label:
~~~jsx
isUploading ? 'Processing…' : 'Upload document'
~~~

Chat empty heading:
~~~text
Ask about your documents or data
~~~

Replace empty feature cards with task starters:
~~~text
Search the knowledge base
Find an answer across uploaded documents.

Query connected data
Ask for counts, totals, trends, or comparisons.

Trace an answer
See which documents or database records support it.

Open Documents
Upload or inspect the source material.
~~~

Documents description:
~~~text
Add source material for LocalMind to search and analyze.
~~~

Documents empty detail:
~~~text
Select a document to inspect its metadata, or upload one to watch processing live.
~~~

Upload error:
~~~text
Upload failed. Try another file or retry.
~~~

Thinking label:
~~~text
How this answer was assembled
~~~

The task starters must use the existing draft/send behavior only. Do not add an API.

### Remove About page

1. Delete LocalMind_UI/src/pages/About.jsx.
2. Remove the About import from App.jsx.
3. Remove the about route from App.jsx.
4. Remove any About navigation item in Sidebar.jsx or collapsed rail.
5. Keep wildcard redirect and all backend/store/API behavior.

## 7. Exact Layout and Components

### Sidebar and shell

~~~css
:root {
  --sidebar-width: 248px;
}

.sidebar {
  padding: 16px 12px 12px;
  gap: 12px;
}

.nav-item,
.chat-item {
  min-height: 40px;
  border-radius: 8px;
}
~~~

Keep the collapsed rail 56px. Active navigation uses var(--accent-soft), primary text, and at most a 2px relay rail. Do not make the sidebar wider.

### Header

~~~css
.header {
  min-height: 56px;
  padding: 8px 20px;
}
~~~

Keep mobile toggle and both export modes. At wide widths show Export conversation text or provide a reliable tooltip.

### Chat

- Answer max-width: 760px.
- User message max-width: 640px.
- Message group gap: 24px.
- Ordinary assistant messages have no outer card border.
- User message uses var(--primary-soft).
- Source/route summary appears below the answer and before token/thinking details.
- Keep SQL, citations, tables, Mermaid, thinking, token usage, feedback, edit, copy, regenerate, and versions.

### Composer

Keep provider selector, mode selector, send, stop, cooldown, and submit behavior.

~~~css
.composer__shell {
  min-height: 96px;
  padding: 16px;
  border-radius: 12px;
  background: var(--composer-bg);
  border: 1px solid var(--panel-border);
}

.composer__send,
.composer__stop {
  width: 40px;
  height: 40px;
}
~~~

Use 44px on mobile.

### Documents

- Row minimum height 56px.
- Filename is primary; type, size, chunks, date, and versions are metadata.
- Use dividers rather than a shadowed card around every row.
- Desktop is list plus detail panel. Mobile is list then detail.

### Settings

Keep Dark, Light, System, and schema sync. Replace decorative section rules with real grouping. Use a functional appearance icon rather than Sparkles if the existing Lucide set provides one. Add visible sync status without changing the store action.

## 8. Document Row and Dialog Correctness

Current .doc-row is a button containing replace and delete buttons. Replace it with an article/div row, a dedicated selection button, and sibling action buttons.

~~~jsx
<article className="doc-row">
  <button type="button" className="doc-row__select" aria-label="Inspect document">
    <FileText size={18} aria-hidden="true" />
    <span className="doc-row__body">...</span>
  </button>
  <div className="doc-row__actions">
    <button type="button" aria-label="Replace document">...</button>
    <button type="button" aria-label="Delete document">...</button>
  </div>
</article>
~~~

Keep replaceDocument, deleteDocument, selectDocument, busyId, deleteTarget, file inputs, and confirmation logic.

For rename/delete dialogs in Sidebar.jsx and Documents.jsx:

1. Add ids to title and description.
2. Add aria-labelledby and aria-describedby.
3. Focus the first useful control on open.
4. Close on Escape.
5. Trap focus.
6. Return focus to the opening trigger.
7. Keep destructive confirmation.

## 9. Exact Accessibility and Sizing

Add to globals.css:

~~~css
:where(button, a, input, textarea, select, [role='button'], [role='menuitem'], [tabindex='0']):focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--focus-ring) 22%, transparent);
}
~~~

Targets:

- Default icon button: 40px square.
- Mobile icon button: 44px square.
- Chat menu trigger wrapper: 40px, not 24px.
- Sidebar rail button: 40px, not 38px.
- Composer send/stop: 40px desktop, 44px mobile.
- Cooldown indicator: minimum 40px, not 28px.

Do not keep outline:none without this replacement. Add accessible names to every icon-only action. Pair status colors with text labels.

## 10. Provider, Token, and Toggle Preservation

### Provider

Keep active provider, picker, health, usage, refresh, model, role, cooling, warning, critical, and healthy states.

Visual changes:
- Active control minimum 40px.
- Usage popover uses solid var(--panel-strong), 8px radius, 1px border.
- Add text Healthy, Warning, Cooling, or Critical beside the status dot.
- Keep popover anchored to its trigger.
- Do not use status colors outside actual health.

### Token usage

Keep total, input/output/cache/reasoning breakdowns, expandable details, metadata, and values.

Visual changes:
- Put it below answer and source provenance.
- Use JetBrains Mono for numbers.
- Track color var(--divider).
- Active/total segment uses relay accent.
- Collapsed control is at least 40px.
- Visible label is Usage or Token usage, not an icon alone.

### Mode/theme/schema

Keep ModeSelector and Dark/Light/System. Selected state uses var(--accent-soft), aria-checked, and visible focus.

Keep schema sync and backend call. Visible states:
- Sync database schema
- Syncing schema…
- Schema sync complete
- Schema sync failed. Retry.

## 11. Motion

### Keep/add

| Interaction | Property | Duration | Easing | Purpose |
| --- | --- | ---: | --- | --- |
| Button press | transform scale(0.98) | 100-160ms | cubic-bezier(0.23, 1, 0.32, 1) | Tactile confirmation. |
| Menu open | opacity + translateY(4px) | 150-200ms | ease-out curve above | Trigger relationship. |
| Dialog open | opacity + translateY(6px) | 200ms | ease-out | Context continuity. |
| Ingestion stage | icon opacity/transform + state color | 160-220ms | ease-out | Pipeline feedback. |
| Toast | edge translate + opacity | 180-240ms | ease-out | Spatial continuity. |

### Remove

- Chat title marquee. Use ellipsis.
- Width/height/margin/padding animation for routine states.
- Excessive route-entry motion.
- Message staggering in long chats.
- Animation on keyboard-driven actions.
- Skeleton shimmer when nothing is loading.

Add prefers-reduced-motion behavior for shimmer, typing cursor, transitions, and smooth scroll. Preserve state changes.

## 12. Responsive Rules

| Width | Required behavior |
| --- | --- |
| >= 1024px | 248px sidebar, 56px collapsed rail, two-column Documents, 760px chat column. |
| 768px-1023px | Drawer/collapsed rail, detail below list when needed, local table overflow. |
| < 768px | Full-height sidebar drawer, 16px page padding, 44px targets, composer above keyboard, actions visible without hover. |
| < 480px | Stack provider/mode controls, send remains visible, table overflow local, no body-wide horizontal overflow. |

## 13. File-by-File Changes

### index.html

- Set title to LocalMind.
- Remove external font link/preconnect.
- Keep favicon and apple-touch-icon paths.
- Set theme-color #F2F5F3.

### main.jsx

- Keep local Hanken and JetBrains imports.
- Add no dependencies.

### App.jsx

- Remove About import and route.
- Keep wildcard redirect and Toaster.
- Replace Toaster hard-coded rgba values with semantic tokens where supported.

### BrandMark.jsx

- Replace node mesh with relay geometry.
- Preserve size, className, viewBox, currentColor, aria-hidden, and component API.

### Sidebar.jsx

- Add BrandMark to lockup.
- Keep New chat, Documents, Recent chats, Pinned, Settings, collapse, pin, rename, delete, and mobile close.
- Show chat menu trigger on focus/menu-open, not hover only.
- Use 40px action wrappers.
- Complete dialog accessibility.
- Remove About navigation if present.

### Header.jsx

- Keep mobile toggle and both export actions.
- Add Export conversation text at wide widths or tooltip.
- Use new tokens.

### Chat.jsx

- Keep streaming, stop, cooldown, drafts, messages, and provider/mode footer.
- Replace demo toast.
- Replace feature cards with task starters.
- Keep existing draft/send API flow.
- Put source/route before telemetry.
- Honor reduced motion in auto-scroll.

### InputBox.jsx

- Keep autosize, Enter submit, Shift+Enter newline, stop, cooldown, disabled, and submit.
- Replace placeholder.
- Replace inline cooldown colors with variables.
- Raise send/stop/cooldown targets.
- Keep footer slots.

### Message.jsx

- Keep Markdown, citations, SQL, tables, Mermaid, ingestion, thinking, token, feedback, edit, versions, copy, regenerate.
- Change visual hierarchy only.
- Do not remove query disclosure or citations.
- Avoid an outer card around every assistant message.

### ProviderStatus.jsx

- Keep all picker, health, usage, refresh, model, role, cooling, warning, critical states and store/API calls.
- Replace decorative smart cards with a compact operational popover.

### TokenUsage.jsx

- Keep all totals, breakdowns, expansion, metadata, and values.
- Use mono values and semantic bars.
- Do not delete or permanently hide it.

### ThinkingTrace.jsx

- Keep live and expandable behavior.
- Rename label.
- Collapse after completion.

### Loader.jsx

- Replace default label.
- Keep role=status and aria-live=polite.
- Add reduced motion.

### Button.jsx/Card.jsx

- Keep APIs and variants.
- Normalize visual tokens.
- Stop using Card as the default wrapper for every block.

### Documents.jsx

- Keep upload, replace, delete, select, progress, summary metadata, version count, and input behavior.
- Apply non-nested row structure.
- Add accessible names.
- Replace copy.
- Preserve live-stage versus historical-summary honesty.

### Settings.jsx

- Keep themes and schema sync.
- Replace decorative icon/rules.
- Add visible sync status without changing action.

### About.jsx

- Delete as requested.
- Remove route/import/navigation references only.

### globals.css

- Replace tokens.
- Remove application-surface gradients.
- Keep loading shimmer only while loading.
- Add focus-visible.
- Normalize controls, radii, active states, targets, responsive behavior, reduced motion.
- Remove marquee.

### markdown.css

- Keep Markdown behavior.
- Hanken prose, JetBrains Mono code/table values.
- Semantic borders/text.
- Local result-table overflow.

### theme.js

- Keep theme resolution and system preference.
- Do not delete System.
- Confirm variables apply to data-theme and data-theme-mode.

### Public icons

Replace favicon.svg, icon-192.png, icon-512.png, and apple-touch-icon.png only after relay geometry approval. Keep filenames and paths.

## 14. Remove vs Add

### Remove

- About route/component.
- All demo wording.
- Node-network/brain logo interpretation.
- External Google Fonts.
- Newsreader UI identity.
- Decorative gradients.
- Chat title marquee.
- Hover-only essential actions.
- Nested document buttons.
- Raw Check server logs instruction.

### Add

- Evidence Relay Workbench tokens.
- Exact light/dark palette.
- Focus-visible contract.
- Accessible document row.
- Complete dialog contract.
- Evidence-aware empty state.
- Contextual loading/success/error copy.
- Source/route hierarchy.
- Relay logo/favicon variants.
- 40-44px targets.
- Reduced-motion policy.
- Mobile drawer/list/detail behavior.
- Provider status text.
- Token Usage label and mono values.

Do not remove provider settings, token details, citations, database results, ingestion stages, or theme toggles.

## 15. What Must Stay Working

| Feature | Preserve | Change only |
| --- | --- | --- |
| Chat streaming | SSE/stream, stop, cooldown | Calm state presentation. |
| Provider | Picker, health, usage, refresh, models, roles | Secondary but inspectable control. |
| Tokens | Total and breakdown details | Below answer/source; mono values. |
| Thinking | Live trace and collapse | Rename and collapse after completion. |
| Citations | Parsing and references | Stronger source strip. |
| SQL | Query, columns, rows, empty state | Evidence table styling/local overflow. |
| Mermaid | Existing renderer | Document semantic chart colors. |
| Upload | File input and ingestion calls | Copy/progress only. |
| Replace/delete | Store calls and confirmation | Semantics and accessibility. |
| Theme | Dark, Light, System | New tokens. |
| Schema sync | Existing backend call | Running/success/error status. |
| Export | Transcript/professional document | Discoverability only. |
| Chat management | New, pin, rename, delete | Target sizes and focus. |

## 16. Priority and Implementation Order

### P0: correctness, identity, accessibility

1. Preserve LocalMind naming in UI; do not rename repository/backend here.
2. Remove About route/component and visible references.
3. Remove all demo wording.
4. Fix nested document buttons while preserving store actions.
5. Add focus-visible styling and complete dialogs.
6. Verify provider, token, theme, schema, upload, chat, and export contracts.

### P1: product hierarchy and visual system

7. Replace semantic tokens with the exact palette.
8. Replace BrandMark geometry and favicon assets.
9. Rework chat empty state and answer/source hierarchy.
10. Rebalance sidebar, composer, documents, and settings surfaces.
11. Normalize control sizes and responsive layouts.

### P2: interaction quality

12. Apply motion rules and remove marquee/layout-property animation.
13. Add reduced-motion behavior.
14. Refine provider popover, token usage, thinking trace, tables, and Mermaid styling.

### P3: verification polish

15. Validate light/dark contrast.
16. Validate keyboard flow and focus return.
17. Validate desktop/tablet/mobile rendered layouts.
18. Run frontend lint/build only after source changes are authorized.
19. Scan generated output for conflict markers and confirm backend/frontend API paths were not changed.

## 17. Verification Checklist

### Safety

- [ ] UI still uses LocalMind.
- [ ] No backend files changed.
- [ ] No API path or request/response shape changed.
- [ ] No store action renamed or removed.
- [ ] Provider settings and usage work.
- [ ] Token usage is visible.
- [ ] Theme toggles work.
- [ ] Chat streaming, stop, cooldown, citations, SQL, tables, Mermaid, upload, replace, delete, ingestion, schema sync, export, pin, rename, and delete work.

### Identity

- [ ] No demo language remains.
- [ ] Logo is the two-channel relay, not a node mesh.
- [ ] Favicon is legible at 16px.
- [ ] Light/dark marks use defined colors.
- [ ] Accent is a signal, not decoration.

### Accessibility

- [ ] No nested buttons.
- [ ] Every dialog has label, description, Escape, focus trap, and focus return.
- [ ] Focus ring works in both themes.
- [ ] Icon actions have accessible names.
- [ ] Status is not color-only.
- [ ] Targets are 40px, 44px on mobile.
- [ ] Reduced motion is honored.

### Responsive

- [ ] Sidebar drawer works below 768px.
- [ ] Documents list/detail works on mobile.
- [ ] SQL tables scroll locally.
- [ ] Composer works above mobile keyboard.
- [ ] No page-wide horizontal overflow.
- [ ] Provider, mode, token, and export controls remain reachable.

### Build safety

- [ ] Only approved frontend files changed.
- [ ] LocalMind_UI remains build source.
- [ ] Generated frontend is rebuilt only after source verification.
- [ ] Generated files contain no conflict markers.
- [ ] Build/lint results are separated from runtime/browser verification.

## 18. Final Rule

Implement this plan as a product-specific LocalMind workbench, not as a generic modernization. The finished UI should show two evidence channels arriving at one answer, keep provider and token telemetry available, preserve every backend-connected feature, remove only the requested About page and generic/demo visual language, and use motion only to explain state and continuity.
