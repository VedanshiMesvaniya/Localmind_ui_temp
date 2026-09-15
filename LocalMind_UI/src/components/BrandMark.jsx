// Evidence Relay Workbench mark: two source rails (documents + database)
// converge inward and connect across one answer bridge.
// Left rail: (8,7) to (8,21). Right rail: (24,7) to (24,21).
// Inward connectors: left to (13,24), right to (19,24).
// Answer bridge: (13,24) to (19,24), stroke 3, relay accent.
// Open top signals inspectable evidence. No circles, no nodes.
import { useId } from 'react'

/**
 * LocalMind 'LM' Monogram Brand Mark
 * - 'L' in structured graphite stroke with circuit trace & node
 * - 'M' in vibrant violet gradient with central relay node
 */
export default function BrandMark({ size = 20, className }) {
  const gradId = useId()

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
      {/* Left rail + inward connector */}
      <defs>
        <linearGradient
          id={`m-grad-${gradId}`}
          x1="13.5"
          y1="12"
          x2="25.5"
          y2="25"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#7680FF" />
          <stop offset="100%" stopColor="#545DF1" />
        </linearGradient>
      </defs>

      {/* Subtle backdrop halo */}
      <circle cx="16" cy="16" r="13" fill="var(--primary-soft)" opacity="0.4" />

      {/* 'L' outer structure */}
      <path
        d="M8 7V21L13 24"
        d="M8.5 7.5V24.5H18"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right rail + inward connector */}

      {/* 'L' inner circuit trace */}
      <path
        d="M24 7V21L19 24"
        stroke="currentColor"
        strokeWidth="2.6"
        d="M8.5 8V24.5H16.5"
        stroke="#7680FF"
        strokeWidth="0.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
      {/* Answer bridge: relay accent */}

      {/* 'L' top node terminal */}
      <circle cx="8.5" cy="7.5" r="1.3" fill="#7680FF" />
      <circle cx="8.5" cy="7.5" r="0.6" fill="#FFFFFF" />

      {/* 'M' path with violet gradient */}
      <path
        d="M13 24H19"
        stroke="var(--accent)"
        strokeWidth="3"
        d="M14 24.5V13L19.25 18.75L24.5 13V24.5"
        stroke={`url(#m-grad-${gradId})`}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 'M' center vertex node */}
      <circle cx="19.25" cy="18.75" r="1.7" fill="#FFFFFF" />
      <circle cx="19.25" cy="18.75" r="0.9" fill="#545DF1" />

      {/* 'M' bottom-right terminal node */}
      <circle cx="24.5" cy="24.5" r="0.75" fill="#FFFFFF" />
    </svg>
  )
}
