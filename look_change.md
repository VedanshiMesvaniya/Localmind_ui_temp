# Look Change Spec

Reference images:
- `ui_details/demo.webp`
- `ui_details/color pallet.webp`

Goal: copy the visual language from the references into the project UI. This is a dark, rounded desktop chat app with a calm black/purple shell, bright blue selected states, soft translucent panels, and compact Helvetica-style typography.

## Visual Direction

The UI should feel like a premium AI chat workspace:
- dark outer application shell
- left sidebar fixed in place
- large rounded chat canvas on the right
- selected sidebar item as a bright blue pill
- right-aligned user message bubble in the same bright blue
- assistant response shown as a raised card with a code block and a `Copy code` action
- bottom input bar floating inside the chat canvas
- white text, muted gray secondary text, and purple/blue glow accents

Use the reference as a dark theme first. Do not make it beige, flat gray, or plain black.

## Palette

Use these colors from `color pallet.webp`:

| Use | Hex | Notes |
|---|---:|---|
| Primary blue | `#545DF1` | Selected sidebar pill, user bubble, active tab, send/action accents |
| App black | `#1C1C24` | Main outside shell, sidebar background, top header |
| Panel dark | `#2B2A38` | Chat canvas, cards, dark surfaces |
| Muted purple | `#424168` | Response card border/glow, soft upper highlight, secondary purple surfaces |

Additional supporting colors:

| Use | Hex | Notes |
|---|---:|---|
| Main text | `#FFFFFF` | Primary labels and message text |
| Soft text | `#D9D9E7` | Secondary text and input placeholder |
| Muted text | `#9B9AA8` | Section labels, line numbers, quiet metadata |
| Hairline border | `rgba(255,255,255,0.08)` | Card/header/input dividers |
| Control surface | `rgba(255,255,255,0.06)` | Search, icon buttons, small controls |
| Control hover | `rgba(255,255,255,0.10)` | Hover/focus state |
| Blue glow | `rgba(84,93,241,0.40)` | Active pill and input glow |
| Purple glow | `rgba(66,65,104,0.50)` | Assistant card outer glow |

## Typography

Font family:

```css
font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
```

Reference typography:
- app title: 22-24px, 700 weight
- sidebar brand: 18-20px, 700 weight
- sidebar menu labels: 14-15px, 500-600 weight
- section label: 11-12px uppercase, 500 weight, letter spacing around 0.08em
- message text: 14-15px, 400-500 weight
- code text: 14-15px monospace
- button/input text: 14-15px, 500 weight

Keep letter spacing at `0` for normal labels. Use uppercase letter spacing only for small section labels like `SETTINGS & HELP`.

## Reference Frame

The reference artwork is shown as a desktop mockup around a 4:3 canvas. Treat the numbers below as the target desktop proportions:

| Element | Target |
|---|---:|
| outer app width | about 1280-1320px |
| outer app height | about 860-900px |
| outer app radius | 28-32px |
| sidebar width | 250-270px |
| main chat radius | 24-28px |
| left/right app padding | 18-24px |
| sidebar item height | 42-46px |
| chat input height | 42-46px |
| icon button size | 40-44px |

For implementation, keep these proportions responsive instead of hard-coding only one screen size.

## App Shell

Outer shell:
- background: `#1C1C24`
- border radius: `28px`
- padding: `18px`
- display: horizontal flex row
- gap between sidebar and main chat: `18px`
- overflow: hidden
- optional subtle border: `1px solid rgba(255,255,255,0.06)`

Page background outside the app:
- light neutral gray in the reference mockup
- for the actual product, keep whatever app page background exists unless this shell is visible as a centered object

## Sidebar

Sidebar placement:
- fixed left column inside the shell
- width: `256px`
- padding: `20px 16px`
- background: `#1C1C24`
- text color: white

Sidebar top:
- logo row height: about `40px`
- logo mark: small blue/purple symbol, around `28px`
- brand text: `Assistly` style sizing, around `18px`, bold
- collapse/control icon sits at far right

Search:
- width: full sidebar content width
- height: `42px`
- margin top: `22px`
- background: `rgba(255,255,255,0.06)`
- border: none or `1px solid rgba(255,255,255,0.05)`
- border radius: `20px`
- icon left padding: `16px`
- text padding: `0 16px 0 44px`
- placeholder color: `#D9D9E7` at reduced opacity

Menu list:
- vertical gap: `8px`
- item height: `42-46px`
- border radius: `22px`
- icon size: `18-20px`
- label starts around `52px` from item left
- normal item background: transparent
- normal item text: `#FFFFFF` with about 86-90% opacity
- hover background: `rgba(255,255,255,0.06)`

Selected menu item:
- background: `#545DF1`
- text: `#FFFFFF`
- icon: white stroke
- border radius: full pill, `22-24px`
- box shadow: `0 10px 24px rgba(84,93,241,0.35)`
- height: `44px`
- left/right padding: `16px`
- do not add a side stripe; the selected state is the whole pill

Small right-side item controls:
- circular control size: `30-34px`
- background: `rgba(255,255,255,0.06)`
- icon color: white
- used for expand chevron and plus button

Settings section:
- placed below main nav with `32-40px` top gap
- heading: `SETTINGS & HELP`
- color: muted gray
- uppercase, 11-12px
- menu items follow same spacing as main nav but not blue unless active

Bottom profile/pro card:
- upgrade card has border `1px solid rgba(255,255,255,0.12)`
- radius: `14-16px`
- padding: `16px`
- dark transparent background
- button uses `#545DF1`, height `44px`, pill radius
- profile row at bottom has pill/card background `rgba(255,255,255,0.06)` and radius `22px`

## Main Header

Header sits above the chat canvas:
- title text: `Messaging app`
- font size: `22-24px`
- weight: `700`
- white color
- small circular dropdown beside title
- top-right icon buttons: notification, info, theme/sun

Icon buttons:
- size: `40-44px`
- radius: `50%`
- background: `rgba(255,255,255,0.07)`
- hover: `rgba(255,255,255,0.12)`
- icon color: white

## Chat Canvas

Main chat area:
- background: `#2B2A38`
- border radius: `24-28px`
- position: relative
- overflow: hidden
- inner padding: `48px 64px 28px`

Add a soft blue/purple glow from the bottom:

```css
background:
  radial-gradient(circle at 65% 100%, rgba(84,93,241,0.48), transparent 34%),
  linear-gradient(180deg, #2B2A38 0%, #28263A 58%, #302D54 100%);
```

Top decorative highlight:
- centered near top of chat canvas
- width: about `720px`
- height: `22px`
- background: `rgba(84,93,241,0.22)` or muted purple
- border radius: `0 0 999px 999px`
- very subtle, not a bright banner

## User Message Bubble

Right-aligned user message:
- background: `#545DF1`
- text: white
- border radius: `14px`
- width: fit content
- max width: about `360px`
- padding: `16px 22px`
- font size: `14-15px`
- line height: `1.45`
- box shadow: `0 14px 30px rgba(84,93,241,0.25)`
- align to the right side of chat canvas
- margin top from canvas: about `52px`
- margin right: about `80px`

Reference text:

```text
How do I add interactivity to chat controls?
```

## Assistant Response Card

Large assistant card:
- centered horizontally
- width: about `680-740px`
- background: `rgba(66,65,104,0.88)`
- border: `1px solid rgba(255,255,255,0.07)`
- border radius: `22-24px`
- padding: `18px`
- margin top below user bubble: `28-36px`
- box shadow:
  - `0 24px 70px rgba(0,0,0,0.35)`
  - `0 0 0 8px rgba(84,93,241,0.08)` if a glow ring is wanted

The card must feel raised, not flat. The purple outer surface should be visible around the dark code panel.

## Code Block Card

Code panel inside assistant response:
- background: `#1E2533` or very dark blue-gray
- border radius: `12-14px`
- overflow: hidden
- border: `1px solid rgba(255,255,255,0.07)`

Code header:
- height: `54-58px`
- display: flex
- align-items: center
- border-bottom: `1px solid rgba(255,255,255,0.08)`
- padding: `0 14px`

Tabs:
- labels: `HTML`, `CSS`, `JS`
- normal tabs: transparent, white text, height `28-30px`, padding `0 8px`
- active tab `JS`: background `#545DF1`, white text, radius `6-8px`, padding `6px 14px`
- tab gap: `10-12px`

Copy code control:
- placed at top-right of code header
- icon: copy/overlapping-squares
- label: `Copy code`
- color: white
- font size: `14px`
- gap between icon and text: `8px`
- background: transparent
- border: none
- hover: subtle `rgba(255,255,255,0.06)` with `8px` radius
- keep it inside the code header, vertically centered

Code body:
- padding: `18px 22px`
- line height: `1.55`
- code font size: `14-15px`
- line numbers muted `rgba(255,255,255,0.22)`
- code text mostly white
- syntax accents:
  - orange: functions/properties
  - green: strings
  - red/pink: keywords or DOM terms

## Assistant Text Below Code

Description text:
- margin top: `16px`
- color: white
- font size: `14-15px`
- line height: `1.45`
- width follows code card

Bottom project link/action:
- margin top: `16px`
- height: `44px`
- background: `#1E2533`
- border radius: `10-12px`
- padding: `0 14px`
- display: flex
- align-items: center
- justify-content: space-between
- text: `Project in your Codepen account`
- external-link icon on right

## Feedback Actions

Under the assistant card:
- place reaction icons near card bottom-right
- icons: thumbs up, thumbs down, copy
- size: `18-20px`
- color: white at about 80% opacity
- gap: `14px`
- no visible button box by default
- hover may show soft circular background

Regenerate button:
- centered below assistant card
- background: `rgba(255,255,255,0.07)` or `rgba(84,93,241,0.16)`
- border: `1px solid rgba(255,255,255,0.08)`
- text white
- height: `42px`
- border radius: `16-18px`
- icon left, text `Regenerate responce` in the reference, but use correct product spelling if desired: `Regenerate response`

## Bottom Composer

Composer row:
- placed at bottom of chat canvas
- horizontally centered
- width: about `680-720px`
- height: `44-48px`
- display flex
- gap: `12px`
- align items center

Left quick buttons:
- attachment and microphone buttons
- size: `40-44px`
- circular
- background: `rgba(255,255,255,0.05)`
- border: `1px solid rgba(255,255,255,0.08)`
- icon white

Input field:
- height: `44-48px`
- flex: 1
- background: `rgba(84,93,241,0.14)`
- border: `1px solid rgba(255,255,255,0.22)`
- border radius: `14-16px`
- padding: `0 16px`
- placeholder: `Start typing`
- placeholder color: `#D9D9E7`
- inner right mini counter/action area: sparkle icon with `24`

Send button:
- size: `44px`
- circular
- background: `rgba(84,93,241,0.18)`
- border: `1px solid rgba(255,255,255,0.08)`
- icon: paper-plane/send
- icon color: white
- hover: `#545DF1`

## Borders And Depth

Use soft borders, not heavy outlines:

```css
border: 1px solid rgba(255,255,255,0.08);
box-shadow: 0 18px 50px rgba(0,0,0,0.28);
```

Use stronger blue shadow only for active blue elements:

```css
box-shadow: 0 10px 24px rgba(84,93,241,0.35);
```

Do not use bright white borders around every card. Most separation should come from dark surface contrast and subtle glow.

## UX Behavior

Expected interaction behavior:
- sidebar items show soft hover background
- selected sidebar item stays blue
- copy code button copies the current code block and can temporarily change label to `Copied`
- input border brightens on focus
- send button becomes blue on hover/focus
- icon buttons have visible focus ring
- assistant card action icons appear clearly but remain quiet
- active tab is visually obvious

Focus ring:

```css
outline: 2px solid rgba(84,93,241,0.75);
outline-offset: 2px;
```

Motion:
- use short transitions, around `160ms`
- animate background, border, opacity, and transform only
- do not animate width/height for the sidebar or chat bubbles

## Responsive Rules

Desktop:
- sidebar visible
- composer and assistant card centered in chat canvas
- preserve the large rounded shell

Tablet:
- sidebar can shrink to icon rail or overlay drawer
- assistant card width: `min(720px, calc(100% - 48px))`
- chat canvas padding: `32px 24px`

Mobile:
- sidebar becomes drawer or bottom navigation
- outer shell radius may reduce to `0-18px`
- chat canvas fills available width
- message bubble max width: `80%`
- assistant card width: `100%`
- composer width: `100%`

## Implementation Checklist

- Add theme tokens for `#545DF1`, `#1C1C24`, `#2B2A38`, `#424168`.
- Update selected sidebar item to a full blue pill.
- Update normal sidebar items to transparent with soft hover.
- Use Helvetica Neue / Helvetica / Arial for this visual style.
- Style user messages as right-aligned blue rounded rectangles.
- Style assistant code responses as purple raised cards with dark inner code block.
- Put `Copy code` in the code block header, top-right.
- Use compact circular icon buttons in header and composer.
- Add bottom blue/purple glow to chat canvas.
- Keep borders subtle and mostly translucent.

## Do Not Change

- Do not change backend behavior.
- Do not remove existing chat, document, provider, SQL, upload, export, or citation functionality.
- Do not replace real product content with the reference text except where making a demo.
- Do not make the UI a generic light theme.
- Do not add thick borders or large white cards.
- Do not add side stripes for active sidebar state; use the blue pill.
