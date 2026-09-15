import { Coins, ChevronDown } from 'lucide-react'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const fmt = (n) => (n ?? 0).toLocaleString()

/**
 * Collapsible token-usage breakdown shown at the END of an assistant answer,
 * mirroring the ThinkingTrace dropdown at the top. It makes the cost of a
 * query legible: how many tokens went in as context, how many came back as the
 * answer, any hidden reasoning, the total, how many LLM round-trips it took,
 * and which model actually wrote the answer.
 *
 * Renders nothing when no usage was captured — e.g. answers served straight
 * from the document registry, which make no LLM call and so cost 0 tokens.
 * Compact collapsible token-usage line shown at the end of an assistant answer.
 * Collapsed:  "1,284 tokens · 2 LLM calls  ˅"
 * Expanded:   Clean breakdown table with model + provider.
 * Renders nothing when no usage was captured.
 */
export default function TokenUsage({ usage }) {
  const [open, setOpen] = useState(false)
  if (!usage) return null

  const input = usage.input_tokens || 0
  const output = usage.output_tokens || 0
  const thinking = usage.thinking_tokens || 0
  const total = usage.total_tokens ?? input + output + thinking
  if (total <= 0) return null

  const segments = [
    { key: 'input', label: 'Input', hint: 'context + prompt', value: input },
    { key: 'output', label: 'Output', hint: 'the answer', value: output },
    // Thinking only exists on reasoning lanes; hide the row entirely when zero
    // so the common case stays a clean two-line breakdown.
    ...(thinking > 0
      ? [{ key: 'thinking', label: 'Thinking', hint: 'hidden reasoning', value: thinking }]
      : []),
    { key: 'input', label: 'Input', value: input },
    { key: 'output', label: 'Output', value: output },
    ...(thinking > 0 ? [{ key: 'thinking', label: 'Thinking', value: thinking }] : []),
  ]

  const pct = (v) => (total ? `${(v / total) * 100}%` : '0%')
  const callsText = usage.calls ? `· ${usage.calls} LLM call${usage.calls === 1 ? '' : 's'}` : ''

  const bar = (
    <span className="token__bar" aria-hidden="true">
      {segments.map((s) => (
        <span
          key={s.key}
          className={`token__seg token__seg--${s.key}`}
          style={{ width: pct(s.value) }}
          title={`${s.label}: ${fmt(s.value)}`}
        />
      ))}
    </span>
  )

  return (
    <div className={`token ${open ? 'token--open' : ''}`}>
      <button
        type="button"
        className="token__header"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <Coins size={13} className="token__icon" />
        <span className="token__label">{fmt(total)} tokens</span>
        <span className="token__bar-wrap token__bar-wrap--mini">{bar}</span>
        <span className="token__summary">
          {fmt(total)} tokens {callsText}
        </span>
        <ChevronDown
          size={13}
          size={12}
          className={`token__chevron ${open ? 'token__chevron--open' : ''}`}
        />
      </button>

      {open ? (
        <div className="token__details">
          <div className="token__bar-wrap">{bar}</div>
          <ul className="token__rows">
            {segments.map((s) => (
              <li key={s.key} className="token__row">
                <span className={`token__dot token__seg--${s.key}`} />
                <span className="token__row-label">{s.label}</span>
                <span className="token__row-hint">{s.hint}</span>
                <span className="token__row-value">{fmt(s.value)}</span>
      <AnimatePresence>
        {open ? (
          <motion.div
            className="token__details"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18 }}
          >
            <p className="token__details-heading">Token usage</p>
            <ul className="token__rows">
              {segments.map((s) => (
                <li key={s.key} className="token__row">
                  <span className="token__row-label">{s.label}</span>
                  <span className="token__row-value">{fmt(s.value)}</span>
                </li>
              ))}
              <li className="token__row token__row--total">
                <span className="token__row-label">Total</span>
                <span className="token__row-value">{fmt(total)}</span>
              </li>
            ))}
            <li className="token__row token__row--total">
              <span className="token__row-label">Total</span>
              <span className="token__row-value">{fmt(total)}</span>
            </li>
          </ul>
          <div className="token__meta">
            {usage.model ? (
              <span className="token__meta-item">
                {usage.provider ? `${usage.provider} · ` : ''}
                {usage.model}
              </span>
            </ul>
            {(usage.model || usage.calls) ? (
              <p className="token__meta">
                {usage.provider && usage.model
                  ? `${usage.provider} · ${usage.model}`
                  : usage.model || ''}
                {usage.calls ? `${usage.model ? ' · ' : ''}${usage.calls} LLM call${usage.calls === 1 ? '' : 's'}` : ''}
              </p>
            ) : null}
            {usage.calls ? (
              <span className="token__meta-item">
                {usage.calls} LLM call{usage.calls === 1 ? '' : 's'}
              </span>
            ) : null}
          </div>
        </div>
      ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
