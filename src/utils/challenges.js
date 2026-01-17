/**
 * Daily Challenges System
 * Generates randomized daily makeup challenges for engagement
 */

const CHALLENGE_TEMPLATES = {
  tryon: [
    { text: 'Try on 3 different lip colors', count: 3, type: 'lips' },
    { text: 'Experiment with 2 eye looks', count: 2, type: 'eyes' },
    { text: 'Test 2 blush shades', count: 2, type: 'cheeks' },
    { text: 'Try a bold lip color', count: 1, type: 'lips', bold: true },
    { text: 'Create a smokey eye look', count: 1, type: 'eyes' }
  ],
  create: [
    { text: 'Create a daytime look', category: 'daytime' },
    { text: 'Build an evening glam look', category: 'evening' },
    { text: 'Design a natural makeup look', category: 'natural' },
    { text: 'Create a bold statement look', category: 'bold' }
  ],
  explore: [
    { text: 'Explore colors from your season', type: 'season' },
    { text: 'Try colors you usually avoid', type: 'experimental' },
    { text: 'Mix matte and shimmer finishes', type: 'finish' },
    { text: 'Find your perfect nude lip', type: 'nude' }
  ],
  social: [
    { text: 'Share your favorite look', action: 'share' },
    { text: 'Save a look to your profile', action: 'save' },
    { text: 'Compare colors with a friend', action: 'compare' },
    { text: 'Unlock a new achievement', action: 'achievement' }
  ],
  learn: [
    { text: 'Learn about your undertone', topic: 'undertone' },
    { text: 'Discover your best colors', topic: 'colors' },
    { text: 'Explore celebrity inspiration', topic: 'celebrity' },
    { text: 'Read about seasonal color theory', topic: 'theory' }
  ]
}

/**
 * Generate daily challenges for a user
 * @param {Object} seasonData - User's season data
 * @param {number} count - Number of challenges to generate (default: 3)
 * @returns {Array<Object>} Array of daily challenges
 */
export const generateDailyChallenges = (seasonData, count = 3) => {
  const challenges = []
  const categories = Object.keys(CHALLENGE_TEMPLATES)
  const usedIndices = new Set()

  // Ensure variety by selecting from different categories
  for (let i = 0; i < count; i++) {
    const category = categories[i % categories.length]
    const templates = CHALLENGE_TEMPLATES[category]

    let templateIndex
    do {
      templateIndex = Math.floor(Math.random() * templates.length)
    } while (usedIndices.has(`${category}-${templateIndex}`) && usedIndices.size < templates.length)

    usedIndices.add(`${category}-${templateIndex}`)
    const template = templates[templateIndex]

    challenges.push({
      id: `challenge-${Date.now()}-${i}`,
      category,
      text: template.text,
      data: template,
      completed: false,
      points: getChallengePoints(category),
      icon: getChallengeIcon(category)
    })
  }

  return challenges
}

/**
 * Get points for completing a challenge based on category
 * @param {string} category - Challenge category
 * @returns {number} Points awarded
 */
const getChallengePoints = (category) => {
  const pointsMap = {
    tryon: 10,
    create: 20,
    explore: 15,
    social: 25,
    learn: 5
  }
  return pointsMap[category] || 10
}

/**
 * Get icon for challenge category
 * @param {string} category - Challenge category
 * @returns {string} Emoji icon
 */
const getChallengeIcon = (category) => {
  const iconMap = {
    tryon: '💄',
    create: '🎨',
    explore: '🔍',
    social: '📱',
    learn: '📚'
  }
  return iconMap[category] || '✨'
}

/**
 * Check if a challenge can be auto-completed based on user actions
 * @param {Object} challenge - The challenge
 * @param {Object} userState - Current user state
 * @returns {boolean} Whether challenge should auto-complete
 */
export const checkChallengeCompletion = (challenge, userState) => {
  const { category, data } = challenge

  switch (category) {
    case 'tryon':
      // Check if user has done enough try-ons
      return userState.todayTryOnCount >= (data.count || 1)

    case 'create':
      // Check if user created a look today
      const today = new Date().toDateString()
      return userState.createdLooks.some(look =>
        new Date(look.createdAt).toDateString() === today
      )

    case 'social':
      if (data.action === 'share') {
        return userState.todayShareCount >= 1
      }
      if (data.action === 'save') {
        return userState.savedLooks.length > 0
      }
      if (data.action === 'compare') {
        return userState.friendComparisons.length > 0
      }
      return false

    default:
      return false
  }
}

/**
 * Get challenge streak bonus
 * @param {number} streak - Current streak count
 * @returns {Object} Bonus information
 */
export const getStreakBonus = (streak) => {
  if (streak >= 30) {
    return { message: '🔥 30 Day Streak! You\'re legendary!', bonus: 100 }
  } else if (streak >= 14) {
    return { message: '🌟 2 Week Streak! Amazing!', bonus: 50 }
  } else if (streak >= 7) {
    return { message: '✨ 7 Day Streak! Keep it up!', bonus: 25 }
  } else if (streak >= 3) {
    return { message: '💪 3 Day Streak! You\'re on fire!', bonus: 10 }
  }
  return { message: '', bonus: 0 }
}

/**
 * Generate motivational message for challenges
 * @param {number} completed - Number of completed challenges
 * @param {number} total - Total number of challenges
 * @returns {string} Motivational message
 */
export const getChallengeMotivation = (completed, total) => {
  const percentage = (completed / total) * 100

  if (percentage === 100) {
    return '🎉 All challenges completed! You\'re glowing!'
  } else if (percentage >= 66) {
    return '🌟 Almost there! One more to go!'
  } else if (percentage >= 33) {
    return '💪 Great progress! Keep going!'
  } else {
    return '✨ Start your glow journey today!'
  }
}

/**
 * Get challenges for a specific user level
 * @param {number} userLevel - User's level (based on total points)
 * @param {Object} seasonData - User's season data
 * @returns {Array<Object>} Appropriate challenges
 */
export const getChallengesForLevel = (userLevel, seasonData) => {
  if (userLevel < 10) {
    // Beginner challenges
    return [
      {
        id: 'beginner-1',
        category: 'tryon',
        text: 'Try your first color',
        completed: false,
        points: 5,
        icon: '💄'
      },
      {
        id: 'beginner-2',
        category: 'learn',
        text: 'Learn about your color season',
        completed: false,
        points: 5,
        icon: '📚'
      }
    ]
  }

  // Return normal challenges for regular users
  return generateDailyChallenges(seasonData, 3)
}
