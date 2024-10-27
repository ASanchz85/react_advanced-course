import { useTheme } from '../../shared/context/ThemeContext'
import LivePreview from './lifePreview/LifePreview'
import './customTheme.css'

function CustomTheme() {
  const {
    primaryColor,
    secondaryColor,
    tertiaryColor,
    quaternaryColor,
    setPrimaryColor,
    setSecondaryColor,
    setTertiaryColor,
    setQuaternaryColor,
    resetToDefaultColors
  } = useTheme()

  return (
    <section className='custom__theme__container'>
      <div className='custom__colors__pickers'>
        <label>
          Primary Color:
          <input
            type='color'
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
          />
        </label>
        <label>
          Secondary Color:
          <input
            type='color'
            value={secondaryColor}
            onChange={(e) => setSecondaryColor(e.target.value)}
          />
        </label>
        <label>
          Tertiary Color:
          <input
            type='color'
            value={tertiaryColor}
            onChange={(e) => setTertiaryColor(e.target.value)}
          />
        </label>
        <label>
          Quaternary Color:
          <input
            type='color'
            value={quaternaryColor}
            onChange={(e) => setQuaternaryColor(e.target.value)}
          />
        </label>
        <button onClick={resetToDefaultColors}>Reset to Default</button>
      </div>
      <LivePreview
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        tertiaryColor={tertiaryColor}
        quaternaryColor={quaternaryColor}
      />
    </section>
  )
}

export default CustomTheme
