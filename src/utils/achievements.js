/**
 * Achievement System
 * Defines all achievements and unlock conditions
 */

export const ACHIEVEMENTS = {
  // Analysis achievements
  'first-analysis': {
    id: 'first-analysis',
    name: 'Color Explorer',
    description: 'Complete your first color analysis',
    icon: '🎨',
    category: 'analysis',
    rarity: 'common'
  },

  // Try-on achievements
  'first-tryon': {
    id: 'first-tryon',
    name: 'Makeup Curious',
    description: 'Try on your first color',
    icon: '💄',
    category: 'tryon',
    rarity: 'common'
  },
  'tryon-master': {
    id: 'tryon-master',
    name: 'Virtual Makeup Artist',
    description: 'Try on 50 different colors',
    icon: '✨',
    category: 'tryon',
    rarity: 'rare'
  },

  // Sharing achievements
  'first-share': {
    id: 'first-share',
    name: 'Trendsetter',
    description: 'Share your first result',
    icon: '📱',
    category: 'social',
    rarity: 'common',
    reward: '5 bonus try-ons'
  },
  'social-butterfly': {
    id: 'social-butterfly',
    name: 'Social Butterfly',
    description: 'Share 5 times',
    icon: '🦋',
    category: 'social',
    rarity: 'uncommon'
  },
  'influencer': {
    id: 'influencer',
    name: 'Beauty Influencer',
    description: 'Share 10 times',
    icon: '⭐',
    category: 'social',
    rarity: 'rare'
  },

  // Referral achievements
  'first-referral': {
    id: 'first-referral',
    name: 'Friend Finder',
    description: 'Refer your first friend',
    icon: '👥',
    category: 'referral',
    rarity: 'uncommon'
  },
  'influencer-5': {
    id: 'influencer-5',
    name: 'Community Builder',
    description: 'Refer 5 friends',
    icon: '🌟',
    category: 'referral',
    rarity: 'rare',
    reward: '1 week premium free'
  },
  'influencer-10': {
    id: 'influencer-10',
    name: 'GlowMatch Ambassador',
    description: 'Refer 10 friends',
    icon: '👑',
    category: 'referral',
    rarity: 'legendary',
    reward: '1 month premium free'
  },

  // Challenge achievements
  'first-challenge': {
    id: 'first-challenge',
    name: 'Challenge Accepted',
    description: 'Complete your first daily challenge',
    icon: '🎯',
    category: 'challenge',
    rarity: 'common'
  },
  'week-streak': {
    id: 'week-streak',
    name: 'Week Warrior',
    description: 'Complete challenges for 7 days straight',
    icon: '🔥',
    category: 'challenge',
    rarity: 'rare'
  },
  'month-streak': {
    id: 'month-streak',
    name: 'Dedicated Glower',
    description: 'Complete challenges for 30 days straight',
    icon: '💎',
    category: 'challenge',
    rarity: 'legendary'
  },

  // Look builder achievements
  'first-look': {
    id: 'first-look',
    name: 'Look Creator',
    description: 'Create your first complete look',
    icon: '🎭',
    category: 'creative',
    rarity: 'common'
  },
  'look-collection': {
    id: 'look-collection',
    name: 'Style Curator',
    description: 'Create 10 different looks',
    icon: '👗',
    category: 'creative',
    rarity: 'rare'
  },

  // Exploration achievements
  'season-explorer': {
    id: 'season-explorer',
    name: 'Season Explorer',
    description: 'Try colors from all 12 seasons',
    icon: '🌈',
    category: 'exploration',
    rarity: 'rare'
  },
  'palette-master': {
    id: 'palette-master',
    name: 'Palette Master',
    description: 'Try every color in your season',
    icon: '🎨',
    category: 'exploration',
    rarity: 'epic'
  },

  // Premium achievements
  'premium-member': {
    id: 'premium-member',
    name: 'Premium Glower',
    description: 'Upgrade to premium',
    icon: '✨',
    category: 'premium',
    rarity: 'epic'
  },

  // Celebrity match
  'celebrity-twin': {
    id: 'celebrity-twin',
    name: 'Celebrity Twin',
    description: 'Match with a celebrity color season',
    icon: '🌟',
    category: 'special',
    rarity: 'uncommon'
  },

  // Friend comparison
  'friend-compare': {
    id: 'friend-compare',
    name: 'Color Companion',
    description: 'Compare colors with a friend',
    icon: '👯',
    category: 'social',
    rarity: 'uncommon'
  }
}

/**
 * Get all achievements grouped by category
 * @returns {Object} Achievements grouped by category
 */
export const getAchievementsByCategory = () => {
  const categories = {}

  Object.values(ACHIEVEMENTS).forEach(achievement => {
    const { category } = achievement
    if (!categories[category]) {
      categories[category] = []
    }
    categories[category].push(achievement)
  })

  return categories
}

/**
 * Get achievement progress
 * @param {Array<string>} unlockedAchievements - User's unlocked achievement IDs
 * @returns {Object} Progress statistics
 */
export const getAchievementProgress = (unlockedAchievements) => {
  const total = Object.keys(ACHIEVEMENTS).length
  const unlocked = unlockedAchievements.length
  const percentage = Math.round((unlocked / total) * 100)

  return {
    total,
    unlocked,
    locked: total - unlocked,
    percentage
  }
}

/**
 * Get achievements by rarity
 * @param {string} rarity - Rarity level
 * @returns {Array} Achievements of that rarity
 */
export const getAchievementsByRarity = (rarity) => {
  return Object.values(ACHIEVEMENTS).filter(a => a.rarity === rarity)
}

/**
 * Check if user should unlock an achievement based on current state
 * @param {string} achievementId - Achievement to check
 * @param {Object} userState - Current user state from store
 * @returns {boolean} Whether achievement should be unlocked
 */
export const shouldUnlockAchievement = (achievementId, userState) => {
  // Already unlocked
  if (userState.achievements.includes(achievementId)) {
    return false
  }

  switch (achievementId) {
    case 'first-analysis':
      return !!userState.currentSeason

    case 'first-tryon':
      return userState.tryOnCount >= 1

    case 'tryon-master':
      return userState.tryOnCount >= 50

    case 'first-share':
      return userState.shareCount >= 1

    case 'social-butterfly':
      return userState.shareCount >= 5

    case 'influencer':
      return userState.shareCount >= 10

    case 'first-referral':
      return userState.referralCount >= 1

    case 'influencer-5':
      return userState.referralCount >= 5

    case 'influencer-10':
      return userState.referralCount >= 10

    case 'first-challenge':
      return userState.dailyChallenges.some(c => c.completed)

    case 'week-streak':
      return userState.challengeStreak >= 7

    case 'month-streak':
      return userState.challengeStreak >= 30

    case 'first-look':
      return userState.createdLooks.length >= 1

    case 'look-collection':
      return userState.createdLooks.length >= 10

    case 'premium-member':
      return userState.isPremium

    case 'celebrity-twin':
      return !!userState.celebrityMatch

    case 'friend-compare':
      return userState.friendComparisons.length >= 1

    default:
      return false
  }
}

/**
 * Get recently unlocked achievements
 * @param {Array<string>} achievements - All unlocked achievement IDs
 * @param {number} limit - Number of recent achievements to return
 * @returns {Array} Recent achievements
 */
export const getRecentAchievements = (achievements, limit = 3) => {
  return achievements.slice(-limit).reverse().map(id => ACHIEVEMENTS[id])
}
