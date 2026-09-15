# LocalMind UI Visual Redesign Plan

## 1. Scope

Redesign the LocalMind frontend to match the supplied reference images:

- `ui_details/demo.webp`
- `ui_details/color pallet.webp`

The target direction is a polished dark-first AI workspace with graphite surfaces, violet and blue accents, rounded panels, soft gradients, stronger typography, and consistent light and dark themes.

The existing menu placement, navigation order, routes, chat workflow, upload workflow, provider behavior, store actions, API contracts, and backend behavior must remain unchanged.

This document is a plan only. No application code is changed by this document.

## 2. Design Direction

The new interface should feel like a focused technical workspace rather than a generic AI chat screen.

Reference characteristics to preserve:

- Graphite dark shell.
- Violet and blue primary accent.
- Soft blue and violet glow around active areas.
- Rounded panels and controls.
- Compact, readable sans-serif typography.
- Clear answer hierarchy.
- Code and evidence content presented in framed, readable blocks.
- Consistent visual language across light and dark mode.

The menu remains the user's existing menu. Only its visual treatment changes.

## 3. Exact Color Tokens

The supplied palette includes:

- `#545DF1`
- `#1C1C24`
- `#2B2A38`
- `#424168`

Use these as the core design anchors.

### Light Theme

| Token | Value | Use |
|---|---:|---|
| `--accent` | `#545DF1` | Primary accent and active states |
| `--primary` | `#545DF1` | Main buttons and links |
| `--primary-hover` | `#4650D8` | Hover state |
| `--bg` | `#E8E8EB` | Application background |
| `--bg-soft` | `#F4F4F7` | Secondary background areas |
| `--panel` | `#FFFFFF` | Cards, panels, dialogs |
| `--panel-strong` | `#F8F8FB` | Elevated content areas |
| `--panel-border` | `#D8D9E2` | Panel and control borders |
| `--text-primary` | `#111217` | Main text and headings |
| `--text-secondary` | `#4F5263` | Supporting text |
| `--text-muted` | `#737789` | Hints and metadata |
| `--sidebar-bg` | `#F6F6F9` | Sidebar background |
| `--composer-bg` | `#FFFFFF` | Composer background |
| `--focus-ring` | `#545DF1` | Keyboard and input focus |

### Dark Theme

| Token | Value | Use |
|---|---:|---|
| `--accent` | `#545DF1` | Primary accent and active states |
| `--primary` | `#6670FF` | Main buttons and links |
| `--primary-hover` | `#7680FF` | Hover state |
| `--bg` | `#1C1C24` | Application background |
| `--bg-soft` | `#232330` | Secondary background areas |
| `--panel` | `#2B2A38` | Cards, panels, dialogs |
| `--panel-strong` | `#34324A` | Elevated content areas |
| `--panel-border` | `rgba(255, 255, 255, 0.10)` | Panel and control borders |
| `--text-primary` | `#F6F6FA` | Main text and headings |
| `--text-secondary` | `#CACBE0` | Supporting text |
| `--text-muted` | `#8E90A8` | Hints and metadata |
| `--sidebar-bg` | `#1C1C24` | Sidebar background |
| `--composer-bg` | `rgba(66, 65, 104, 0.62)` | Composer background |
| `--focus-ring` | `#7680FF` | Keyboard and input focus |

Do not retain the old warm cream, brown, or verdigris visual identity after this pass.

## 4. Typography

### Font Family

Replace the current mixed editorial typography with one consistent UI system:

```css
--font-ui: "Helvetica Neue", Helvetica, Arial, system-ui, sans-serif;
--font-body: "Helvetica Neue", Helvetica, Arial, system-ui, sans-serif;
--font-display: "Helvetica Neue", Helvetica, Arial, system-ui, sans-serif;
--font-mono: "JetBrains Mono", "SFMono-Regular", Consolas, monospace;
```

### Typography Rules

- Remove the serif appearance from the hero and product UI.
- Use `font-weight: 700` for primary page headings.
- Use `font-weight: 600` for section headings and active labels.
- Use `font-weight: 400` for normal content.
- Use `letter-spacing: 0` throughout the interface.
- Use the mono font only for code, technical values, and structured evidence.
- Keep body text readable at a minimum of `14px`.
- Keep secondary metadata between `12px` and `13px`.

### Hero Heading

Update `.hero__title` to:

- Font family: `var(--font-display)`.
- Size: `clamp(32px, 4vw, 52px)`.
- Weight: `700`.
- Color: `var(--text-primary)`.
- Letter spacing: `0`.
- Line height: approximately `1.08`.

The current heading may remain if the product wording is required. The preferred visual wording is:

```text
What would you like to know?
```

## 5. Shape, Spacing, and Motion Tokens

Use these radius values consistently:

```css
--radius-xl: 22px;
--radius-lg: 18px;
--radius-md: 14px;
--radius-sm: 10px;
```

Use these interaction rules:

- Standard button height: `42px`.
- Mobile button height: `44px`.
- Icon button target: minimum `40px` by `40px`.
- Standard control gap: `8px`.
- Panel gap: `14px`.
- Main content spacing: `24px` to `32px`.
- Active button press: `transform: scale(0.97)`.
- Transition duration: `150ms` to `220ms`.
- Use exact property transitions instead of broad `transition: all`.
- Use a short ease-out curve for hover and press feedback.

### Focus Ring

Use the same focus treatment in both themes:

```css
box-shadow:
  0 0 0 1px var(--focus-ring),
  0 0 0 4px color-mix(in srgb, var(--focus-ring) 18%, transparent);
```

The focus ring must be visible for keyboard users and must not look like a heavy double border.

## 6. Sidebar and Menu

### What Stays the Same

- Existing sidebar placement.
- Existing menu order.
- Existing Documents, Recent Chats, Settings, and footer locations.
- Existing collapsed rail behavior.
- Existing navigation routes.

### Brand Header

File targets:

- `LocalMind_UI/src/components/Sidebar.jsx`
- `LocalMind_UI/src/styles/globals.css`

Changes:

- Remove the large `LM` or circuit-style mark from the expanded sidebar header.
- Display the brand as one word: `LocalMind`.
- Remove forced uppercase styling.
- Use `20px` font size and `700` weight.
- Keep the mark only for the collapsed rail and favicon when the new relay mark is ready.
- Prevent truncation and ensure the complete word fits in the sidebar width.

### Navigation

- Keep the current menu placement.
- Change active navigation items to violet filled pills.
- Active background: `#545DF1`.
- Active text and icon: `#FFFFFF`.
- Remove the old inset left-bar treatment.
- Use `14px` radius for active items.
- Give nav items a minimum height of `42px`.
- Keep icon and label alignment consistent.

### New Chat Button

- Background: `#545DF1`.
- Hover background: `#4650D8` in light mode and `#7680FF` in dark mode.
- Text and icon: `#FFFFFF`.
- Height: `44px`.
- Radius: `14px`.
- Use the active press scale of `0.97`.

## 7. Empty Chat Screen and Starter Cards

File targets:

- `LocalMind_UI/src/components/Chat.jsx`
- `LocalMind_UI/src/styles/globals.css`

Replace the current four starter cards with three cards in this order.

### Card 1: Supported Documents

Title:

```text
Supported documents
```

Description:

```text
See which file types LocalMind can read.
```

Action:

```text
What kind of documents can I upload?
```

Behavior: prefill the existing composer draft using the current starter-draft flow.

### Card 2: Your Documents

Title:

```text
Your documents
```

Description:

```text
Review uploaded sources before asking.
```

Behavior:

- If documents exist, show the current document state or open the Documents view.
- If no documents exist, open `/documents`.
- Do not add a new backend request.

### Card 3: Database Status

Title:

```text
Database status
```

Description:

```text
Check whether connected data is reachable.
```

Behavior: use the existing provider or database health state already available in the app. Do not introduce a new backend call or store contract.

### Grid Layout

Update `.feature-grid` to:

```css
display: grid;
grid-template-columns: repeat(3, minmax(0, 1fr));
gap: 14px;
width: min(100%, 900px);
```

Responsive behavior:

- Desktop: three equal columns.
- Tablet: two columns if needed by available width.
- Mobile: one column.

Card styling:

- Background: `var(--panel)`.
- Border: `1px solid var(--panel-border)`.
- Radius: `18px`.
- Padding: `18px`.
- Hover border: `rgba(84, 93, 241, 0.42)`.
- Hover translation: maximum `translateY(-2px)`.
- Keep the full card clickable without nesting buttons inside buttons.

## 8. Composer

File target:

- `LocalMind_UI/src/styles/globals.css`

Update the composer to become the primary visual anchor of the empty chat screen.

Dimensions:

```css
width: min(calc(100vw - var(--sidebar-width) - 64px), 900px);
border-radius: 22px;
```

Light mode:

- Background: `#FFFFFF`.
- Shadow: `0 18px 48px rgba(84, 93, 241, 0.18)`.

Dark mode:

```css
background:
  linear-gradient(
    180deg,
    rgba(84, 93, 241, 0.16),
    rgba(66, 65, 104, 0.72)
  ),
  var(--composer-bg);
box-shadow: 0 24px 80px rgba(84, 93, 241, 0.32);
```

Focus behavior:

- Use the shared one-pixel border and soft four-pixel focus glow.
- Match the focus appearance in light and dark mode.
- Avoid a thick or duplicated outline.

## 9. Messages, Answers, and Code Blocks

### User Messages

- Background: `#545DF1`.
- Text: `#FFFFFF`.
- Radius: `18px 18px 6px 18px`.
- Maximum width: approximately `720px`.

### Assistant Messages

Light mode:

- Background: `#FFFFFF`.
- Border: `1px solid #D8D9E2`.

Dark mode:

- Background: `#2B2A38`.
- Border: `1px solid rgba(255, 255, 255, 0.10)`.

Both modes:

- Radius: `22px`.
- Text color: `var(--text-primary)`.
- Supporting text color: `var(--text-secondary)`.
- Keep citation, source, and status information visually subordinate to the answer.

### Code and Evidence Blocks

- Code background: `#1C1C24`.
- Code header background: `#202231`.
- Active tab or selected language accent: `#545DF1`.
- Border radius: `18px`.
- Font: `var(--font-mono)`.
- Keep syntax and technical values high contrast.
- Do not let long lines expand the page horizontally.

### Message Actions

- Minimum target: `36px` by `36px`.
- Prefer `40px` by `40px` where space allows.
- Use familiar icons with tooltips.
- Add visible hover, focus, and pressed states.

## 10. Documents View

File target:

- `LocalMind_UI/src/components/Documents.jsx`

Changes:

- Keep the existing Documents route and upload behavior.
- Use the same panel, border, radius, and typography tokens.
- Upload panel radius: `18px`.
- Drag or focus border: `rgba(84, 93, 241, 0.22)`.
- Document rows should read as list items with clear dividers.
- Avoid nested interactive elements, such as a button inside another button.
- Use separate controls for row selection, opening, downloading, and deletion where those actions already exist.
- Ensure every row action has a minimum `40px` target.
- Keep empty, loading, success, failure, and upload-progress states readable in both themes.

## 11. Settings and Form Controls

File targets:

- Existing Settings component files.
- `LocalMind_UI/src/styles/globals.css`.

Changes:

- Use one visually clear panel per settings section.
- Do not place cards inside other cards without a clear interaction reason.
- Inputs and selects: `42px` height, `12px` radius.
- Mobile controls: minimum `44px` height.
- Use the shared focus ring for every input, select, textarea, checkbox, and button.
- Keep labels above controls and readable in both themes.
- Use `var(--text-muted)` only for hints, never for required labels.
- Preserve existing provider, token, theme, schema-sync, and connection behavior.

## 12. Dialogs and Overlays

- Dialog radius: `22px`.
- Dialog background: `var(--panel)`.
- Border: `1px solid var(--panel-border)`.
- Add a clear title and description where the current workflow needs them.
- Preserve Escape-to-close behavior where already available.
- Preserve focus trapping and return focus to the triggering control.
- Ensure action buttons remain visible at mobile widths.

## 13. Responsive Rules

Desktop:

- Preserve the current sidebar placement.
- Use the three-card starter grid.
- Keep the composer centered in the available main content area.

Tablet:

- Reduce main content padding to `20px`.
- Allow starter cards to use two columns.
- Keep the composer within the viewport without horizontal scrolling.

Mobile:

- Use one starter card per row.
- Use minimum `44px` interactive controls.
- Keep the composer width within `calc(100% - 24px)`.
- Prevent text, code, buttons, and badges from overflowing their containers.
- Preserve the user's current menu access pattern.

## 14. Audit Fixes Included in This Pass

The redesign must also resolve the existing UI quality issues identified in the audit:

- Replace the warm cream and brown palette.
- Remove mixed serif and sans-serif product typography.
- Reduce excessive borders and nested containers.
- Establish one radius system.
- Establish one focus system.
- Increase controls below the `40px` to `44px` target range.
- Add consistent `:focus-visible` states.
- Remove nested interactive controls in document rows.
- Improve empty-chat starter cards so they reflect real LocalMind workflows.
- Consolidate motion into short, predictable interactions.
- Ensure dark mode is designed intentionally rather than treated as a simple inversion.
- Keep the page hierarchy clear without adding decorative blobs, unrelated gradients, or marketing-style sections.

## 15. Files Expected to Change During Implementation

Primary files:

- `LocalMind_UI/src/styles/globals.css`
- `LocalMind_UI/src/components/Sidebar.jsx`
- `LocalMind_UI/src/components/Chat.jsx`

Review and update only where required by the same visual system:

- `LocalMind_UI/src/components/Documents.jsx`
- Settings component files.
- Message, markdown, code-block, and dialog component files.

Do not change:

- Backend files.
- API contracts.
- Store action names.
- Provider and database behavior.
- Upload, streaming, citation, SQL, ingestion, or export behavior.
- Existing menu placement or route structure.

## 16. Implementation Order

1. Confirm work is on `feat/add-new` and preserve unrelated worktree changes.
2. Update theme tokens, typography, radii, spacing, and focus styles.
3. Update the expanded sidebar brand and navigation appearance.
4. Replace the four empty-chat cards with the three approved cards.
5. Update composer background, glow, dimensions, and focus behavior.
6. Update user messages, assistant messages, code blocks, citations, and message actions.
7. Apply the same tokens to Documents, Settings, forms, dialogs, and upload states.
8. Fix nested interactive controls and undersized controls found by the audit.
9. Check responsive layouts and text overflow.
10. Run source checks and only run the frontend build when explicitly requested.

## 17. Acceptance Checklist

### Visual

- [ ] The interface uses the violet and graphite reference palette.
- [ ] Light mode and dark mode feel like the same product.
- [ ] The old cream, brown, verdigris, and serif appearance is gone.
- [ ] LocalMind fits fully in the expanded sidebar.
- [ ] The menu placement and order are unchanged.
- [ ] The empty chat screen shows exactly three starter cards.
- [ ] The starter cards use a three-column desktop layout.
- [ ] The composer has a soft violet or blue glow and intentional focus ring.
- [ ] Cards, messages, dialogs, and controls use the shared radius system.
- [ ] The main heading has strong contrast and correct typography.

### Interaction

- [ ] Starter card one fills the existing composer draft.
- [ ] Starter card two uses the existing Documents state and route.
- [ ] Starter card three uses the existing database or provider status state.
- [ ] Existing chat, upload, provider, export, citation, and streaming flows still work.
- [ ] Buttons and controls provide hover, focus, and pressed feedback.
- [ ] Keyboard focus is visible throughout the interface.
- [ ] No interactive element is nested inside another interactive element.

### Scope

- [ ] No backend file is changed.
- [ ] No API or store contract is changed.
- [ ] No menu item is moved.
- [ ] No route is removed or renamed.
- [ ] No em dash is added to code, comments, or UI copy.
- [ ] Browser tab title remains `LocalMind`.

## 18. Design Authorities

Use these three design authorities during implementation and review:

- Taste / `design-taste-frontend`: use for design direction, visual coherence, typography discipline, and anti-template decisions.
- Emil Kowalski / `emil-design-eng`: use for interaction polish, press feedback, focus behavior, motion timing, and component detail.
- Impeccable: use for product-specific hierarchy, workflow clarity, accessibility, responsive behavior, theming, and audit validation.

The final result should look like a deliberate LocalMind workspace built from the supplied references, while keeping the application's current workflow and menu structure intact.
