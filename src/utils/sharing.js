/**
 * Sharing Utilities
 * Handle social sharing, image generation, and export functions
 */

/**
 * Generate shareable result card as data URL
 * @param {Object} seasonData - User's season data
 * @param {string} userPhoto - User's photo data URL
 * @param {string} userName - User's name (optional)
 * @returns {Promise<string>} Data URL of generated card
 */
export const generateResultCard = async (seasonData, userPhoto, userName = null) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  // Instagram Story size (1080 x 1920)
  canvas.width = 1080
  canvas.height = 1920

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
  gradient.addColorStop(0, '#FFE8F5') // Light pink
  gradient.addColorStop(1, '#D8BFD8') // Thistle
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Load and draw user photo
  if (userPhoto) {
    try {
      const img = await loadImage(userPhoto)
      const size = 600
      const x = (canvas.width - size) / 2
      const y = 200

      // Draw circular photo
      ctx.save()
      ctx.beginPath()
      ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2)
      ctx.closePath()
      ctx.clip()
      ctx.drawImage(img, x, y, size, size)
      ctx.restore()

      // Draw white border
      ctx.strokeStyle = '#FFFFFF'
      ctx.lineWidth = 12
      ctx.beginPath()
      ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2)
      ctx.stroke()
    } catch (error) {
      console.error('Failed to load user photo:', error)
    }
  }

  // Season name
  ctx.fillStyle = '#2D3748'
  ctx.font = 'bold 80px Cormorant Garamond, serif'
  ctx.textAlign = 'center'
  ctx.fillText(seasonData.name, canvas.width / 2, 950)

  // Undertone
  ctx.font = '40px Nunito Sans, sans-serif'
  ctx.fillStyle = '#718096'
  ctx.fillText(`${seasonData.undertone} undertone`, canvas.width / 2, 1020)

  // Color palette
  const paletteY = 1120
  const swatchSize = 100
  const gap = 20
  const totalWidth = (swatchSize * 4) + (gap * 3)
  const startX = (canvas.width - totalWidth) / 2

  seasonData.bestColors.slice(0, 4).forEach((color, idx) => {
    const x = startX + (idx * (swatchSize + gap))
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(x + swatchSize / 2, paletteY + swatchSize / 2, swatchSize / 2, 0, Math.PI * 2)
    ctx.fill()

    // White border
    ctx.strokeStyle = '#FFFFFF'
    ctx.lineWidth = 6
    ctx.stroke()
  })

  // User name (if provided)
  if (userName) {
    ctx.font = 'bold 45px Nunito Sans, sans-serif'
    ctx.fillStyle = '#2D3748'
    ctx.textAlign = 'center'
    ctx.fillText(userName, canvas.width / 2, 1300)
  }

  // Call to action
  ctx.font = '35px Nunito Sans, sans-serif'
  ctx.fillStyle = '#805AD5'
  ctx.fillText('Discover your colors at', canvas.width / 2, 1650)
  ctx.font = 'bold 50px Nunito Sans, sans-serif'
  ctx.fillText('GlowMatch.app', canvas.width / 2, 1720)

  // Logo/watermark
  ctx.font = '30px Nunito Sans, sans-serif'
  ctx.fillStyle = '#A0AEC0'
  ctx.fillText('✨ GlowMatch', canvas.width / 2, 1820)

  return canvas.toDataURL('image/png')
}

/**
 * Helper to load image from URL
 * @param {string} url - Image URL
 * @returns {Promise<HTMLImageElement>}
 */
const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = url
  })
}

/**
 * Generate before/after comparison image
 * @param {string} beforePhoto - Original photo
 * @param {string} afterPhoto - Photo with makeup applied (or same photo)
 * @param {Object} seasonData - Season data
 * @returns {Promise<string>} Data URL
 */
export const generateBeforeAfterCard = async (beforePhoto, afterPhoto, seasonData) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = 1080
  canvas.height = 1920

  // Background
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
  gradient.addColorStop(0, '#FFF5F7')
  gradient.addColorStop(1, '#E9D5FF')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const imgWidth = 480
  const imgHeight = 640
  const gap = 60
  const totalWidth = (imgWidth * 2) + gap
  const startX = (canvas.width - totalWidth) / 2
  const y = 300

  try {
    // Before image
    const before = await loadImage(beforePhoto)
    ctx.drawImage(before, startX, y, imgWidth, imgHeight)
    ctx.strokeStyle = '#FFFFFF'
    ctx.lineWidth = 8
    ctx.strokeRect(startX, y, imgWidth, imgHeight)

    // "Before" label
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(startX, y - 50, imgWidth, 50)
    ctx.fillStyle = '#2D3748'
    ctx.font = 'bold 30px Nunito Sans, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('BEFORE', startX + imgWidth / 2, y - 15)

    // After image
    const after = await loadImage(afterPhoto)
    ctx.drawImage(after, startX + imgWidth + gap, y, imgWidth, imgHeight)
    ctx.strokeStyle = '#FFFFFF'
    ctx.lineWidth = 8
    ctx.strokeRect(startX + imgWidth + gap, y, imgWidth, imgHeight)

    // "After" label
    ctx.fillStyle = '#805AD5'
    ctx.fillRect(startX + imgWidth + gap, y - 50, imgWidth, 50)
    ctx.fillStyle = '#FFFFFF'
    ctx.fillText('AFTER', startX + imgWidth + gap + imgWidth / 2, y - 15)
  } catch (error) {
    console.error('Failed to load images:', error)
  }

  // Season info
  ctx.font = 'bold 70px Cormorant Garamond, serif'
  ctx.fillStyle = '#2D3748'
  ctx.textAlign = 'center'
  ctx.fillText(seasonData.name, canvas.width / 2, 1100)

  ctx.font = '35px Nunito Sans, sans-serif'
  ctx.fillStyle = '#718096'
  ctx.fillText(`Perfectly matched colors for you`, canvas.width / 2, 1160)

  // Color swatches
  const paletteY = 1250
  const swatchSize = 90
  const swatchGap = 18
  const colors = seasonData.bestColors.slice(0, 5)
  const paletteTotalWidth = (swatchSize * colors.length) + (swatchGap * (colors.length - 1))
  const paletteStartX = (canvas.width - paletteTotalWidth) / 2

  colors.forEach((color, idx) => {
    const x = paletteStartX + (idx * (swatchSize + swatchGap))
    ctx.fillStyle = color
    ctx.fillRect(x, paletteY, swatchSize, swatchSize)
    ctx.strokeStyle = '#FFFFFF'
    ctx.lineWidth = 5
    ctx.strokeRect(x, paletteY, swatchSize, swatchSize)
  })

  // CTA
  ctx.font = 'bold 45px Nunito Sans, sans-serif'
  ctx.fillStyle = '#805AD5'
  ctx.fillText('GlowMatch.app', canvas.width / 2, 1700)
  ctx.font = '30px Nunito Sans, sans-serif'
  ctx.fillStyle = '#718096'
  ctx.fillText('Find your perfect makeup colors ✨', canvas.width / 2, 1760)

  return canvas.toDataURL('image/png')
}

/**
 * Generate shareable look card
 * @param {Object} look - Created look object
 * @param {Object} seasonData - Season data
 * @param {string} userName - User's name
 * @returns {Promise<string>} Data URL
 */
export const generateLookCard = async (look, seasonData, userName) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = 1080
  canvas.height = 1080 // Square for Instagram post

  // Background
  ctx.fillStyle = '#FFF5F7'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Title
  ctx.font = 'bold 65px Cormorant Garamond, serif'
  ctx.fillStyle = '#2D3748'
  ctx.textAlign = 'center'
  ctx.fillText(look.name || 'My Look', canvas.width / 2, 120)

  // Creator
  if (userName) {
    ctx.font = '35px Nunito Sans, sans-serif'
    ctx.fillStyle = '#718096'
    ctx.fillText(`by ${userName}`, canvas.width / 2, 180)
  }

  // Draw look colors
  const y = 280
  const sections = [
    { label: 'Lips', color: look.lips, emoji: '💋' },
    { label: 'Eyes', color: look.eyes, emoji: '👁️' },
    { label: 'Cheeks', color: look.cheeks, emoji: '✨' }
  ]

  sections.forEach((section, idx) => {
    const sectionY = y + (idx * 200)

    // Section label
    ctx.font = 'bold 40px Nunito Sans, sans-serif'
    ctx.fillStyle = '#4A5568'
    ctx.textAlign = 'left'
    ctx.fillText(`${section.emoji} ${section.label}`, 100, sectionY)

    // Color swatch
    if (section.color) {
      const swatchX = canvas.width - 300
      const swatchSize = 140
      ctx.fillStyle = section.color.hex
      ctx.beginPath()
      ctx.arc(swatchX, sectionY - 30, swatchSize / 2, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = '#FFFFFF'
      ctx.lineWidth = 8
      ctx.stroke()

      // Color name
      ctx.font = '28px Nunito Sans, sans-serif'
      ctx.fillStyle = '#718096'
      ctx.textAlign = 'center'
      ctx.fillText(section.color.name, swatchX, sectionY + 90)
    }
  })

  // Season badge
  ctx.fillStyle = '#805AD5'
  ctx.fillRect(0, canvas.height - 150, canvas.width, 150)
  ctx.font = 'bold 45px Nunito Sans, sans-serif'
  ctx.fillStyle = '#FFFFFF'
  ctx.textAlign = 'center'
  ctx.fillText(`${seasonData.name} • GlowMatch.app`, canvas.width / 2, canvas.height - 80)

  return canvas.toDataURL('image/png')
}

/**
 * Download image from data URL
 * @param {string} dataUrl - Data URL of image
 * @param {string} filename - Desired filename
 */
export const downloadImage = (dataUrl, filename = 'glowmatch-result.png') => {
  const link = document.createElement('a')
  link.download = filename
  link.href = dataUrl
  link.click()
}

/**
 * Share to social media (uses Web Share API if available)
 * @param {string} dataUrl - Image data URL
 * @param {string} text - Share text
 * @param {string} url - URL to share
 * @returns {Promise<boolean>} Success status
 */
export const shareToSocial = async (dataUrl, text, url = 'https://glowmatch.app') => {
  // Convert data URL to blob
  const blob = await (await fetch(dataUrl)).blob()
  const file = new File([blob], 'glowmatch.png', { type: 'image/png' })

  // Check if Web Share API is available
  if (navigator.share && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        title: 'GlowMatch',
        text: text,
        url: url,
        files: [file]
      })
      return true
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Share failed:', error)
      }
      return false
    }
  } else {
    // Fallback: download image
    downloadImage(dataUrl)
    return true
  }
}

/**
 * Copy share link to clipboard
 * @param {string} referralCode - User's referral code
 * @returns {Promise<boolean>} Success status
 */
export const copyShareLink = async (referralCode) => {
  const url = `https://glowmatch.app?ref=${referralCode}`

  try {
    await navigator.clipboard.writeText(url)
    return true
  } catch (error) {
    console.error('Failed to copy:', error)
    return false
  }
}

/**
 * Generate share text variations
 * @param {Object} seasonData - Season data
 * @param {string} userName - User's name
 * @returns {Array<string>} Share text options
 */
export const generateShareText = (seasonData, userName = null) => {
  const name = userName || 'I'
  const verb = userName ? 'is' : 'am'

  return [
    `${name} ${verb} a ${seasonData.name}! ✨ Discover your perfect makeup colors at GlowMatch.app`,
    `Just found out ${name} ${verb} a ${seasonData.name} 💄 My makeup game is about to change! Try GlowMatch.app`,
    `${seasonData.name} colors look amazing on ${userName ? userName : 'me'}! 🌟 Find your season at GlowMatch.app`,
    `Seasonal color analysis = game changer! ${name} ${verb} a ${seasonData.name} ✨ GlowMatch.app`
  ]
}

/**
 * Share directly to specific social platforms
 */
export const shareToFacebook = (url, text) => {
  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`
  window.open(shareUrl, '_blank', 'width=600,height=400')
}

export const shareToTwitter = (url, text) => {
  const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
  window.open(shareUrl, '_blank', 'width=600,height=400')
}

export const shareToPinterest = (url, imageUrl, description) => {
  const shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(description)}`
  window.open(shareUrl, '_blank', 'width=600,height=400')
}

export const shareToWhatsApp = (text, url) => {
  const message = `${text} ${url}`
  const shareUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
  window.open(shareUrl, '_blank')
}

export const shareViaEmail = (subject, body, url) => {
  const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body + '\n\n' + url)}`
  window.location.href = mailtoUrl
}
