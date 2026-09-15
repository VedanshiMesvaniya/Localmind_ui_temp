# Look Change V2: Current UI Audit And First Fix Order

Audited against:
- `look_change.md`
- `ui_details/demo.webp`
- `ui_details/color pallet.webp`
- `ui_details/127.0.0.1-chat-dark.png`
- `ui_details/127.0.0.1-chat.png`
- `ui_details/127.0.0.1-documents-dark.png`
- `ui_details/127.0.0.1-documents.png`
- `ui_details/127.0.0.1-settings-dark.png`
- `ui_details/127.0.0.1-settings.png`

Source selectors checked:
- `LocalMind_UI/src/styles/globals.css`
- `LocalMind_UI/src/components/Chat.jsx`
- `LocalMind_UI/src/components/Message.jsx`
- `LocalMind_UI/src/components/InputBox.jsx`
- `LocalMind_UI/src/components/Sidebar.jsx`
- `LocalMind_UI/src/pages/Documents.jsx`
- `LocalMind_UI/src/pages/Settings.jsx`

## Design Read

This is a product UI redesign audit for an AI chat/document workbench. The target is not a generic purple dashboard. The target is a dark premium chat workspace with a left sidebar, a rounded main chat canvas, blue selected pills, raised assistant cards, and compact Helvetica-style typography.

The current dark mode has the rough structure, but it still feels like a CSS overlay applied to an existing app. The current light mode is broken: many dark-mode component styles are still hard-coded, so light mode becomes low-contrast gray cards on a white canvas.

## Score

| Area | Score | Finding |
|---|---:|---|
| Reference match | 2/5 | Dark mode uses the palette but misses reference density, alignment, and card hierarchy. |
| Light theme | 1/5 | Text and gray cards are unreadable in several places. |
| Sidebar | 3/5 | Blue pills are close, but the sidebar lacks the reference's tighter menu system and top/bottom balance. |
| Chat canvas | 2/5 | Canvas glow exists, but empty state is too centered and sparse; composer is too tall and form-like. |
| Documents/Settings | 2/5 | Content sits in generic panels instead of inheriting the chat-reference surface language. |
| Overall | 10/25 | Fix the theme system first, then page layout and component surfaces. |

## Main Problems

### P0: Light Mode Is Not A Real Theme

Light screenshots show white canvas plus dark gray cards and white text. This makes titles, body copy, recent chats, document metadata, and settings content look washed out.

Cause in CSS:
- `:root[data-theme-mode='light']` changes `--panel` and `--text-primary`, but many component rules still hard-code `#FFFFFF`, `rgba(43, 42, 56, 0.6)`, and dark translucent backgrounds.
- Examples: `.doc-row__title`, `.ingestion-panel__title`, `.settings-panel__title`, `.section__title`, `.hero__title`, `.feature-card__title`, `.composer__input`.

First rule: every component that appears in both themes must use tokens, or must have an explicit light override.

### P1: The Reference Is Dark-First, But The App Treats Both Themes Equally

`look_change.md` says: "Use the reference as a dark theme first." The app should make dark mode the polished reference target. Light mode can exist, but it should be a separate usable translation, not the same dark cards inverted halfway.

First pass should prioritize:
1. make dark mode match the reference cleanly
2. make light mode readable and calm
3. avoid trying to make light mode look like the dark reference

### P1: Main Canvas Is Too Empty And Too Center-Weighted

In chat empty state, the reference has a conversation/code-card composition. Current UI has a large empty region, three small cards, and a large input block floating near the bottom.

Problem:
- `.hero` is centered and generic.
- `.feature-grid` looks like three dashboard tiles.
- `.composer__shell` is too tall and reads as a form panel, not a compact chat input.

### P1: Documents And Settings Use Generic Large Cards

Documents and Settings are placed inside the same rounded purple canvas, but the inner panels are generic and too heavy.

Problem:
- `.doc-row`, `.ingestion-panel`, and `.settings-panel` use dark translucent blocks that become ugly gray blocks in light mode.
- Settings panels are too wide and read as admin cards, not a refined premium workspace.

### P2: Motion And Interaction Use `transition: all`

Several interactive selectors use `transition: all`, including sidebar rail buttons, nav items, chat items, document rows, theme options, buttons, and icon buttons.

This should be replaced with explicit transitions:

```css
transition: background 160ms ease, border-color 160ms ease, color 160ms ease, transform 160ms ease, box-shadow 160ms ease;
```

For frequent UI controls, keep motion short and tactile.

## Exact First Fix To Apply

Apply this first. Do not start with spacing polish or new components.

### Fix 1: Create Theme-Safe Surface Tokens

In `LocalMind_UI/src/styles/globals.css`, extend the root tokens and stop hard-coding component surfaces.

Dark target:

```css
:root {
  --surface-app: #1C1C24;
  --surface-sidebar: #1C1C24;
  --surface-canvas:
    radial-gradient(circle at 65% 100%, rgba(84, 93, 241, 0.48), transparent 34%),
    linear-gradient(180deg, #2B2A38 0%, #28263A 58%, #302D54 100%);
  --surface-card: rgba(43, 42, 56, 0.60);
  --surface-card-strong: rgba(66, 65, 104, 0.88);
  --surface-code: #1E2533;
  --surface-control: rgba(255, 255, 255, 0.06);
  --surface-control-hover: rgba(255, 255, 255, 0.10);
  --border-soft: rgba(255, 255, 255, 0.08);
  --border-strong: rgba(255, 255, 255, 0.14);
  --text-on-surface: #FFFFFF;
  --text-on-surface-soft: #D9D9E7;
  --text-on-surface-muted: #9B9AA8;
}
```

Light usable translation:

```css
:root[data-theme='light'],
:root[data-theme-mode='light'] {
  --surface-app: #ECECF2;
  --surface-sidebar: #F5F6FA;
  --surface-canvas:
    radial-gradient(circle at 65% 100%, rgba(84, 93, 241, 0.14), transparent 34%),
    linear-gradient(180deg, #FFFFFF 0%, #F6F7FB 58%, #EAEBFA 100%);
  --surface-card: rgba(255, 255, 255, 0.88);
  --surface-card-strong: #FFFFFF;
  --surface-code: #F3F4FB;
  --surface-control: rgba(28, 28, 36, 0.05);
  --surface-control-hover: rgba(28, 28, 36, 0.08);
  --border-soft: rgba(28, 28, 36, 0.10);
  --border-strong: rgba(28, 28, 36, 0.16);
  --text-on-surface: #1C1C24;
  --text-on-surface-soft: #4A4D62;
  --text-on-surface-muted: #7A7C93;
}
```

Then replace the major hard-coded values in the first pass:

| Selector | Before | After | Why |
|---|---|---|---|
| `.app-shell` | `background: var(--bg)` | `background: var(--surface-app)` | Keeps the app shell reference-black in dark mode and clean gray in light mode. |
| `.sidebar`, `.sidebar-rail` | `background: var(--sidebar-bg)` | `background: var(--surface-sidebar)` | Makes sidebar theme explicit. |
| `.main-scroll` | hard-coded dark gradient | `background: var(--surface-canvas)` | Stops duplicating canvas logic and fixes light mode. |
| `.doc-row`, `.ingestion-panel`, `.settings-panel`, `.feature-card` | `rgba(43, 42, 56, 0.6)` or similar | `background: var(--surface-card); border-color: var(--border-soft); color: var(--text-on-surface)` | Fixes gray unreadable light cards. |
| `.section__title`, `.hero__title`, `.doc-row__title`, `.ingestion-panel__title`, `.settings-panel__title` | `color: #FFFFFF` | `color: var(--text-on-surface)` | Fixes light theme title contrast. |
| `.composer__input` | `color: #FFFFFF` | `color: var(--text-on-surface)` | Fixes light composer text. |
| `.icon-button`, `.secondary-button`, `.mode-selector`, `.provider-status` | white translucent backgrounds | `background: var(--surface-control)` | Prevents light mode controls from disappearing. |

## Fix 2: Keep Dark Mode As The Reference Target

After Fix 1, apply these dark-mode values:

```css
.main-scroll {
  border-radius: 28px;
  border: 1px solid var(--border-soft);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.28);
}

.chat-canvas-highlight {
  width: min(720px, 72%);
  height: 22px;
  background: rgba(84, 93, 241, 0.22);
  border-radius: 0 0 999px 999px;
}
```

Do not brighten the canvas. The reference is dark, muted, and purple-black, not high-neon.

## Fix 3: Make The Composer Compact

Current composer is too tall and looks like a form block. The reference composer is a compact command bar.

Apply to `.composer` and `.composer__shell`:

```css
.composer {
  bottom: 20px;
  width: min(720px, calc(100% - 48px));
  padding: 0;
}

.composer__shell {
  min-height: 48px;
  padding: 10px 12px;
  border-radius: 16px;
  background: rgba(43, 42, 56, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.16);
}

:root[data-theme-mode='light'] .composer__shell {
  background: rgba(255, 255, 255, 0.94);
  border-color: rgba(28, 28, 36, 0.12);
  box-shadow: 0 18px 50px rgba(84, 93, 241, 0.12);
}
```

If keeping provider/status controls inside the composer footer, make them visually small chips, not raw select boxes:

```css
.mode-selector,
.provider-status {
  min-height: 28px;
  border-radius: 14px;
  background: var(--surface-control);
  border: 1px solid var(--border-soft);
}
```

## Fix 4: Replace Empty Chat Cards With Reference-Like Assistant Preview

Current `.feature-grid` looks like three equal dashboard cards. The reference centers one substantial assistant response/code card.

First visual pass:
- keep the three feature actions if behavior is needed
- make them secondary
- add a larger primary assistant-preview surface above or instead of them

Minimum CSS-only improvement:

```css
.hero {
  padding: 80px 16px 24px;
  gap: 28px;
}

.hero__title {
  font-size: 30px;
  line-height: 1.15;
  color: var(--text-on-surface);
}

.feature-grid {
  max-width: 884px;
  gap: 18px;
}

.feature-card {
  min-height: 118px;
  border-radius: 18px;
  background: var(--surface-card);
  border: 1px solid var(--border-soft);
  color: var(--text-on-surface);
}

.feature-card__title {
  color: var(--text-on-surface);
}

.feature-card__text {
  color: var(--text-on-surface-muted);
}
```

Better component-level improvement:
- add a single assistant preview card in `Chat.jsx`
- width `min(740px, 100%)`
- radius `24px`
- background `var(--surface-card-strong)`
- inside it, show a dark code-card-like block or document answer preview

## Fix 5: Documents Page Alignment

Current Documents dark mode is acceptable but generic. Light mode is broken.

Apply:

```css
.page {
  max-width: 1170px;
  padding: 38px 48px;
}

.documents-layout {
  grid-template-columns: minmax(0, 1.45fr) minmax(340px, 0.9fr);
  gap: 24px;
  margin-top: 24px;
}

.doc-row {
  min-height: 88px;
  padding: 16px 22px;
  border-radius: 18px;
  background: var(--surface-card);
  border: 1px solid var(--border-soft);
}

.doc-row__title,
.ingestion-panel__title,
.ingestion-panel__summary-value {
  color: var(--text-on-surface);
}

.doc-row__meta,
.ingestion-panel__summary-label,
.ingest-step {
  color: var(--text-on-surface-muted);
}

.ingestion-panel {
  min-height: 160px;
  padding: 24px;
  border-radius: 20px;
  background: var(--surface-card);
  border: 1px solid var(--border-soft);
}
```

Do not make document rows dark gray in light mode.

## Fix 6: Settings Page Layout

Current Settings panels are too wide and heavy. Make the content feel intentional inside the same rounded canvas.

Apply:

```css
.settings-page {
  max-width: 1170px;
}

.settings-panel {
  padding: 24px 28px;
  border-radius: 20px;
  background: var(--surface-card);
  border: 1px solid var(--border-soft);
  box-shadow: none;
}

.settings-panel__title-wrap,
.settings-panel__title,
.setting-row label {
  color: var(--text-on-surface);
}

.theme-option {
  min-width: 92px;
  min-height: 88px;
  border-radius: 14px;
  background: var(--surface-control);
  border: 1px solid var(--border-soft);
  color: var(--text-on-surface);
}

.theme-option--selected {
  border-color: #545DF1;
  background: rgba(84, 93, 241, 0.18);
  box-shadow: 0 0 0 1px #545DF1;
}
```

## Fix 7: Replace `transition: all`

Use this table as the cleanup map.

| Before | After | Why |
|---|---|---|
| `transition: all 160ms ease` | `transition: background 160ms ease, border-color 160ms ease, color 160ms ease, transform 160ms ease, box-shadow 160ms ease` | Avoids accidental layout/property animation. |
| hover `transform: translateY(-2px)` everywhere | `translateY(-1px)` only on cards/buttons that benefit from lift | Frequent controls should feel crisp, not floaty. |
| no active state on some buttons | `:active { transform: scale(0.98); }` | Pressables should acknowledge the click. |
| hover effects on touch devices | wrap larger hover transforms in `@media (hover: hover) and (pointer: fine)` | Avoid sticky hover on touch screens. |

## Fix 8: Detector Findings

Impeccable detector found:

| File | Finding | Action |
|---|---|---|
| `LocalMind_UI/src/styles/markdown.css:114` | `border-left: 2px solid #545DF1` side-tab accent | Replace with subtle full-card tint or `border-inline-start: 1px solid rgba(84,93,241,.35)` only if needed. |
| `LocalMind_UI/src/utils/pdfExport.js:95` and `:113` | Helvetica warning | Ignore for now because `look_change.md` explicitly requested Helvetica Neue style. This is PDF output, not main UI. |

## Apply Order

1. Add theme-safe surface/text tokens in `:root` and light theme.
2. Replace hard-coded dark card backgrounds and white text in Documents, Settings, feature cards, composer, and headers.
3. Make `.main-scroll` use `--surface-canvas` and keep the dark reference gradient.
4. Compact the composer so it reads like a chat command bar.
5. Rework the empty chat hero into one primary assistant-preview/card area; keep feature cards secondary.
6. Refine Documents and Settings panel widths, padding, and card surfaces.
7. Replace `transition: all`.
8. Re-screenshot the same six views and compare against `look_change.md`.

## What Not To Do First

- Do not edit backend/API/store logic.
- Do not rebuild generated `frontend/` unless validation is explicitly requested.
- Do not chase tiny icon alignment before fixing theme tokens.
- Do not try to make light mode look like the dark reference.
- Do not add more gradients or glow to hide contrast problems.
- Do not make every panel a heavy gray card.

## Expected Result After First Pass

Dark mode:
- closer to the reference palette
- calmer sidebar
- readable cards
- compact composer
- less generic empty state

Light mode:
- readable text
- white/soft panels instead of gray blocks
- same structure as dark mode without pretending to be the dark reference

The first pass is successful only if all six screenshots are readable and the dark chat screen visually matches the reference direction before any fine polish begins.
