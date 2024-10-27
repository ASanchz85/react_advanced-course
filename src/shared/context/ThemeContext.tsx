import { createContext, useContext, useState, ReactNode } from 'react'
import { hexToRgbColor } from '../helpers/hexToRgbColor'
import { COLOR_CSS_VAR_NAMES, DEFAULT_THEME_COLORS } from '../config/constants'

interface ThemeContextType {
  primaryColor: string
  secondaryColor: string
  tertiaryColor: string
  quaternaryColor: string
  setPrimaryColor: (color: string) => void
  setSecondaryColor: (color: string) => void
  setTertiaryColor: (color: string) => void
  setQuaternaryColor: (color: string) => void
  resetToDefaultColors: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [primaryColor, setPrimaryColor] = useState(DEFAULT_THEME_COLORS.PRIMARY)
  const [secondaryColor, setSecondaryColor] = useState(
    DEFAULT_THEME_COLORS.SECONDARY
  )
  const [tertiaryColor, setTertiaryColor] = useState(
    DEFAULT_THEME_COLORS.TERTIARY
  )
  const [quaternaryColor, setQuaternaryColor] = useState(
    DEFAULT_THEME_COLORS.QUATERNARY
  )

  const updateColorVariable = (variable: string, value: string) => {
    document.documentElement.style.setProperty(variable, value)
  }

  const handlePrimaryColorChange = (color: string) => {
    setPrimaryColor(color)
    updateColorVariable(COLOR_CSS_VAR_NAMES.PRIMARY, color)
    updateColorVariable(COLOR_CSS_VAR_NAMES.PRIMARY_RGB, hexToRgbColor(color))
  }

  const handleSecondaryColorChange = (color: string) => {
    setSecondaryColor(color)
    updateColorVariable(COLOR_CSS_VAR_NAMES.SECONDARY, color)
    updateColorVariable(COLOR_CSS_VAR_NAMES.SECONDARY_RGB, hexToRgbColor(color))
  }

  const handleTertiaryColorChange = (color: string) => {
    setTertiaryColor(color)
    updateColorVariable(COLOR_CSS_VAR_NAMES.TERTIARY, color)
    updateColorVariable(COLOR_CSS_VAR_NAMES.TERTIARY_RGB, hexToRgbColor(color))
  }

  const handleQuaternaryColorChange = (color: string) => {
    setQuaternaryColor(color)
    updateColorVariable(COLOR_CSS_VAR_NAMES.QUATERNARY, color)
    updateColorVariable(
      COLOR_CSS_VAR_NAMES.QUATERNARY_RGB,
      hexToRgbColor(color)
    )
  }

  const resetToDefaultColors = () => {
    handlePrimaryColorChange(DEFAULT_THEME_COLORS.PRIMARY)
    handleSecondaryColorChange(DEFAULT_THEME_COLORS.SECONDARY)
    handleTertiaryColorChange(DEFAULT_THEME_COLORS.TERTIARY)
    handleQuaternaryColorChange(DEFAULT_THEME_COLORS.QUATERNARY)
  }

  return (
    <ThemeContext.Provider
      value={{
        primaryColor,
        secondaryColor,
        tertiaryColor,
        quaternaryColor,
        setPrimaryColor: handlePrimaryColorChange,
        setSecondaryColor: handleSecondaryColorChange,
        setTertiaryColor: handleTertiaryColorChange,
        setQuaternaryColor: handleQuaternaryColorChange,
        resetToDefaultColors
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
