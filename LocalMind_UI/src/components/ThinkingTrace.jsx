import { Brain, ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function ThinkingTrace({ steps = [], streaming = false }) {
  const [open, setOpen] = useState(streaming)

  useEffect(() => {
    setOpen(streaming)
  }, [streaming])

  if (!steps.length) return null

  return (
    <div className={`thinking ${streaming ? 'thinking--live' : ''}`}>
      <button
        type="button"
        className="thinking__header"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <Brain size={14} className="thinking__icon" />
        <span className="thinking__spark" aria-hidden="true">*</span>
        <span className="thinking__label">
          {streaming ? 'Thinking...' : 'How this answer was assembled'}
        </span>
        <ChevronDown
          size={13}
          className={`thinking__chevron ${open ? 'thinking__chevron--open' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.ol
            className="thinking__steps"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18 }}
          >
            {steps.map((step, index) => {
              const isLast = index === steps.length - 1
              const isDone = !streaming || !isLast
              return (
                <li
                  key={`${step.label}-${index}`}
                  className={`thinking__step ${isDone ? 'thinking__step--done' : 'thinking__step--active'}`}
                >
                  <span className="thinking__step-marker" aria-hidden="true">
                    {isDone ? 'done' : 'active'}
                  </span>
                  <span className="thinking__step-label">{step.label}</span>
                  {step.detail ? (
                    <span className="thinking__step-detail">{step.detail}</span>
                  ) : null}
                </li>
              )
            })}
          </motion.ol>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
