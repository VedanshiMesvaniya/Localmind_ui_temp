import { useState } from 'react'
import { Check, Database, Palette } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '../components/Button.jsx'
import { Check, CheckCircle2, Database, Loader2, Palette } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../store/store.js'

const THEME_OPTIONS = [
  { value: 'dark', label: 'Dark' },
  { value: 'light', label: 'Light' },
  { value: 'system', label: 'System' },
]

// Mini app preview thumbnail rendered in each theme option card
function ThemePreview({ mode }) {
  const isDark = mode === 'dark' || mode === 'system-dark'
  const isSystem = mode === 'system'
  return (
    <span className={`theme-preview theme-preview--${mode}`} aria-hidden="true">
      {/* Left sidebar strip */}
      <span className="theme-preview__sidebar">
        <span className="theme-preview__brand" />
        <span className="theme-preview__nav-item" />
        <span className="theme-preview__nav-item" />
        <span className="theme-preview__nav-item" />
      </span>
      {/* Main area */}
      <span className="theme-preview__main">
        <span className="theme-preview__topbar" />
        <span className="theme-preview__messages">
          <span className="theme-preview__msg theme-preview__msg--assistant" />
          <span className="theme-preview__msg theme-preview__msg--user" />
          <span className="theme-preview__msg theme-preview__msg--assistant theme-preview__msg--short" />
        </span>
        <span className="theme-preview__composer" />
      </span>
    </span>
  )
}

export default function Settings() {
  const settings = useAppStore((state) => state.settings)
  const updateSettings = useAppStore((state) => state.updateSettings)
  const runSchemaSync = useAppStore((state) => state.runSchemaSync)
  const [schemaStatus, setSchemaStatus] = useState('idle')
  const [syncResult, setSyncResult] = useState(null)

  const current = settings || { theme: 'light' }
  const current = settings || { theme: 'dark' }
  const setSetting = (patch) => updateSettings(patch)
  const schemaStatusText = {
    idle: 'Ready to sync database schema.',
    syncing: 'Syncing schema...',
    complete: 'Schema sync complete.',
    failed: 'Schema sync failed. Retry.',
  }[schemaStatus]

  const handleSchemaSync = async () => {
    setSchemaStatus('syncing')
    setSyncResult(null)
    const result = await runSchemaSync()
    setSchemaStatus(result?.ok === false ? 'failed' : 'complete')
    if (result?.ok === false) {
      setSchemaStatus('failed')
      setSyncResult(null)
    } else {
      setSchemaStatus('complete')
      setSyncResult(result)
    }
  }

  return (
    <section className="page settings-page">
      <div className="section__header settings-page__header">
        <div>
          <h2 className="section__title">Settings</h2>
        </div>
      <div className="settings-page__header">
        <h2 className="settings-page__title">Settings</h2>
        <p className="settings-page__subtitle">Appearance and data preferences.</p>
      </div>

      {/* --- Appearance --- */}
      {/* Appearance */}
      <motion.section
        className="settings-panel"
        initial={{ opacity: 0, y: 12 }}
        className="settings-card"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="settings-panel__heading">
          <div className="settings-panel__title-wrap">
            <Palette size={16} />
            <h3 className="settings-panel__title">Appearance</h3>
          </div>
        <div className="settings-card__heading">
          <Palette size={15} />
          <h3 className="settings-card__title">Appearance</h3>
        </div>
        <p className="settings-card__desc">Choose how LocalMind looks.</p>

        <div className="setting-row">
          <label>Theme</label>
          <div className="theme-picker" role="radiogroup" aria-label="Theme">
            {THEME_OPTIONS.map((option) => {
              const selected = current.theme === option.value
              return (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  className={`theme-option ${selected ? 'theme-option--selected' : ''}`}
                  onClick={() => setSetting({ theme: option.value })}
                >
                  {option.value === 'system' ? (
                    <span className="theme-option__preview theme-option__preview--system">
                      <span className="theme-option__preview-rail" />
                      <span className="theme-option__preview-system theme-option__preview-system--dark">
                        <span className="theme-option__preview-bar theme-option__preview-bar--accent" />
                        <span className="theme-option__preview-bar" />
                        <span className="theme-option__preview-bar" />
                      </span>
                      <span className="theme-option__preview-system theme-option__preview-system--light">
                        <span className="theme-option__preview-bar theme-option__preview-bar--accent" />
                        <span className="theme-option__preview-bar" />
                        <span className="theme-option__preview-bar" />
                      </span>
                      {selected ? (
                        <span className="theme-option__check"><Check size={11} strokeWidth={3} /></span>
                      ) : null}
                    </span>
                  ) : (
                    <span className={`theme-option__preview theme-option__preview--${option.value}`}>
                      <span className="theme-option__preview-rail" />
                      <span className="theme-option__preview-body">
                        <span className="theme-option__preview-bar theme-option__preview-bar--accent" />
                        <span className="theme-option__preview-bar" />
                        <span className="theme-option__preview-bar" />
                      </span>
                      {selected ? (
                        <span className="theme-option__check"><Check size={11} strokeWidth={3} /></span>
                      ) : null}
                    </span>
                  )}
                  <span className="theme-option__label">{option.label}</span>
                </button>
              )
            })}
          </div>
        <div className="theme-picker" role="radiogroup" aria-label="Theme">
          {THEME_OPTIONS.map((option) => {
            const selected = current.theme === option.value
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={selected}
                className={`theme-option ${selected ? 'theme-option--selected' : ''}`}
                onClick={() => setSetting({ theme: option.value })}
              >
                <ThemePreview mode={option.value} />
                <span className="theme-option__label">
                  {option.label}
                  {selected ? <Check size={12} strokeWidth={3} className="theme-option__check" /> : null}
                </span>
              </button>
            )
          })}
        </div>
      </motion.section>

      {/* --- Data Sync --- */}
      {/* Database Sync */}
      <motion.section
        className="settings-panel"
        initial={{ opacity: 0, y: 12 }}
        className="settings-card"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.06 }}
      >
        <div className="settings-panel__heading">
          <div className="settings-panel__title-wrap">
            <Database size={16} />
            <h3 className="settings-panel__title">Data Sync</h3>
          </div>
        <div className="settings-card__heading">
          <Database size={15} />
          <h3 className="settings-card__title">Database Sync</h3>
        </div>
        <p className="settings-card__desc">
          Keep LocalMind's understanding of your database up to date.
        </p>

        <div className="setting-row">
          <label>Database Schema Sync</label>
          <p className="setting-help">
            Fetches your live database tables, chunks them, and embeds them into the vector store.
            Run this whenever you add, alter, or drop tables in your database so the AI knows about them.
          </p>
          <div className="setting-actions">
            <Button variant="primary" onClick={handleSchemaSync} disabled={schemaStatus === 'syncing'}>
              Sync Database Schema
            </Button>
            <span className={`setting-status setting-status--${schemaStatus}`} role="status" aria-live="polite">
              {schemaStatusText}
            </span>
        <div className="sync-card">
          <div className="sync-card__meta">
            <div className="sync-card__row">
              <span className="sync-card__label">Last sync</span>
              <span className="sync-card__value">
                {syncResult?.last_synced
                  ? new Date(syncResult.last_synced).toLocaleString()
                  : '—'}
              </span>
            </div>
            {syncResult?.table_count != null ? (
              <div className="sync-card__row">
                <span className="sync-card__label">Tables</span>
                <span className="sync-card__value">{syncResult.table_count}</span>
              </div>
            ) : null}
            <div className="sync-card__row">
              <span className="sync-card__label">Status</span>
              <span className={`sync-card__status sync-card__status--${schemaStatus === 'failed' ? 'error' : 'ok'}`}>
                {schemaStatus === 'idle' ? 'Ready' :
                 schemaStatus === 'syncing' ? 'Syncing…' :
                 schemaStatus === 'complete' ? 'Connected' :
                 'Failed'}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="sync-card__btn"
            onClick={handleSchemaSync}
            disabled={schemaStatus === 'syncing'}
          >
            {schemaStatus === 'syncing' ? (
              <><Loader2 size={14} className="spin" /><span>Syncing schema…</span></>
            ) : (
              <span>Sync database schema</span>
            )}
          </button>

          <AnimatePresence>
            {schemaStatus === 'complete' ? (
              <motion.p
                className="sync-card__result sync-card__result--success"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <CheckCircle2 size={14} />
                Schema synchronized
                {syncResult?.tables_updated != null ? ` · ${syncResult.tables_updated} tables updated` : ''}
              </motion.p>
            ) : schemaStatus === 'failed' ? (
              <motion.p
                className="sync-card__result sync-card__result--error"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                Sync failed — try again
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.section>
    </section>
  )
}
