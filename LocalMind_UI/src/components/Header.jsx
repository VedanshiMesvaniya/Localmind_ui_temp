import { useEffect, useRef, useState } from 'react'
import { Download, FileText, FileCheck2, Loader2, Menu, Moon, Sun } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { toast } from 'sonner'
import { useAppStore } from '../store/store.js'
import Button from './Button.jsx'
import { generateChatDocument } from '../services/api.js'
import { exportChatTranscript, exportProfessionalDocument } from '../utils/pdfExport.js'

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
  const [busy, setBusy] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!menuOpen) return undefined
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    window.addEventListener('mousedown', onClick)
    return () => window.removeEventListener('mousedown', onClick)
  }, [menuOpen])

  const toggleTheme = () => {
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark'
    updateSettings({ theme: nextTheme })
  }

  const handleTranscript = async () => {
    setMenuOpen(false)
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

  return (
    <header className="header">
      <div className="header__left">
        <Button
          type="button"
          variant="secondary"
          className="icon-button mobile-toggle"
          onClick={toggleSidebar}
          aria-label="Open navigation"
        >
          <Menu size={18} />
        </Button>

        <div className="header__chat-identity">
          <h1 className="header__chat-title">
            {isChatRoute ? (activeChat?.title || 'Messaging app') : location.pathname.slice(1).charAt(0).toUpperCase() + location.pathname.slice(2)}
          </h1>
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
          </>
        ) : null}
      </div>
    </header>
  )
}
