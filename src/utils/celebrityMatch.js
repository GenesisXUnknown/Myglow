/**
 * Celebrity Matching Utility
 * Matches users to celebrities based on their color season
 */

/**
 * Get a random celebrity from the user's season
 * @param {Object} seasonData - The user's season data
 * @returns {string} Celebrity name
 */
export const getRandomCelebrity = (seasonData) => {
  if (!seasonData || !seasonData.celebrities || seasonData.celebrities.length === 0) {
    return null
  }

  const randomIndex = Math.floor(Math.random() * seasonData.celebrities.length)
  return seasonData.celebrities[randomIndex]
}

/**
 * Get all celebrities for a season
 * @param {Object} seasonData - The season data
 * @returns {Array<string>} Array of celebrity names
 */
export const getAllCelebrities = (seasonData) => {
  return seasonData?.celebrities || []
}

/**
 * Find celebrities that share colors with the user
 * (In a real app, this could use ML to match based on actual photo analysis)
 * @param {Object} seasonData - User's season data
 * @param {Array<Object>} allSeasons - All season data
 * @returns {Array<Object>} Celebrities with similarity score
 */
export const findSimilarCelebrities = (seasonData, allSeasons) => {
  if (!seasonData) return []

  const results = []

  // Get celebrities from same season (100% match)
  if (seasonData.celebrities) {
    seasonData.celebrities.forEach(celeb => {
      results.push({
        name: celeb,
        season: seasonData.name,
        similarity: 100,
        reason: 'Same color season'
      })
    })
  }

  // Get celebrities from same base season (75% match)
  const baseSeason = seasonData.season
  allSeasons.forEach(season => {
    if (season.id !== seasonData.id && season.season === baseSeason) {
      season.celebrities.forEach(celeb => {
        results.push({
          name: celeb,
          season: season.name,
          similarity: 75,
          reason: `Same ${baseSeason} family`
        })
      })
    }
  })

  // Get celebrities from same undertone (50% match)
  const undertone = seasonData.undertone
  allSeasons.forEach(season => {
    if (season.id !== seasonData.id && season.season !== baseSeason && season.undertone === undertone) {
      season.celebrities.forEach(celeb => {
        results.push({
          name: celeb,
          season: season.name,
          similarity: 50,
          reason: `${undertone} undertone`
        })
      })
    }
  })

  // Sort by similarity and remove duplicates
  const unique = results.filter((item, index, self) =>
    index === self.findIndex(t => t.name === item.name)
  )

  return unique.sort((a, b) => b.similarity - a.similarity)
}

/**
 * Generate shareable celebrity comparison text
 * @param {string} userName - User's name
 * @param {string} celebrity - Celebrity name
 * @param {Object} seasonData - Season data
 * @returns {string} Shareable text
 */
export const generateCelebrityShareText = (userName, celebrity, seasonData) => {
  const templates = [
    `${userName || 'I'} share${userName ? 's' : ''} the same color season as ${celebrity}! 🌟`,
    `Guess what? ${userName || 'I'}'${userName ? '' : 'm'} a ${seasonData.name} just like ${celebrity}! ✨`,
    `${celebrity} and ${userName || 'I'} are color twins! We're both ${seasonData.name} 💄`,
    `My color season? ${seasonData.name} - just like ${celebrity}! 🎨`
  ]

  const randomIndex = Math.floor(Math.random() * templates.length)
  return templates[randomIndex]
}

/**
 * Get celebrity profile data for display
 * @param {string} celebrityName - Name of celebrity
 * @param {Object} seasonData - Their season data
 * @returns {Object} Celebrity profile
 */
export const getCelebrityProfile = (celebrityName, seasonData) => {
  return {
    name: celebrityName,
    season: seasonData.name,
    undertone: seasonData.undertone,
    bestColors: seasonData.bestColors.slice(0, 4), // Top 4 colors
    description: `${celebrityName} is a ${seasonData.name}, which means they look stunning in ${seasonData.undertone} tones.`,
    characteristics: seasonData.characteristics
  }
}
