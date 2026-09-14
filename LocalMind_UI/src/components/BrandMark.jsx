import { useId } from 'react'

/**
 * LocalMind 'LM' Monogram Brand Mark
 * - 'L' in structured graphite stroke with circuit trace & node
 * - 'M' in vibrant verdigris gradient with central relay node
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
      <defs>
        <linearGradient
          id={`m-grad-${gradId}`}
          x1="13.5"
          y1="12"
          x2="25.5"
          y2="25"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#4CB89F" />
          <stop offset="100%" stopColor="#0F6B62" />
        </linearGradient>
      </defs>

      {/* Subtle backdrop halo */}
      <circle cx="16" cy="16" r="13" fill="var(--primary-soft)" opacity="0.4" />

      {/* 'L' outer structure */}
      <path
        d="M8.5 7.5V24.5H18"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 'L' inner circuit trace */}
      <path
        d="M8.5 8V24.5H16.5"
        stroke="#4CB89F"
        strokeWidth="0.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />

      {/* 'L' top node terminal */}
      <circle cx="8.5" cy="7.5" r="1.3" fill="#4CB89F" />
      <circle cx="8.5" cy="7.5" r="0.6" fill="#FFFFFF" />

      {/* 'M' path with verdigris gradient */}
      <path
        d="M14 24.5V13L19.25 18.75L24.5 13V24.5"
        stroke={`url(#m-grad-${gradId})`}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 'M' center vertex node */}
      <circle cx="19.25" cy="18.75" r="1.7" fill="#FFFFFF" />
      <circle cx="19.25" cy="18.75" r="0.9" fill="#0F6B62" />

      {/* 'M' bottom-right terminal node */}
      <circle cx="24.5" cy="24.5" r="0.75" fill="#FFFFFF" />
    </svg>
  )
}
