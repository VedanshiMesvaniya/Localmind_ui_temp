// Evidence Relay Workbench mark: two source rails (documents + database)
// converge inward and connect across one answer bridge.
// Left rail: (8,7) to (8,21). Right rail: (24,7) to (24,21).
// Inward connectors: left to (13,24), right to (19,24).
// Answer bridge: (13,24) to (19,24), stroke 3, relay accent.
// Open top signals inspectable evidence. No circles, no nodes, no gradient.
export default function BrandMark({ size = 20, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Left + right source rails, open top */}
      <path
        d="M8 7V21L13 24H19L24 21V7"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Answer bridge — the validated answer where both channels meet */}
      <path
        d="M13 24H19"
        stroke="var(--accent)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}
