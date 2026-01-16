/**
 * Color Analysis Utility
 * Analyzes uploaded selfies to determine seasonal color type
 */

/**
 * Extract dominant colors from an image
 * @param {HTMLImageElement} img - The image element
 * @returns {Object} Object containing dominant colors for skin, hair, and overall tone
 */
export const extractColorsFromImage = (img) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = img.width
  canvas.height = img.height
  ctx.drawImage(img, 0, 0, img.width, img.height)

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data

  // Sample pixels to find dominant colors
  const colors = []
  const step = 4 * 10 // Sample every 10th pixel

  for (let i = 0; i < data.length; i += step) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const a = data[i + 3]

    // Skip transparent pixels and very dark/light pixels (likely background or glare)
    if (a < 125 || (r + g + b) < 60 || (r + g + b) > 720) continue

    colors.push({ r, g, b })
  }

  return colors
}

/**
 * Convert RGB to HSL
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @returns {Object} HSL values
 */
export const rgbToHsl = (r, g, b) => {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h, s, l = (max + min) / 2

  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }

  return {
    h: h * 360,
    s: s * 100,
    l: l * 100
  }
}

/**
 * Determine if undertone is warm or cool
 * @param {Array} colors - Array of RGB color objects
 * @returns {string} 'warm' or 'cool'
 */
export const determineUndertone = (colors) => {
  let warmScore = 0
  let coolScore = 0

  colors.forEach(({ r, g, b }) => {
    const { h } = rgbToHsl(r, g, b)

    // Warm undertones: yellow, peach, golden (30-60 degrees)
    // Cool undertones: pink, blue, purple (300-360, 0-30, 180-270)
    if ((h >= 25 && h <= 65) || (h >= 0 && h <= 25 && r > g)) {
      warmScore++
    } else if ((h >= 300 && h <= 360) || (h >= 180 && h <= 270) || (h >= 0 && h <= 25 && b > r)) {
      coolScore++
    }
  })

  return warmScore > coolScore ? 'warm' : 'cool'
}

/**
 * Determine contrast level
 * @param {Array} colors - Array of RGB color objects
 * @returns {string} 'low', 'medium', or 'high'
 */
export const determineContrast = (colors) => {
  if (colors.length === 0) return 'medium'

  const lightnesses = colors.map(({ r, g, b }) => {
    const { l } = rgbToHsl(r, g, b)
    return l
  })

  const avgLightness = lightnesses.reduce((a, b) => a + b, 0) / lightnesses.length
  const variance = lightnesses.reduce((sum, l) => sum + Math.pow(l - avgLightness, 2), 0) / lightnesses.length
  const stdDev = Math.sqrt(variance)

  if (stdDev < 15) return 'low'
  if (stdDev < 25) return 'medium'
  return 'high'
}

/**
 * Determine saturation level
 * @param {Array} colors - Array of RGB color objects
 * @returns {string} 'muted', 'moderate', or 'clear'
 */
export const determineSaturation = (colors) => {
  if (colors.length === 0) return 'moderate'

  const saturations = colors.map(({ r, g, b }) => {
    const { s } = rgbToHsl(r, g, b)
    return s
  })

  const avgSaturation = saturations.reduce((a, b) => a + b, 0) / saturations.length

  if (avgSaturation < 25) return 'muted'
  if (avgSaturation < 45) return 'moderate'
  return 'clear'
}

/**
 * Determine overall lightness/darkness
 * @param {Array} colors - Array of RGB color objects
 * @returns {string} 'light', 'medium', or 'deep'
 */
export const determineLightness = (colors) => {
  if (colors.length === 0) return 'medium'

  const lightnesses = colors.map(({ r, g, b }) => {
    const { l } = rgbToHsl(r, g, b)
    return l
  })

  const avgLightness = lightnesses.reduce((a, b) => a + b, 0) / lightnesses.length

  if (avgLightness > 60) return 'light'
  if (avgLightness > 40) return 'medium'
  return 'deep'
}

/**
 * Analyze image and determine seasonal color type
 * @param {string} imageUrl - URL of the uploaded image
 * @returns {Promise<Object>} Analysis results with season recommendation
 */
export const analyzeImage = (imageUrl) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'

    img.onload = () => {
      try {
        const colors = extractColorsFromImage(img)

        if (colors.length === 0) {
          reject(new Error('Could not analyze image. Please try a clearer photo.'))
          return
        }

        const undertone = determineUndertone(colors)
        const contrast = determineContrast(colors)
        const saturation = determineSaturation(colors)
        const lightness = determineLightness(colors)

        // Determine season based on characteristics
        let season = determineSeason(undertone, contrast, saturation, lightness)

        resolve({
          season,
          undertone,
          contrast,
          saturation,
          lightness,
          confidence: calculateConfidence(colors)
        })
      } catch (error) {
        reject(error)
      }
    }

    img.onerror = () => {
      reject(new Error('Failed to load image'))
    }

    img.src = imageUrl
  })
}

/**
 * Determine season based on analysis characteristics
 */
const determineSeason = (undertone, contrast, saturation, lightness) => {
  // Spring (warm undertone)
  if (undertone === 'warm') {
    if (lightness === 'light' && saturation === 'clear') return 'light-spring'
    if (saturation === 'clear' && contrast === 'high') return 'clear-spring'
    return 'warm-spring'
  }

  // Summer (cool undertone, muted)
  if (undertone === 'cool' && saturation === 'muted') {
    if (lightness === 'light') return 'light-summer'
    if (contrast === 'low' || saturation === 'muted') return 'soft-summer'
    return 'cool-summer'
  }

  // Autumn (warm undertone, muted)
  if (undertone === 'warm' && saturation === 'muted') {
    if (lightness === 'deep' && contrast === 'high') return 'deep-autumn'
    if (saturation === 'muted') return 'soft-autumn'
    return 'warm-autumn'
  }

  // Winter (cool undertone, clear)
  if (undertone === 'cool') {
    if (lightness === 'deep' && contrast === 'high') return 'deep-winter'
    if (saturation === 'clear' && contrast === 'high') return 'clear-winter'
    return 'cool-winter'
  }

  // Default fallback
  return undertone === 'warm' ? 'warm-spring' : 'cool-summer'
}

/**
 * Calculate confidence score for the analysis
 */
const calculateConfidence = (colors) => {
  // More samples = higher confidence
  const sampleScore = Math.min(colors.length / 1000, 1)

  // Return confidence as percentage
  return Math.round(sampleScore * 100)
}

/**
 * Get color recommendations for a season
 * @param {string} seasonId - The seasonal color type ID
 * @returns {Object} Color recommendations
 */
export const getColorRecommendations = (seasonId) => {
  // This would integrate with the store data
  // For now, return a simple structure
  return {
    bestColors: [],
    avoidColors: [],
    makeup: {}
  }
}
