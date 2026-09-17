import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
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
  const inputRef = useRef(null)
  const bottomRef = useRef(null)
  const isGenerating = Boolean(activeRequest)
  const [cooldown, setCooldown] = useState(0)
  const prevGeneratingRef = useRef(isGenerating)

  useEffect(() => {
    if (prevGeneratingRef.current && !isGenerating) {
      setCooldown(3)
    }
    prevGeneratingRef.current = isGenerating
  }, [isGenerating])

  useEffect(() => {
    if (cooldown <= 0) return undefined
    const timer = window.setTimeout(() => {
      setCooldown((prev) => Math.max(0, prev - 1))
    }, 1000)
    return () => window.clearTimeout(timer)
  }, [cooldown])

  const messages = useMemo(
    () => messagesByChatId[activeChatId] || [],
    [activeChatId, messagesByChatId],
  )
  const lastMessageId = messages[messages.length - 1]?.id

  const handleStarterDraft = (prompt) => {
    setDraft(activeChatId, prompt)
    inputRef.current?.focus()
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [activeChatId])

  useLayoutEffect(() => {
    const container = document.querySelector('.main-scroll')
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
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="hero__title">What would you like to know?</h2>
                <div className="hero__cards">
                  <button
                    type="button"
                    className="hero__card"
                    onClick={() => handleStarterDraft('What file formats can I upload?')}
                  >
                    <span className="hero__card-title">Supported Formats</span>
                    <span className="hero__card-question">What file formats can I upload?</span>
                  </button>
                  <button
                    type="button"
                    className="hero__card"
                    onClick={() => handleStarterDraft('How do you make sure your answers are accurate?')}
                  >
                    <span className="hero__card-title">Trusted Answers</span>
                    <span className="hero__card-question">How do you make sure your answers are accurate?</span>
                  </button>
                  <button
                    type="button"
                    className="hero__card"
                    onClick={() => handleStarterDraft('How do I quickly find something in my documents?')}
                  >
                    <span className="hero__card-title">Instant Search</span>
                    <span className="hero__card-question">How do I quickly find something in my documents?</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {loading && !isGenerating ? <Loader /> : null}
          <div ref={bottomRef} aria-hidden="true" />
        </div>
      </div>

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
            <>
              <ProviderStatus />
              <ModeSelector />
            </>
          }
        />
      </div>
    </section>
  )
}
