export const IMAGES = {
  NWORLD: '/NWorld_logo.png',
  NCHAT: '/Nchat_logo.png',
  NCHAT_SMALL: '/Nchat_logo_small.png'
}

export const GLOBLAL_CHAT_USER_DETAILS = {
  full_name: 'Global Chat',
  email: '',
  avatar_url: IMAGES.NCHAT_SMALL
}

export const PATH_GLOBAL_CHAT = 'global-chat'

export const DEFAULT_THEME_COLORS = {
  PRIMARY: '#d0d9e1',
  SECONDARY: '#233751',
  TERTIARY: '#b0c4d8',
  QUATERNARY: '#f5f5f5'
}

export const COLOR_CSS_VAR_NAMES = {
  PRIMARY: '--primary-color',
  SECONDARY: '--secondary-color',
  TERTIARY: '--tertiary-color',
  QUATERNARY: '--quaternary-color',
  PRIMARY_RGB: '--primary-color-rgb',
  SECONDARY_RGB: '--secondary-color-rgb',
  TERTIARY_RGB: '--tertiary-color-rgb',
  QUATERNARY_RGB: '--quaternary-color-rgb'
}

export const DEBOUNCE_DELAY = 300

export const ERROR_HEADER = '[ERROR]'

export const ERROR_MESSAGES = {
  DEFAULT: 'An unexpected error occurred',
  LOGIN: 'Error logging in',
  LOGOUT: 'Error logging out',
  AUTH: 'User not authenticated',
  SESSION: 'Not possible to validate session',
  MESSAGE: 'Your message could not be sent',
  CONNECTION: 'Connection with database failed'
}

export const TOAST_DURATION = 5000

export const TOAST_TYPES = {
  ERROR: 'error',
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning'
} as const
