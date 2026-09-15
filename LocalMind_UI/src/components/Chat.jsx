import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Database, FileText, Route } from 'lucide-react'
import { useAppStore } from '../store/store.js'
import InputBox from './InputBox.jsx'
import Loader from './Loader.jsx'
import Message from './Message.jsx'
import ModeSelector from './ModeSelector.jsx'
import ProviderStatus from './ProviderStatus.jsx'

export default function Chat() {
  const activeChatId = useAppStore((state) => state.activeChatId)
  const messagesByChatId = useAppStore((state) => state.messagesByChatId)
  const draftsByChatId = useAppStore((state) => state.draftsByChatId)
  const setDraft = useAppStore((state) => state.setDraft)
  const sendPrompt = useAppStore((state) => state.sendPrompt)
  const stopGeneration = useAppStore((state) => state.stopGeneration)
  const activeRequest = useAppStore((state) => state.activeRequest)
  const loading = useAppStore((state) => state.loading)
  const value = draftsByChatId[activeChatId || '__pending__'] || ''
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const bottomRef = useRef(null)
  const isGenerating = Boolean(activeRequest)
  const [cooldown, setCooldown] = useState(0)
  const prevGeneratingRef = useRef(isGenerating)

  useEffect(() => {
    // When generation completes, trigger 3s rate-protection cooldown
    if (prevGeneratingRef.current && !isGenerating) {
      setCooldown(3)
    }
    prevGeneratingRef.current = isGenerating
  }, [isGenerating])

  useEffect(() => {
    if (cooldown <= 0) return
    const timer = setTimeout(() => {
      setCooldown((prev) => Math.max(0, prev - 1))
    }, 1000)
    return () => clearTimeout(timer)
  }, [cooldown])

  const messages = useMemo(
    () => messagesByChatId[activeChatId] || [],
    [activeChatId, messagesByChatId],
  )
  const lastMessageId = messages[messages.length - 1]?.id

  // Task starters only fill the composer through the existing draft state,
  // sending still goes through the normal submit flow, nothing new is called.
  const handleStarterDraft = (prompt) => {
    setDraft(activeChatId, prompt)
    inputRef.current?.focus()
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [activeChatId])

  useLayoutEffect(() => {
    const container = document.querySelector('.main-scroll')
    const container = document.querySelector('.chat-scroll')
    if (!container) return undefined

    const frame = window.requestAnimationFrame(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      container.scrollTo({
        top: container.scrollHeight,
        behavior: reduceMotion ? 'auto' : 'smooth',
      })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [activeChatId, lastMessageId, loading])

  return (
    <section className="chat-panel">
      <div className="chat-canvas-highlight" aria-hidden="true" />
      <div className="message-stream">
      {/* Scrollable message area */}
      <div className="chat-scroll scrollbar-auto">
        <div className="chat-panel__inner">
          <AnimatePresence mode="popLayout">
            {messages.length ? (
              messages.map((message, index) => (
                <Message
                  key={message.id}
                  message={message}
                  index={index}
                  chatId={activeChatId}
                  hasLaterUserMessage={messages.slice(index + 1).some((entry) => entry.role === 'user')}
                  isLast={index === messages.length - 1}
                />
              ))
            ) : (
              <motion.div
                key="empty"
                className="hero"
                initial={{ opacity: 0, y: 10 }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="hero__title">What would you like to know?</h2>
                <div className="hero__header">
                  <h2 className="hero__title">What would you like to know?</h2>
                  <h2 className="hero__title">Search your connected knowledge</h2>
                  <p className="hero__subtitle">
                    Search uploaded documents, query connected SQL schemas, or ask for analysis.
                    Ask across SQL, documents, or both — LocalMind retrieves structured evidence automatically.
                  </p>
                </div>

                <div className="hero__preview-card">
                  <div className="hero__preview-header">
                    <div className="hero__preview-tabs">
                      <span className="hero__preview-tab hero__preview-tab--active">SQL & RAG</span>
                      <span className="hero__preview-tab">DOCUMENTS</span>
                    </div>
                    <span className="hero__preview-badge">Workbench</span>
                  </div>
                  <div className="hero__preview-body">
                    <p className="hero__preview-text">
                      Ask questions across your knowledge base. LocalMind automatically retrieves citations, executes verified SQL queries, and surfaces structured evidence.
                    </p>
                  </div>
                {/* Mode chips */}
                <div className="hero__modes">
                  <button type="button" className="hero__mode-chip" onClick={() => navigate('/documents')}>
                    <FileText size={14} />
                    <span>Documents</span>
                  </button>
                  <button type="button" className="hero__mode-chip hero__mode-chip--active">
                    <Route size={14} />
                    <span>Hybrid</span>
                  </button>
                  <button type="button" className="hero__mode-chip" onClick={() => handleStarterDraft('Show me the database schema and available tables')}>
                    <Database size={14} />
                    <span>SQL</span>
                  </button>
                </div>

                <div className="feature-grid">
                {/* Starter prompts */}
                <div className="starter-grid">
                  <button
                    type="button"
                    className="feature-card feature-card--action"
                    onClick={() => handleStarterDraft('What kind of documents can I upload?')}
                    className="starter-prompt"
                    onClick={() => handleStarterDraft('Show me available products')}
                  >
                    <strong className="feature-card__title">Supported documents</strong>
                    <p className="feature-card__text">See which file types LocalMind can read.</p>
                    Show me available products
                  </button>

                  <button
                    type="button"
                    className="feature-card feature-card--action"
                    onClick={() => navigate('/documents')}
                    className="starter-prompt"
                    onClick={() => handleStarterDraft('What documents can I search?')}
                  >
                    <strong className="feature-card__title">Your documents</strong>
                    <p className="feature-card__text">Review uploaded sources before asking.</p>
                    What documents can I search?
                  </button>

                  <button
                    type="button"
                    className="feature-card feature-card--action"
                    onClick={() => handleStarterDraft('Check database status and connected schema')}
                    className="starter-prompt"
                    onClick={() => handleStarterDraft('Compare database data with documents')}
                  >
                    <strong className="feature-card__title">Database status</strong>
                    <p className="feature-card__text">Check whether connected data is reachable.</p>
                    Compare database data with documents
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {loading && !isGenerating ? <Loader /> : null}
          <div ref={bottomRef} aria-hidden="true" />
        </div>
      </div>

      {/* Composer — sticky at bottom */}
      <div className="composer">
        <InputBox
          ref={inputRef}
          value={value}
          onChange={(text) => setDraft(activeChatId, text)}
          onSubmit={async () => {
            if (isGenerating) return
            const prompt = value.trim()
            if (!prompt) return
            await sendPrompt(prompt)
            inputRef.current?.focus()
          }}
          onStop={() => {
            stopGeneration()
            inputRef.current?.focus()
          }}
          loading={isGenerating}
          disabled={isGenerating}
          cooldown={cooldown}
          footer={
            <div className="composer__footer-tools">
              <ModeSelector />
              <ProviderStatus />
            </div>
          }
        />
      </div>
    </section>
  )
}
