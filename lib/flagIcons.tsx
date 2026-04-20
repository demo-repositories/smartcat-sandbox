import React from 'react'
import type {LocaleId} from './locales'

const flagStyle: React.CSSProperties = {
  fontSize: '1em',
  lineHeight: 1,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily:
    '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "Twemoji Mozilla", sans-serif',
}

function createFlagIcon(emoji: string, label: string): React.ComponentType {
  const FlagIcon: React.FC = () => (
    <span role="img" aria-label={label} style={flagStyle}>
      {emoji}
    </span>
  )
  FlagIcon.displayName = `FlagIcon(${label})`
  return FlagIcon
}

const FLAGS: Record<LocaleId, React.ComponentType> = {
  en: createFlagIcon('🇬🇧', 'English'),
  fr: createFlagIcon('🇫🇷', 'Français'),
  es: createFlagIcon('🇪🇸', 'Español'),
}

export function getFlagIcon(localeId: LocaleId): React.ComponentType {
  return FLAGS[localeId]
}
