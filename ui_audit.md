# UI Audit

Audit date: 2026-09-14  
Scope: source and asset audit of `LocalMind_UI`, the generated `frontend` shell, product documentation, and the existing untracked `ui_details/audit.md` as cross-check evidence.  
Authority: Taste / `design-taste-frontend`, Emil Kowalski / `emil-design-eng`, and Impeccable.

This is an audit-only document. No application code, CSS, configuration, dependency, or asset was changed. The only requested artifact is this file.

## 1. Product Understanding

### What the product is

The repository describes GlobleMind, presented in the UI as Local Mind, as a private data-intelligence workspace. It combines:

- Retrieval-Augmented Generation over uploaded PDF, DOCX, PPTX, spreadsheet, CSV, JSON, HTML, and text files.
- Natural-language questions over a live SQLite or MySQL database through a read-only Text-to-SQL route.
- Hybrid document retrieval, SQL retrieval, reranking, citation generation, Markdown tables, and Mermaid diagrams.
- Multi-provider routing across Gemini, Groq, NVIDIA NIM, OpenRouter, and Jina, with fallback and rate-limit handling.
- A persistent chat workspace, document library, ingestion progress, provider controls, theme settings, schema sync, and PDF/report export.

The important product fact is that this is not only a chat assistant. It is an evidence-routing system. A user asks a question; the system decides whether the answer belongs in documents, structured data, both, or nowhere; it validates the database query; then returns an answer with supporting evidence.

### Users and jobs

The likely primary user is a technical analyst, engineer, operations user, or business investigator working with private enterprise documents and ERP-style data. The user is not primarily browsing a dashboard. They are trying to:

1. Ask a question in ordinary language.
2. Understand whether the answer came from documents, structured data, or both.
3. Inspect enough provenance to trust the answer.
4. Upload, replace, monitor, and remove the source material that makes future answers useful.
5. Switch or inspect providers only when operational behavior requires it.

The highest-value information is therefore answer clarity, source provenance, database-result legibility, ingestion state, query safety, and system availability. Decorative AI personality is secondary.

### Product modes

| Mode | Evidence | Design consequence |
| --- | --- | --- |
| Conversational investigation | `Chat.jsx`, `Message.jsx`, streaming, citations, thinking trace | Reading width and evidence hierarchy matter more than chat-bubble novelty. |
| Document operations | `Documents.jsx`, upload, replace, delete, 14-stage progress | Use a precise operational list and honest progress states. |
| System configuration | `Settings.jsx`, theme, schema sync | Explain impact before action; do not bury consequential actions in decorative cards. |
| System inspection | `ProviderStatus.jsx`, token usage, status popovers | Treat telemetry as operational evidence, not as dashboard decoration. |

### Trust requirements

Trust is unusually important. The README explicitly claims AST-level SQL validation, read-only execution, adversarial defenses, citations, provider fallback, and benchmark results. The UI should make these claims tangible through provenance and state visibility. It should never imply a fabricated ingestion history, hidden provider behavior, or certainty where a result is incomplete.

### Product character

Analytical, explainable, operational, private, resourceful, and evidence-led.

These are visual requirements, not adjectives for a marketing page:

- Analytical means structured relationships, readable tables, and clear hierarchy.
- Explainable means source and route information is available without overwhelming the answer.
- Operational means controls expose state and recovery, especially upload, provider, and schema-sync actions.
- Private means restrained, non-performative branding and no noisy surveillance-dashboard aesthetic.
- Resourceful means the interface communicates graceful fallback and useful next actions.
- Evidence-led means provenance has first-class visual status.

## 2. Product Design Read

### User character

An investigator with a question, a source corpus, and a need to verify the answer. This user may be technical enough to care about SQL, schema, provider limits, and token use, but does not want to operate the entire pipeline manually for every question.

### Visual personality

- Intensity: restrained, with moments of high emphasis around active processing, errors, and source evidence.
- Density: medium-high in documents, database results, and provider details; medium in chat reading.
- Warmth: neutral foundation with one human, material accent. Avoid both sterile blue SaaS and cozy lifestyle softness.
- Technical vs human: technical structure with plain-language labels.
- Expressive vs utilitarian: utilitarian first; identity comes from evidence relationships and material details.
- Geometric vs organic: mostly geometric rows, rails, and brackets; a slight irregularity in the brand mark can humanize it.
- Editorial vs utilitarian: utilitarian interface with archival/editorial discipline in typography and spacing, not editorial decoration.
- Static vs dynamic: mostly calm, with motion reserved for processing, state change, and continuity.

### Design dials

| Dial | Rating | Reason |
| --- | ---: | --- |
| Design variance | 4/10 | The product needs a repeatable workbench, not expressive asymmetry. Distinction should come from evidence structure, not novelty in every screen. |
| Visual density | 7/10 | Users inspect chats, source metadata, SQL tables, ingestion stages, and provider telemetry. Excessive whitespace would hide useful context. Density must remain scannable. |
| Motion intensity | 3/10 | Streaming and ingestion need feedback, but frequent navigation, chat list actions, and provider inspection should feel immediate. |

## 3. Product-Specific Visual Concept

### Concept name: Evidence Relay Workbench

The interface should feel like a workbench where two evidence channels, private documents and structured database records, are routed through one controlled relay into an answer. The relay is the product's own visual idea. It is more specific than “AI workspace” and does not depend on a brain, sparkle, node graph, or generic chatbot metaphor.

### Why it fits

The backend is organized around routing, validation, retrieval, reranking, generation, and fallback. The frontend already exposes documents, SQL results, citations, thinking stages, provider status, and ingestion stages. A relay/workbench concept can unify those existing workflows without inventing a new feature.

### Visual principles

1. Show evidence relationships, not technological spectacle. Use source labels, route labels, table headers, and progress rails where they answer real questions.
2. Prefer rows, rules, and selected surfaces over a field of floating cards. Elevation should mean “this requires attention” or “this is a temporary control.”
3. Make the answer calm and the provenance inspectable. The response is the primary surface; details expand around it.
4. Use one recognizable material accent against quiet neutrals. Color marks action, selection, confidence, and state, not every component.
5. Keep operational language literal. “Upload document,” “Schema sync,” “Source,” “SQL result,” and “Retry upload” are stronger than atmospheric AI copy.
6. Let the system's real duality become the identity: paper-like document evidence and tabular database evidence, joined by one relay mark.

### Differentiation

The product should be recognizable by a consistent combination of evidence rails, source labels, compact metadata, structured result tables, and a restrained oxidized-copper signal accent. A competitor could copy the color; copying the full relationship between document evidence, SQL evidence, route state, and operational controls would be harder. The current interface does not yet reach that level of ownership because its most visible patterns are a generic sidebar, a generic chat empty state, generic cards, and a node-network AI mark.

## 4. Current UI Verdict

The current UI is a serious prototype with meaningful product-specific functionality, but its visual system is not yet a coherent product identity.

### Strongest qualities

- The architecture maps real workflows to distinct routes: chat, documents, settings, and about.
- The implementation has honest concepts such as live ingestion stages versus aggregate historical metadata in `Documents.jsx`.
- The message surface supports Markdown, citations, SQL result cards, tables, Mermaid diagrams, thinking traces, token usage, feedback, editing, and regeneration.
- Theme tokens, self-hosted Hanken Grotesk and JetBrains Mono imports, reduced-size loading skeletons, and semantic state classes show design-system intent.
- The warm palette is more distinctive than default AI purple and has a plausible relationship to privacy and human-readable knowledge work.

### Main weaknesses

- “GlobleMind” in repository documentation and “Local Mind” in the UI create a brand trust problem before visual refinement begins.
- The current palette, type stack, gradients, rounded surfaces, and network mark communicate a mixture of warm editorial product, generic AI assistant, and soft SaaS app.
- The current empty chat sells features instead of helping the user take the first evidence action.
- Small controls, hidden hover-only actions, missing global focus treatment, nested buttons, and incomplete dialogs make the workbench fragile for keyboard and touch users.
- The visual hierarchy is inverted in places: ordinary content is boxed, while provenance and route information can become secondary details.
- The code contains contradictory product language: README describes a live enterprise system, while `About.jsx` says “static demo data for now” and `Loader.jsx` says “Loading demo data.”

### Category-reflex answer

Yes, a user could mistake the current interface for a generic AI/SaaS product. The reasons are not primarily the color. They are the generic three-card empty state, generic assistant/user message pattern, node-network logo, sparkle icon in Settings, rounded utility chips, repeated bordered containers, provider “smart cards,” and a sidebar that follows familiar chat-app conventions without making evidence routing visible.

The remedy is not to swap terracotta for blue or green. The remedy is to make evidence provenance, source routing, and operational state the visual grammar.

## 5. Overall Score

Scores are source-based. They measure the current implementation, not the proposed direction.

| Area | Score / 10 | Evidence-based assessment |
| --- | ---: | --- |
| Product fit | 6.5 | Real workflows are present, but the visual hierarchy does not yet foreground evidence. |
| Visual identity | 5.0 | Warm and intentional in places, but multiple visual languages compete. |
| Brand differentiation | 4.0 | Local Mind, GlobleMind, generic mesh mark, and generic chat patterns are not ownable enough. |
| Color | 6.0 | The warm palette is distinctive and tokenized, but muted contrast and semantic drift weaken it. |
| Typography | 6.0 | Hanken plus JetBrains is a sound base; Newsreader and external font loading create unnecessary split identity. |
| Layout | 6.0 | The shell is understandable; the chat/document hierarchy needs more purposeful density. |
| UX | 5.5 | Core jobs are discoverable, but empty, loading, error, and recovery language is inconsistent. |
| Components | 5.0 | Components exist, but radii, targets, surfaces, and status patterns drift. |
| Interaction | 4.5 | Hover and motion exist, but keyboard, dialog, touch, and focus contracts are incomplete. |
| Motion | 4.5 | Motion is present but not governed by a single frequency-and-purpose rule. |
| Accessibility | 4.0 | Nested buttons, small targets, weak focus evidence, and incomplete dialogs are P0/P1 issues. |
| Responsive design | 4.5 | Responsive rules exist, but mobile workflow quality and touch sizing need validation and redesign. |
| Consistency | 4.5 | Tokens exist, while hard-coded colors, gradients, and multiple surface treatments remain. |
| Overall polish | 5.3 | Capable prototype, not yet a finished product identity. |

## 6. Color Identity Audit

### Current system

The primary source is `LocalMind_UI/src/styles/globals.css`, especially lines 9-67 and 88-157.

| Role | Current value / treatment | Assessment |
| --- | --- | --- |
| Background | `#faf7f4`; dark `#151515` | Warm paper-like light background and neutral dark background. Distinctive, but light mode reads lifestyle/editorial more than evidence workbench. |
| Surface | `#fffcf9`, `#ffffff`; dark `#1b1b1a`, `#20201f` | Legible hierarchy, though many surfaces are separately boxed. |
| Primary | `#a85d3f` | Human, material, and less generic than blue/purple. It can belong, but current usage is not sufficiently restrained. |
| Primary hover | `#914b32` | Sensible darker state. |
| Soft accent | `#f1ded5` | Pleasant selected-state tint, but reinforces the warm editorial reading. |
| Text | `#171513`; dark `#e8e6e1` | Strong enough in principle. |
| Secondary text | `#756d68`; dark `#b2b0aa` | Generally usable, but mixed hard-coded values make the hierarchy unreliable. |
| Muted text | `#9a918b`; dark `#7d7c76` | Likely too low-contrast for normal-size metadata on light backgrounds. Treat as a likely WCAG failure until measured in the actual pair. |
| Border | `#ded7d1`, `#c9bfb8`; dark `#383836`, `#4a4945` | Borders are available, but applied too broadly. |
| Status | Success `#4f7a5a`, warning `#a8753d`, danger `#a84d42`, info `#55758a` | Plausible muted semantics, but JSX and component styles also contain hard-coded status colors. |
| Accent effects | Body radial gradients, dark sidebar gradients, skeleton shimmer, modal/composer gradients | Some effects support depth; most do not communicate product state. |

### Does the current color system belong to this product?

PARTIALLY.

The warm terracotta direction can belong to a private evidence workspace because it feels human, material, and less interchangeable than default AI purple. The problem is not that it is warm. The problem is that the surrounding cream, Newsreader reference, gradients, and soft card treatment make it look like a lifestyle/editorial product while the content is technical and operational. The current palette also does not make evidence provenance legible enough because semantic state, primary action, selection, and decoration compete.

### Contrast findings

The likely highest-risk pair is light muted text `#9a918b` over `#faf7f4`; it is visibly pale and should not be used for essential metadata or instructions. The primary action must be tested as a complete pair, not judged by the hue alone. The proposed system below intentionally uses a darker accent for filled actions and a darker slate for metadata. Exact browser contrast verification should be part of implementation QA.

## 7. Recommended Color System

### Color concept: archival paper, graphite, and one relay signal

Keep a quiet, slightly cool paper foundation, then retain a darkened oxidized-copper accent as the product's signal color. The paper relates to uploaded records; graphite relates to inspection and SQL; copper marks the point where evidence is selected, routed, or confirmed. This is not “rust because it looks premium.” It is a deliberate relationship between source material, technical inspection, and one action signal.

### Recommended light palette

| Semantic role | HEX | Use |
| --- | --- | --- |
| Primary ink | `#182225` | Main text, headings, code labels, high-trust content. |
| Secondary ink | `#435255` | Supporting text, inactive navigation, explanations. |
| Muted ink | `#667578` | Non-essential metadata only, never sole status communication. |
| Background | `#F3F6F5` | Application canvas. Cool enough to distinguish the product from cream SaaS. |
| Surface | `#FBFCFA` | Main reading surfaces and ordinary rows. |
| Elevated surface | `#FFFFFF` | Composer, dialogs, menus, selected evidence panel. |
| Border | `#D6DFDD` | Quiet grouping and input borders. |
| Divider | `#E3EAE8` | List and table row separation. |
| Relay accent | `#A34831` | Primary action, selected source rail, active route. |
| Relay accent hover | `#863B2A` | Hover and pressed action state. |
| Relay soft | `#F2E1DB` | Selected background, focus-adjacent tint, subtle provenance badge. |
| Success | `#2F6B52` | Completed ingestion, healthy provider, verified state. |
| Warning | `#8A5A22` | Rate limit, partial result, attention required. |
| Error | `#A43D3A` | Failed upload, destructive action, execution error. |
| Info | `#3C6573` | Informational route or explanatory note. |

### Recommended dark palette

| Semantic role | HEX | Use |
| --- | --- | --- |
| Background | `#101718` | Canvas. Avoid pure black. |
| Surface | `#172122` | Main content. |
| Elevated surface | `#1D2A2B` | Composer, menus, dialogs, selected panel. |
| Primary text | `#E8F0ED` | Main content. |
| Secondary text | `#B9C9C5` | Supporting content. |
| Muted text | `#8EA39E` | Metadata only. |
| Border | `#304041` | Grouping and controls. |
| Divider | `#263536` | Rows and tables. |
| Relay accent | `#D07A5F` | Action and selected states; preserve brand recognizability in dark mode. |
| Relay soft | `#3A2724` | Selected and soft accent surfaces. |
| Success | `#70B08F` | Actual success only. |
| Warning | `#D29A58` | Actual warning only. |
| Error | `#E17D76` | Actual error only. |
| Info | `#86B6C0` | Actual information only. |

### Color roles and ratio

- 82-88%: background, surfaces, graphite text, borders, and dividers.
- 8-12%: relay accent used for primary action, active navigation, selected source, focus, and route emphasis.
- 3-6%: semantic status colors and relay-soft fills.

Do not color every provider, card, chat message, or icon. Do not use the relay accent for decorative gradients. Do not use semantic colors as a second brand palette.

### Color signature

The recognizable relationship should be cool archival neutrals plus one dark oxidized-copper relay signal. A user should be able to recognize a selected source rail, an active route, and a primary action as members of the same system without seeing the logo.

## 8. Typography Audit

### Current typography

- Hanken Grotesk is self-hosted through `@fontsource` in `main.jsx` and used as UI/body font tokens.
- JetBrains Mono is self-hosted and appropriate for SQL, token counts, IDs, and technical metadata.
- Newsreader is declared as `--font-display` and loaded from Google Fonts in `index.html`, but the product does not have a clear editorial surface that justifies this split.
- The browser loads external Google Fonts even though local font packages exist. That creates dependency and first-paint inconsistency.

### Verdict

Hanken Grotesk plus JetBrains Mono is a good foundation. Keep it, but stop implying an editorial serif identity that the workflows do not support. Use hierarchy, weight, and measured tracking rather than a second brand voice.

### Recommended hierarchy

| Role | Size | Weight | Line height |
| --- | ---: | ---: | ---: |
| Page title | 28px | 600 | 1.2 |
| Chat answer heading | 20px | 600 | 1.3 |
| Section title | 18-20px | 600 | 1.3 |
| Body / answer | 15px | 400 | 1.55-1.65 |
| Control text | 14px | 600 | 1.2 |
| Metadata | 12-13px | 500 | 1.4 |
| Table / SQL | 13px | 400-500 | 1.5 |
| Technical value | 12-13px | 400 | 1.45 |

Avoid making every label uppercase. Reserve uppercase tracking for short navigation section labels such as “Recent chats” and “Sources.”

## 9. Layout Audit

### Shell

The shell uses a fixed-height grid with a sidebar and content area, a sticky header, and a scrollable main surface. This is appropriate for an investigation tool. The current `--sidebar-width: 300px` is too generous for a chat-and-evidence workspace; 248px should be the default, with a 56px collapsed rail.

### Recommended structural layout

- Sidebar: 248px, 56px collapsed, 44px mobile drawer targets.
- Header: 56px, with the current context title and one clear export action.
- Main page padding: 32px desktop, 24px tablet, 16px mobile.
- Chat reading width: 720-760px for answers; database results may expand to 960px with horizontal overflow handled inside the result region.
- Documents: two-column list plus detail/stage panel on desktop; one ordered flow on mobile.
- Settings: one vertically grouped form surface, not multiple decorative cards.

### Information architecture judgement

The route structure is understandable: chat is the default, Documents is a permanent library, Settings holds theme and schema sync, About is secondary. The strongest IA decision is keeping ingestion on Documents rather than making it a hidden chat side effect. Preserve that.

The weakness is that the shell visually presents chat as the whole product. The Documents link is a secondary navigation item, even though the knowledge base is a prerequisite for many answers. The chat empty state should connect to documents when the corpus is empty, without turning navigation into a dashboard.

### Density

Use medium-high density in documents, SQL results, provider popovers, and metadata. Use more breathing room around a final answer. Do not apply the same card and padding rules to all surfaces.

## 10. Component Audit

### Buttons and controls

`Button.jsx` is a useful primitive, but the visual rules are scattered between `.primary-button`, `.secondary-button`, `.icon-button`, `.new-chat-action`, composer actions, and inline styles in `InputBox.jsx`.

Recommended contract:

- Standard control height: 40px.
- Mobile/touch control height: 44px.
- Icon-only controls: 40px square, 44px on mobile.
- Primary radius: 8px.
- Secondary radius: 8px.
- Tactile press: `transform: scale(0.98)` for 100-160ms, only on actionable controls.
- Disabled controls retain readable text and communicate why they are disabled where necessary.

### Cards and surfaces

`Card.jsx`, `feature-card`, `message__bubble`, `doc-row`, `settings-panel`, provider cards, and composer surfaces currently create too many containers. Use cards only for independent content or elevation. Use dividers and selected backgrounds for lists and ordinary chat messages.

### Chat messages

The message component is feature-rich. Keep its support for citations, SQL, Markdown tables, Mermaid, ingestion cards, feedback, editing, versions, and token usage. Change the visual priority:

1. Answer text.
2. Source/route summary.
3. Structured result or diagram.
4. Expandable thinking and token details.
5. Feedback and secondary actions.

Assistant answers should not look like generic bordered cards. User messages can use a quiet tinted surface. Source labels should be visually stronger than token counts.

### Documents

`Documents.jsx` contains a serious structural issue: `.doc-row` is a `<button>` that contains replace and delete `<button>` elements. Nested buttons are invalid and cause keyboard and screen-reader ambiguity. Convert the row to an `article` or `div`, make the filename area a dedicated select button, and keep actions as siblings.

### Provider status

`ProviderStatus.jsx` has meaningful operational information, but the smart cards and pills risk reading as a dashboard inside the composer. Keep provider selection secondary. Expose the active provider and health in one compact control; place detailed limits and model metadata in an explicit popover with clear headings.

### Tables, charts, and SQL

The existing Markdown table and database result components are product-critical. They should be treated as evidence surfaces: stable column alignment, readable numeric formatting, sticky headers only when necessary, horizontal scrolling within the result region, and source/query disclosure that does not compete with the answer. Mermaid diagrams should inherit semantic colors from a documented diagram token set rather than arbitrary colors.

## 11. Interaction-State Audit

| State | Current evidence | Finding | Recommendation |
| --- | --- | --- | --- |
| Default | Most controls have defined classes | Baseline exists, but surface rules vary | Centralize component tokens. |
| Hover | Navigation, cards, menus, provider controls use hover | Hover is sometimes the only discoverability mechanism | Do not hide operational actions from keyboard or touch users. |
| Focus | Inputs and controls use several outline resets; no dependable global focus-visible contract found | High-risk accessibility gap | Add one strong focus ring to links, buttons, inputs, menu items, dialogs, and selectable rows. |
| Active/selected | Active nav uses an inset accent rail; selected documents use class state | Good starting point but too border-dependent | Use relay-soft background plus text/icon emphasis; keep the rail as a small signature, not the only cue. |
| Disabled | Send and upload disable during work | Some disabled states are low-information | Pair disabled state with reason or status text where waiting is not obvious. |
| Loading | Sidebar skeletons, loader, spinners, ingestion stage icons | Useful coverage, but “demo data” copy is inaccurate | Use contextual skeletons and “Loading chats” / “Preparing answer” language. |
| Success | Toasts and completed stage styles exist | Success is not always tied to the object changed | Confirm “Document added,” “Schema sync finished,” or “Copied answer.” |
| Error | Toasts, error boundary, failed stage | “Check server logs” is developer-facing; raw stack visible | Give recovery actions and keep stack details behind a developer disclosure. |
| Empty | Chat feature cards, no documents copy, no chats copy | Empty chat is explanatory rather than task-starting | Use real prompt starters and a document-library path. |
| Expanded/collapsed | Thinking, token usage, provider popovers, menus | Good progressive disclosure opportunity | Keep details closed after completion and make controls keyboard-operable. |

Dialogs in `Sidebar.jsx` and `Documents.jsx` have `role="dialog"` and `aria-modal`, but need `aria-labelledby`, `aria-describedby`, Escape handling, focus placement, focus return, and focus containment.

## 12. Motion Audit

Emil's rule applies: animate only when motion explains continuity, confirms feedback, preserves spatial context, or prevents a jarring change. Frequent controls should feel immediate.

### Keep or add

| Trigger | What animates | Spec | Purpose |
| --- | --- | --- | --- |
| Button press | `transform` only | 100-160ms, `ease-out`, `scale(0.98)` | Confirms input without delaying it. |
| Menu/popover open | opacity and small translate from trigger | 150-200ms, `cubic-bezier(0.23, 1, 0.32, 1)` | Establishes spatial origin. |
| Dialog open | opacity plus translateY 4-8px | 200ms, ease-out; never scale from 0 | Gives context without theatrical entrance. |
| Ingestion stage change | icon/state color and a short opacity/transform change | 160-220ms, ease-out | Makes pipeline progress legible. |
| Stream completion | typing cursor disappears and answer controls become available | 120-180ms | Communicates that the answer is now stable. |
| Toast | enter from its placement edge, opacity and translate | 180-240ms; exit faster | Provides spatial continuity and perceived speed. |

### Remove or reduce

- Remove or sharply reduce page-entry fades on frequent route changes.
- Do not animate chat-list titles as a marquee. Use ellipsis; moving titles steal attention and can be difficult for motion-sensitive users.
- Do not animate width for usage meters when transform scaleX or a static fill is sufficient. Width changes cause layout work.
- Avoid auto-smooth scrolling for users with `prefers-reduced-motion`; the current `Chat.jsx` scroll effect should honor the preference.
- Do not stagger every message in a long conversation. Streaming already supplies temporal feedback.
- Keep skeleton shimmer only while content is genuinely loading; disable it under reduced motion.

### Reduced motion

Add a global reduced-motion policy for all CSS and Framer Motion transitions, including smooth scrolling, skeleton shimmer, typing cursor, provider status animation, and message entry. Preserve state changes; remove travel and looping movement.

## 13. UX Language Audit

### Credibility conflicts

- `About.jsx`: “A dark, local-first chat interface using static demo data for now.” This conflicts with the README's live enterprise RAG and Text-to-SQL description.
- `Loader.jsx`: “Loading demo data.” This makes a production workflow sound like a mock.
- `Chat.jsx`: “Waiting for demo chat data.” Same problem.
- Upload error: “Upload failed. Check server logs.” The user cannot act on this instruction.
- Header export: “Building your professional document…” is serviceable, but should state that the result is generated from the current conversation.

### Recommended voice

Plain, specific, calm, and evidence-aware. Avoid “smart,” “magic,” “seamless,” “AI-powered,” and “trusted” unless the UI proves the claim.

| Current | Recommended | Reason |
| --- | --- | --- |
| `What would you like to know?` | `Ask about your documents or data` | Names both evidence channels. |
| `Multi-Format Support` | `Search the knowledge base` | Moves from capability marketing to a user job. |
| `Trusted Answers` | `See where an answer came from` | Trust becomes inspectable rather than claimed. |
| `Instant Search` | `Query your connected data` | Distinguishes document retrieval from SQL. |
| `Loading demo data` | `Loading your workspace` | Removes prototype language. |
| `Upload failed. Check server logs.` | `Upload failed. Try another file or retry.` | Provides an immediate recovery path. |
| `Runtime Error` with raw stack | `Local Mind could not finish loading` plus `Reload` and optional details | User-first recovery and safe diagnostics. |
| `Thought process` | `How this answer was assembled` | More concrete and less anthropomorphic. |

## 14. Responsive Audit

### Desktop

The two-column shell works, but 300px of sidebar consumes valuable answer width. The chat should prioritize a stable reading column while allowing SQL results to expand within a controlled region. The export menu must remain inside the viewport at right alignment.

### Tablet

The sidebar should become a drawer or collapsed rail before the answer column becomes cramped. Documents should stack the detail panel below the list when the two-column arrangement no longer supports readable metadata.

### Mobile

Mobile is not just a smaller desktop version. The primary sequence should be: open navigation, choose chat/documents, read answer or document row, inspect source, act. Use 44px touch targets, keep replace/delete actions independently reachable, and avoid hover-only actions. SQL tables need local horizontal scrolling and a visible indication that more columns exist. The composer must remain usable above the on-screen keyboard and not compress provider controls into tiny targets.

### Source risks

- `.sidebar-rail__btn` is 38px and `.chat-item__menu-trigger` is 24px, below a robust touch target.
- `InputBox.jsx` uses a 28px cooldown control and inline light/dark colors that do not follow semantic tokens.
- The document nested-button structure is especially risky on touch and screen readers.
- Body overflow is hidden and scrolling is delegated to `.main-scroll`; every mobile viewport and keyboard state must be tested in a real browser before implementation is considered complete.

No rendered browser or device screenshot was available in this audit. These are source-based risks, not claims about observed pixels.

## 15. Accessibility Audit

### P0/P1 findings

1. Nested buttons in `Documents.jsx` are invalid interactive markup.
2. Dialogs lack a complete accessible modal contract.
3. A reliable global `:focus-visible` treatment is not evident; several controls suppress outlines.
4. Several controls are smaller than 40px and some are 24-28px.
5. Icon-only controls need consistent accessible names and visible keyboard discovery.
6. Color-only status indicators are insufficient without text labels such as Running, Complete, Warning, or Failed.
7. Error messages expose implementation details instead of recovery guidance.
8. Smooth scroll and looping motion need reduced-motion handling.

### Contrast direction

Use the recommended darker relay accent for filled actions and dark slate for metadata. Do not use muted gray as the only carrier of document size, chunk count, provider health, or ingestion status. Verify every text/background pair at implementation time with a WCAG checker; source inspection alone cannot certify rendered contrast after color mixing.

### Semantic and keyboard rules

- Use buttons for actions, links for navigation, and a non-button row wrapper around sibling document actions.
- Label every text input explicitly, including rename and chat composer context.
- Give dialogs labelled titles and descriptions.
- Return focus to the opening trigger after menus/dialogs close.
- Support Escape for menus, popovers, drawers, and dialogs.
- Do not rely on hover to reveal an action needed for keyboard operation.
- Announce upload, ingestion, generation, and schema-sync state through scoped live regions.

## 16. Anti-Generic / AI-Slop Audit

| Pattern | Present? | Product judgement |
| --- | --- | --- |
| AI purple | No | Good. Do not replace the current accent with another category-default hue. |
| Generic SaaS blue | No | Good. The proposed system keeps a non-blue relay signal. |
| Generic AI network mark | Yes | Retire. The node mesh is a common AI metaphor and does not describe evidence routing specifically. |
| Sparkle as intelligence shorthand | Yes, for Settings and export | Reduce. Use functional icons for appearance and generated-document actions. |
| Excessive gradients | Yes | Remove from application surfaces; keep only functional loading shimmer if needed. |
| Excessive rounded cards | Yes | Replace ordinary card boxes with rows, dividers, and selected surfaces. |
| Generic chat layout | Yes | The shell follows a familiar chat pattern; make source routing and evidence the differentiator. |
| Generic three-card empty state | Yes | Replace with task-oriented prompt starters and a documents path. |
| Glowing borders | Limited | Keep none except a subtle focus treatment if required; no decorative glow. |
| Glassmorphism | Limited/implicit translucent popovers | Prefer solid surfaces for trust and readability. |
| Dashboard KPI tiles | Provider smart cards and token details risk this | Keep only actual operational metrics and use compact evidence rows. |
| Decorative status dots | Yes in provider/status components | Keep only where the dot maps to real status and pair it with text. |
| Excessive animation | Moderate | Reduce frequency-based motion, especially list and route transitions. |

The current interface is not visually bad because it uses common patterns. It is weak where those patterns fail to express this product's unique evidence-routing job.

## 17. Screenshot / Visual Audit

### Evidence status

No screenshot files were found in the inspected project inventory, and no rendered browser inspection is claimed here. This report therefore distinguishes code intent from visual evidence. The prior `ui_details/audit.md` also records that a browser was unavailable during its audit; that is supporting context, not a new rendered claim.

### Code intent vs expected visual result

| Intended | Expected actual result from source | Problem |
| --- | --- | --- |
| Calm private intelligence workspace | Warm cream surfaces, terracotta accent, serif display token, gradients, cards, and chat conventions | The result likely reads as several identities at once rather than one evidence workbench. |
| Compact operational controls | 24-38px controls and hover-only chat actions | Fragile on touch and keyboard. |
| Honest ingestion visibility | Live stage trace and aggregate historical summary | Strong product decision; preserve it and make the distinction even more visible. |
| Theme support | Semantic variables plus hard-coded colors in JSX and previews | Theme parity can drift. |
| Professional export | Icon-only header action plus popover | Discoverability depends on tooltip/aria labeling and context. |
| Explainable answer | Thinking, token, citation, SQL, table, and diagram components | Feature-rich, but the visual order must put answer and provenance before telemetry. |

## 18. Brand & Logo Concept

### Naming issue first

The project name is `GlobleMind` in the README and repository context, while the interface says `Local Mind` and the browser title says `Local Mind`. This is a P0 credibility issue. Choose one canonical product name and use it across package metadata, browser title, sidebar, favicon, documentation, exports, and future public material before finalizing a wordmark. The audit does not choose the name on the user's behalf.

### Current mark

`BrandMark.jsx` and `favicon.svg` use a central node with four connected nodes. The code comment explains it as “documents feeding one local brain.” The mark is carefully drawn for small sizes, but the concept is generic AI/network language. It could belong to dozens of vector databases, LLM tools, and AI startups. The favicon also hard-codes dark charcoal and peach instead of sharing the semantic brand tokens.

### Recommended direction

Use a symbol-plus-wordmark built around a split evidence relay:

- Two short, parallel vertical or bracket-like source strokes represent the document and database channels.
- They join into one offset horizontal bar or notch representing a validated answer leaving the relay.
- The open gap is intentional negative space: evidence is inspectable, not hidden inside a brain.
- The geometry is asymmetric by one small offset, avoiding generic symmetry while remaining legible.
- No nodes, brain lobes, sparkle, chat bubble, circuit traces, database cylinder, or gradient blob.

### Construction

- Start with a 24-unit grid.
- Use two solid rails and one joining bar, with 2.5-3 unit stroke or equivalent filled geometry.
- Use square or gently chamfered ends, not soft blob circles.
- Keep one open negative-space channel at the center.
- Use a compact mark that remains identifiable in one color.
- The wordmark should use Hanken Grotesk 600 with restrained tracking, not all-caps by default.

### Brand personality

Precise, explainable, calm, private, and operational. Not futuristic, playful, mystical, or “magical.”

## 19. Favicon Concept

The full logo is unsuitable at 16x16 if it includes wordmark or two detailed rails. Use a simplified symbol-only favicon:

- Two short vertical evidence rails entering a single small horizontal bridge.
- Remove all text, node circles, and internal decoration.
- Use a solid relay accent on a quiet dark or light field, with a monochrome fallback.
- Test at 16px, 32px, 64px, and 192px. At 16px, the open negative-space notch must survive; if it closes, use only the two-rail silhouette.

### Variant system

1. Primary lockup: symbol plus canonical wordmark for About, documentation, export cover pages, and future landing surfaces.
2. Horizontal lockup: symbol plus wordmark for wide headers or login/landing surfaces.
3. Compact lockup: symbol plus shortened wordmark for sidebar width constraints.
4. Symbol-only mark: collapsed rail, app icon, loading indicator, and favicon.
5. Monochrome mark: documentation, print, PDF, and low-color environments.
6. Light-background mark: graphite symbol with relay-accent joining bar.
7. Dark-background mark: light symbol with relay-accent joining bar.

Do not place the logo in every message or empty state. Use it in the sidebar lockup, collapsed rail, browser/app icon, and exceptional loading/error screens where orientation is useful.

## 20. Brand Consistency Audit

| Surface | Current | Recommendation |
| --- | --- | --- |
| Browser title | `Local Mind` | Resolve canonical naming and use the same lockup terminology. |
| Favicon/app icons | Dark square with peach node mesh | Replace conceptually with the simplified relay mark; share brand colors between SVG and raster variants. |
| Sidebar | Text lockup only; `BrandMark` is not visibly used in the inspected lockup | Add compact symbol where space permits, then canonical wordmark. |
| Header | Context title only | Keep header product-light; do not repeat logo on every screen. |
| Loading | Dots and label | Use a restrained relay progress cue only for initial workspace loading; use functional stage loaders elsewhere. |
| Empty chat | Generic feature cards | Use source-aware prompt starters and one small mark at most. |
| Errors | Alert icon and raw stack | Use the brand mark only as orientation, not as decoration; prioritize recovery. |
| Exports | PDF styling is separate code | Align export title, accent rule, and source labels to the same semantic palette. |

## 21. Page-by-Page Audit

### Shared shell and navigation

- Purpose: move between investigation, document operations, and configuration.
- Primary user: returning investigator.
- Strongest element: clear persistent chat list, Documents route, Settings footer, collapsed rail concept.
- Weakest element: the shell looks like a generic chat app and does not expose the product's evidence duality.
- UX issues: 24px menu trigger, hidden hover-only actions, incomplete menu/dialog focus contract.
- Visual issues: 300px sidebar, repeated rounded surfaces, inset stripe as the main active cue.
- Responsive issues: drawer and touch targets need real-device validation.
- Recommended change: 248px evidence-workbench rail, visible keyboard actions, relay-soft selected state, canonical brand lockup. Priority P1.

### Chat / Home

- Purpose: ask questions and inspect answers.
- Primary task: formulate a question, read the response, verify its source.
- Strongest element: rich answer rendering with citations, SQL results, tables, Mermaid, thinking trace, token usage, feedback, editing, and regeneration.
- Weakest element: empty state and evidence hierarchy.
- UX issues: feature cards do not start work; `Waiting for demo chat data` and “demo” loader copy undermines trust; provider details compete with the composer.
- Visual issues: generic chat bubbles and too many secondary containers; user/assistant surfaces do not establish an evidence hierarchy.
- Responsive issues: long SQL/table outputs and composer controls need mobile containment.
- Recommended change: empty state with three real prompt starters plus “Open Documents”; answer first, provenance second, telemetry third; primary composer remains visually dominant. Priority P1.

### Documents

- Purpose: upload, replace, select, monitor, and delete source material.
- Primary task: make the knowledge base useful and understand ingestion state.
- Strongest element: honest distinction between live stage detail and stored aggregate metadata.
- Weakest element: row interaction semantics and overly card-like treatment.
- UX issues: nested buttons; delete dialog lacks full modal accessibility; replace/delete labels rely on titles and icons.
- Visual issues: metadata is too low contrast; stage information needs a stronger rail and status labels.
- Responsive issues: actions need 44px targets; detail panel must become a clear second step on mobile.
- Recommended change: article rows with a dedicated selection button and sibling actions; selected row uses relay-soft background; stage panel title includes the file name. Priority P0 for semantics, P1 for visual hierarchy.

### Settings

- Purpose: control appearance and synchronize database schema.
- Primary task: choose theme or deliberately start schema sync.
- Strongest element: theme choices and schema sync are distinct concerns.
- Weakest element: decorative section rules and sparkle icon communicate less than the action's operational consequence.
- UX issues: schema sync explanation is long relative to the action; no explicit progress/result contract is visible in the page source.
- Visual issues: panel stacking and theme previews are over-designed compared with the chat surface.
- Responsive issues: theme picker previews and sync action need a simple vertical fallback.
- Recommended change: use a plain section heading, a concise explanation, an explicit “Sync schema” action with progress/result feedback, and functional appearance iconography. Priority P1.

### About

- Purpose: explain the product and technology.
- Primary task: build understanding and confidence.
- Strongest element: it names real packages and the intended chat/documents/settings structure.
- Weakest element: its copy claims a static demo UI, contradicting the README and deployed product story.
- UX issues: no clear statement of what source types and answer routes the user can rely on.
- Visual issues: generic “Goal” and “Stack” cards; no concise evidence-relay explanation.
- Responsive issues: likely acceptable because the content is simple, but the card grid should stack without empty gaps.
- Recommended change: explain “Ask across documents and connected data,” show the two evidence channels, state the current product status honestly, and reserve technology details for a secondary section. Priority P1.

## 22. Before / After Recommendations

| Before | After | Why |
| --- | --- | --- |
| `--sidebar-width: 300px` | `248px`, with a `56px` collapsed rail | Frees answer width while preserving chat navigation. |
| Cream surfaces plus many cards | Cool archival canvas, solid surfaces only for elevation, dividers for lists | Makes the workbench denser and less like a generic card dashboard. |
| `#a85d3f` used as a broad warm brand field | Dark relay copper used only for action, selection, focus, and active route | Keeps the distinctive human accent without visual noise. |
| Node mesh in `BrandMark.jsx` and `favicon.svg` | Two evidence rails joining into a single validated-answer bar | Encodes this product's document/data relay rather than the AI category. |
| `Local Mind` in UI and `GlobleMind` in README | One canonical name across UI, docs, title, favicon, and exports | Brand inconsistency damages trust more than a color mismatch. |
| Three equal empty-chat feature cards | Three clickable prompts plus a Documents path | Moves the first interaction from marketing explanation to user work. |
| `.doc-row` button containing replace/delete buttons | `article` row, selection button, sibling replace/delete buttons | Fixes invalid semantics and improves keyboard/touch behavior. |
| `Loading demo data` | `Loading your workspace` | Removes prototype language from a trust-sensitive product. |
| `Upload failed. Check server logs.` | `Upload failed. Try another file or retry.` plus a retry path | Gives the user an actionable recovery. |
| Assistant answer as a bordered message card | Answer on a quiet reading surface; source/route summary below | Makes comprehension and provenance primary. |
| Thinking trace and token usage visually equal to source information | “How this answer was assembled” and “Usage” collapsed below sources | Keeps operational detail available without competing with evidence. |
| `.chat-item__menu-trigger` at 24px and hover-only | 40px wrapper, visible on focus and menu-open | Supports keyboard and touch users. |
| Inline `rgba(255,255,255,...)` cooldown styling | Semantic disabled/cooldown tokens | Preserves light/dark theme consistency. |
| Smooth scroll always on | Smooth scroll only when reduced motion is not requested | Prevents motion discomfort and respects user preference. |
| `Newsreader` as an unused display identity and Google Fonts link | Hanken Grotesk for UI, JetBrains Mono for technical values, local loading only | Reduces brand drift and first-paint dependency. |

## 23. Recommended Design System

### Brand

Concept: Evidence Relay Workbench.  
Signature: cool archival neutrals plus one oxidized-copper relay signal.  
Mark: two evidence rails joined into one answer bar.  
Personality: precise, explainable, calm, private, operational.

### Colors

Use the palette in Section 7 as semantic CSS variables. Tokens should be named by role, not component: `--canvas`, `--surface`, `--surface-elevated`, `--text-primary`, `--text-secondary`, `--text-muted`, `--border`, `--divider`, `--accent-relay`, `--accent-relay-soft`, `--success`, `--warning`, `--error`, `--info`, `--focus-ring`.

### Typography

- Hanken Grotesk: all UI and answer prose.
- JetBrains Mono: SQL, technical values, token counts, provider model IDs, and compact telemetry.
- No serif in the operational application unless a future, explicitly editorial documentation surface needs it.
- Avoid oversized H1s. Use hierarchy through weight, spacing, and contrast.

### Spacing

Use a 4px base rhythm: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64`. Use 16px as the normal control gap, 24px between message groups, and 32px between page sections.

### Radius

- Small: 6px for compact status labels and code surfaces.
- Medium: 8px for controls, inputs, list selection, and dialogs.
- Large: 12px for composer, elevated evidence panel, and modal shell.
- Avoid 18-22px application-wide rounding. Reserve full pills for status chips or genuinely compact tags.

### Borders and shadows

Use 1px borders for grouping, inputs, tables, and selected rows. Use dividers in lists. Use one restrained shadow family for menus, dialogs, and composer elevation. No black shadow stacks, glow borders, or translucent glass as the default surface.

### Icons

The project already uses Lucide. Keep one icon family and standardize stroke width around 1.75-2px. Use icons as functional labels. Avoid using Sparkles, Brain, or network motifs as generic intelligence decoration.

### Components

- Button: 40px, 8px radius, clear primary/secondary/danger semantics.
- Input: 40-44px, explicit label, accent border plus focus ring.
- Icon button: 40px, 44px mobile, accessible name.
- List row: 56px minimum for documents, divider-based grouping.
- Chat answer: quiet reading surface, 720-760px, source summary visible.
- Composer: 12px radius, solid elevated surface, clear send/stop state.
- Dialog: labelled title and description, focus trap, Escape, focus return.
- Status: text plus icon/color, never color alone.
- Table: aligned numeric columns, local overflow, clear query/source disclosure.

### Motion

Under 300ms for ordinary UI, mostly 150-220ms. Use ease-out for entry and feedback, ease-in-out only for meaningful on-screen movement. Animate opacity and transform; avoid layout-property animation. Respect `prefers-reduced-motion` globally.

### Layout

Treat the product as a reading-and-inspection workbench: stable shell, narrow answer column, expandable evidence details, dense operational lists, and no dashboard tile grid unless the data genuinely needs comparison.

## 24. What Should NOT Change

- Keep the route model: chat, documents, settings, and about are a sensible product boundary.
- Keep the document workflow separate from chat. The comment in `Sidebar.jsx` correctly treats Documents as a permanent library.
- Keep honest live ingestion stages and historical aggregate summaries. Do not fabricate historical step traces.
- Keep SQL result cards, Markdown tables, citations, Mermaid diagrams, token usage, feedback, edit, and regeneration support. Their hierarchy needs refinement, not removal.
- Keep the ability to choose dark, light, or system theme, provided both modes share semantic tokens and contrast rules.
- Keep Hanken Grotesk and JetBrains Mono as the base font direction.
- Keep skeleton loading where it matches the final shape and provides real progress feedback.
- Keep the restrained current warmth as an ingredient. The recommendation is a disciplined archival/copper system, not a forced generic blue redesign.

## 25. Prioritized Improvement Roadmap

| Priority | Area / location | Problem | Recommendation | Impact | Difficulty | Scope |
| --- | --- | --- | --- | --- | --- | --- |
| P0 | Brand naming, README, `index.html`, Sidebar | GlobleMind and Local Mind conflict | Choose one canonical name and update all visible/public identity surfaces together | High credibility | Medium | Global |
| P0 | `Documents.jsx` document rows | Nested buttons | Split row selection from replace/delete actions | High accessibility and correctness | Medium | Local |
| P0 | Global focus and dialogs | Keyboard focus is weak; dialogs incomplete | Add focus-visible tokens, labelled dialogs, Escape, focus trap, and focus return | High accessibility | Medium | Global |
| P1 | Chat empty/loading/error states | Prototype language and feature marketing weaken trust | Replace with evidence-oriented prompts and recovery copy | High activation and credibility | Low | Chat/shared |
| P1 | Color/token system | Warm palette is diluted by hard-coded values and gradients | Adopt semantic archival/copper tokens and remove decorative gradients | High product identity | Medium | Global |
| P1 | Chat evidence hierarchy | Answer, source, SQL, thinking, and telemetry compete | Make answer and provenance primary; collapse telemetry | High comprehension | Medium | Chat |
| P1 | Sidebar and document density | Too much width and too many card treatments | 248px sidebar, row/divider grouping, selected surfaces | High daily usability | Medium | Global/documents |
| P1 | Mobile controls | 24-38px controls and hover-only actions | 40-44px targets and keyboard/focus visibility | High mobile/accessibility | Medium | Global |
| P1 | Logo/favicon | Generic mesh-network AI mark | Replace with product-specific evidence-relay mark after naming decision | High differentiation | Medium | Brand/assets |
| P2 | Motion system | Scattered entry animation, width changes, unconditional smooth scroll | Centralize timing and reduced-motion rules | Medium responsiveness | Medium | Global |
| P2 | Typography loading | Unused Newsreader and external Google Fonts | Local Hanken/JetBrains only in app shell | Medium consistency/performance | Low | Global |
| P2 | Provider popover | Smart cards risk dashboard noise | Compact active-provider control with explicit telemetry panel | Medium focus | Medium | Provider |
| P3 | About page | Generic Goal/Stack cards | Replace with concise product/evidence explanation | Medium clarity | Low | About |
| P3 | Export styling | Separate PDF identity | Reuse semantic brand tokens and source labels | Low-medium continuity | Medium | Export |

## 26. Top 10 Highest-Impact Changes

1. Resolve the GlobleMind versus Local Mind naming conflict.
2. Fix nested document buttons and complete accessible dialog behavior.
3. Replace the generic empty chat with evidence-aware prompt starters and a Documents path.
4. Establish the Evidence Relay Workbench visual concept in semantic tokens, rows, source labels, and selected states.
5. Replace the generic node-network mark with the two-channel evidence-relay mark and simplified favicon.
6. Make answer provenance visibly more important than token counts, provider telemetry, and decorative status chips.
7. Add a dependable global focus-visible system and raise icon/touch targets to 40-44px.
8. Reduce the sidebar from 300px to 248px and remove unnecessary card containers from lists and ordinary chat messages.
9. Replace prototype/developer-facing loading and error copy with actionable product language.
10. Introduce one purposeful motion system with reduced-motion support and remove marquee, layout-property, and unnecessary route animation.

## 27. Final Design Thesis

This product should feel like an evidence relay workbench because its value is not that it can talk; its value is that it can route a question across private documents and structured data, validate the path, and return an answer that can be inspected.

### The product should feel like

A calm, precise investigation desk: dense where the user inspects records, quiet where the user reads an answer, and explicit when the system is processing or uncertain.

### The product should not feel like

A generic AI chatbot, a glossy SaaS dashboard, a dark cyberpunk console, a lifestyle note-taking app, or a marketing page made from gradients and feature cards.

### Its visual signature should be

Cool archival neutrals, thin evidence rules, readable metadata, source/route labels, structured result surfaces, and one oxidized-copper relay signal.

### Its color identity should be

Graphite and archival paper for inspection, with copper reserved for the moment of selection, routing, confirmation, or action. Semantic green, amber, red, and blue exist only when they describe real state.

### Its logo identity should be

Two evidence channels joining into one validated answer, expressed through simple rails and negative space. No brain, sparkle, node mesh, robot, circuit, or generic chat bubble.

### Its interaction personality should be

Immediate, quiet, recoverable, and honest. Motion confirms a state change or preserves spatial continuity; it does not perform intelligence.

## 28. Final Verdict

The project already contains enough real product behavior to support a distinctive interface. The current weakness is not a lack of visual polish in isolation. It is that the visual language does not yet make the product's most valuable idea visible: the controlled relay between document evidence and database evidence.

Do not begin with a color swap or a broad “modernization.” First resolve naming, semantics, focus, state language, and evidence hierarchy. Then consolidate the visual system around the Evidence Relay Workbench concept. If those decisions are implemented consistently, the product can become recognizable without adopting the standard AI/SaaS visual vocabulary.

## 29. Implementation Order

1. Confirm canonical product name and product status language.
2. Extract semantic color, spacing, radius, typography, focus, and motion tokens.
3. Repair document row semantics and modal interaction contracts.
4. Rework chat empty, loading, error, source, and answer hierarchy.
5. Rebalance the shell and document list density.
6. Introduce the evidence-relay logo system and favicon variants.
7. Rework provider and token details into secondary inspection surfaces.
8. Apply the responsive and reduced-motion contracts.
9. Validate light/dark contrast, keyboard flow, mobile touch targets, and rendered desktop/tablet/mobile states in a real browser.
10. Only then refine export styling, About copy, and minor polish.
