import { Brain, ChevronDown } from 'lucide-react'
import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * A collapsible reasoning trace shown above an answer — the pipeline's steps
 * (understand → retrieve → rank → write), streamed live and persisted with the
 * message so it stays forever, like a Claude thinking block.
 *
 * Auto-expands while the answer is still streaming; collapses once done.
 * Collapsible thinking/process trace shown above an assistant answer.
 * Streaming: expanded card with animated step timeline.
 * Completed: collapses to a single quiet summary line.
 */
export default function ThinkingTrace({ steps = [], streaming = false }) {
  const [open, setOpen] = useState(streaming)

  // Collapse automatically when streaming finishes; expand when it (re)starts.
  useEffect(() => {
    setOpen(streaming)
  }, [streaming])

  if (!steps.length) return null

  return (
    <div className={`thinking ${streaming ? 'thinking--live' : ''}`}>
      <button
        type="button"
        className="thinking__header"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <Brain size={14} className="thinking__icon" />
        <span className="thinking__label">{streaming ? 'Thinking…' : 'How this answer was assembled'}</span>
        <span className="thinking__spark" aria-hidden="true">✦</span>
        <span className="thinking__label">
          {streaming ? 'Thinking\u2026' : 'How this answer was assembled'}
        </span>
        <ChevronDown
          size={14}
          size={13}
          className={`thinking__chevron ${open ? 'thinking__chevron--open' : ''}`}
        />
      </button>

      {open ? (
        <ol className="thinking__steps">
          {steps.map((step, i) => (
            <li key={i} className="thinking__step">
              <span className="thinking__step-label">{step.label}</span>
              {step.detail ? <span className="thinking__step-detail">{step.detail}</span> : null}
            </li>
          ))}
        </ol>
      ) : null}
      <AnimatePresence>
        {open ? (
          <motion.ol
            className="thinking__steps"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18 }}
          >
            {steps.map((step, i) => {
              const isLast = i === steps.length - 1
              const isDone = !streaming || !isLast
              return (
                <li
                  key={i}
                  className={`thinking__step ${isDone ? 'thinking__step--done' : 'thinking__step--active'}`}
                >
                  <span className="thinking__step-marker" aria-hidden="true">
                    {isDone ? '✓' : '•'}
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
