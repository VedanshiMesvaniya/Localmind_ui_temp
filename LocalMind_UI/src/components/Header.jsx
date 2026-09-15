import { useEffect, useRef, useState } from 'react'
import { Download, FileText, FileCheck2, Loader2, Menu, Moon, Sun } from 'lucide-react'
import { Download, FileText, FileCheck2, Loader2, Menu, ChevronDown, Check } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { toast } from 'sonner'
import { useAppStore } from '../store/store.js'
import Button from './Button.jsx'
import { generateChatDocument } from '../services/api.js'
import { exportChatTranscript, exportProfessionalDocument } from '../utils/pdfExport.js'
import { AnimatePresence, motion } from 'framer-motion'

// Reusable dismiss hook
function useDismiss(ref, onDismiss, active) {
  useEffect(() => {
    if (!active) return undefined
    const onPointer = (event) => {
      if (ref.current && !ref.current.contains(event.target)) onDismiss()
    }
    const onKey = (event) => {
      if (event.key === 'Escape') onDismiss()
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [ref, onDismiss, active])
}

// Provider picker extracted here so the header can render it
function ProviderPicker() {
  const settings = useAppStore((state) => state.settings)
  const providers = useAppStore((state) => state.providers)
  const updateSettings = useAppStore((state) => state.updateSettings)
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useDismiss(ref, () => setOpen(false), open)

  const fallback = [
    { id: 'auto', label: 'Auto' },
    { id: 'openrouter', label: 'OpenRouter' },
  ]
  const options = providers?.length ? providers : fallback
  const activeId = settings?.provider || 'auto'
  const activeLabel = options.find((o) => o.id === activeId)?.label || (activeId === 'auto' ? 'Auto' : activeId)

  const selectProvider = (id) => {
    updateSettings({ provider: id })
    setOpen(false)
  }

  return (
    <div className="topbar-provider" ref={ref}>
      <button
        type="button"
        className="topbar-btn topbar-btn--provider"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        title="Change provider"
      >
        <span className="topbar-btn__dot" aria-hidden="true" />
        <span>{activeLabel}</span>
        <ChevronDown size={13} />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="topbar-menu topbar-menu--provider"
            role="menu"
            aria-label="Select provider"
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.12 }}
          >
            <p className="topbar-menu__header">Provider</p>
            {options.map((option) => {
              const active = option.id === activeId
              return (
                <button
                  key={option.id}
                  type="button"
                  role="menuitemradio"
                  aria-checked={active}
                  className={`topbar-menu__item ${active ? 'topbar-menu__item--active' : ''}`}
                  onClick={() => selectProvider(option.id)}
                >
                  <span>{option.label}</span>
                  {active ? <Check size={13} /> : null}
                </button>
              )
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default function Header() {
  const location = useLocation()
  const toggleSidebar = useAppStore((state) => state.toggleSidebar)
  const activeChatId = useAppStore((state) => state.activeChatId)
  const chats = useAppStore((state) => state.chats)
  const messagesByChatId = useAppStore((state) => state.messagesByChatId)
  const settings = useAppStore((state) => state.settings)
  const updateSettings = useAppStore((state) => state.updateSettings)
  const isChatRoute = location.pathname === '/' || location.pathname === '/chat'
  const activeChat = chats.find((chat) => chat.id === activeChatId)
  const messages = messagesByChatId[activeChatId] || []
  const exportableMessages = messages.filter(
    (message) => message != null && message.status !== 'loading' && message.kind !== 'ingestion',
  )
  const canExport = Boolean(activeChat) && exportableMessages.length > 0

  const currentTheme = settings?.theme || 'dark'
  const [menuOpen, setMenuOpen] = useState(false)
  const [downloadOpen, setDownloadOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const menuRef = useRef(null)
  const downloadRef = useRef(null)

  useEffect(() => {
    if (!menuOpen) return undefined
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    window.addEventListener('mousedown', onClick)
    return () => window.removeEventListener('mousedown', onClick)
  }, [menuOpen])
  useDismiss(downloadRef, () => setDownloadOpen(false), downloadOpen)

  const toggleTheme = () => {
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark'
    updateSettings({ theme: nextTheme })
  }

  const handleTranscript = async () => {
    setMenuOpen(false)
    setDownloadOpen(false)
    if (!canExport) return
    try {
      await exportChatTranscript(activeChat, exportableMessages)
    } catch (error) {
      console.error(error)
      toast.error('Could not export the transcript.')
    }
  }

  const handleProfessional = async () => {
    setMenuOpen(false)
    setDownloadOpen(false)
    if (!canExport || busy) return
    setBusy(true)
    toast.info('Building your professional document...')
    try {
      const { markdown, title: docTitle } = await generateChatDocument(activeChatId)
      await exportProfessionalDocument({ title: docTitle, markdown })
    } catch (error) {
      console.error(error)
      toast.error('Could not generate the document. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  const pageTitle = isChatRoute
    ? (activeChat?.title || 'LocalMind')
    : location.pathname.slice(1).charAt(0).toUpperCase() + location.pathname.slice(2)

  return (
    <header className="header">
      <div className="header__left">
        <Button
        <button
          type="button"
          variant="secondary"
          className="icon-button mobile-toggle"
          onClick={toggleSidebar}
          aria-label="Open navigation"
        >
          <Menu size={18} />
        </Button>
        </button>

        <div className="header__chat-identity">
          <h1 className="header__chat-title">
            {isChatRoute ? (activeChat?.title || 'Messaging app') : location.pathname.slice(1).charAt(0).toUpperCase() + location.pathname.slice(2)}
          </h1>
          <h1 className="header__chat-title">{pageTitle}</h1>
        </div>
      </div>

      <div className="header__actions" ref={menuRef}>
        <button
          type="button"
          className="icon-button header__action-btn"
          onClick={toggleTheme}
          title={`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`}
          aria-label="Toggle theme"
        >
          {currentTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

      <div className="header__actions">
        {isChatRoute ? (
          <>
            <button
              className="icon-button header__export-trigger"
              type="button"
              aria-label="Export as PDF"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              disabled={!canExport || busy}
              title="Export conversation"
            >
              {busy ? <Loader2 size={18} className="spin" /> : <Download size={18} />}
            </button>
            {/* Download menu */}
            <div className="topbar-download" ref={downloadRef}>
              <button
                type="button"
                className="topbar-btn"
                aria-haspopup="menu"
                aria-expanded={downloadOpen}
                onClick={() => setDownloadOpen((v) => !v)}
                disabled={!canExport || busy}
                title="Download conversation"
              >
                {busy ? <Loader2 size={15} className="spin" /> : <Download size={15} />}
                <span>Download</span>
                <ChevronDown size={13} />
              </button>

            {menuOpen ? (
              <div className="export-menu export-menu--left" role="menu">
                <button type="button" className="export-menu__item" role="menuitem" onClick={handleTranscript}>
                  <FileText size={16} />
                  <span>
                    <strong>Chat transcript</strong>
                    <em>The conversation, formatted with charts</em>
                  </span>
                </button>
                <button type="button" className="export-menu__item" role="menuitem" onClick={handleProfessional}>
                  <FileCheck2 size={16} />
                  <span>
                    <strong>Professional document</strong>
                    <em>A polished report generated from this chat, charts added</em>
                  </span>
                </button>
              </div>
            ) : null}
              <AnimatePresence>
                {downloadOpen ? (
                  <motion.div
                    className="topbar-menu"
                    role="menu"
                    aria-label="Download options"
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.12 }}
                  >
                    <p className="topbar-menu__header">Download</p>
                    <button type="button" className="topbar-menu__item" role="menuitem" onClick={handleTranscript}>
                      <FileText size={14} />
                      <span>
                        <strong>Chat transcript</strong>
                        <em>Formatted conversation with charts</em>
                      </span>
                    </button>
                    <button type="button" className="topbar-menu__item" role="menuitem" onClick={handleProfessional}>
                      <FileCheck2 size={14} />
                      <span>
                        <strong>Professional document</strong>
                        <em>Polished report generated from this chat</em>
                      </span>
                    </button>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            {/* Provider picker */}
            <ProviderPicker />
          </>
        ) : null}
      </div>
    </header>
  )
}
