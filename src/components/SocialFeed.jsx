import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, Badge } from './UI'

/**
 * SocialFeed Component
 * Displays simulated live activity feed to create FOMO
 */
const SocialFeed = ({ limit = 5 }) => {
  const [activities, setActivities] = useState([])

  useEffect(() => {
    // Generate mock activities
    const mockActivities = generateMockActivities(limit)
    setActivities(mockActivities)

    // Simulate new activity every 10 seconds
    const interval = setInterval(() => {
      const newActivity = generateRandomActivity()
      setActivities(prev => [newActivity, ...prev.slice(0, limit - 1)])
    }, 10000)

    return () => clearInterval(interval)
  }, [limit])

  return (
    <Card glass>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">🔥 Live Activity</h3>
        <Badge variant="success">
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
          Live
        </Badge>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activities.map((activity, idx) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-start gap-3 p-3 bg-white/50 rounded-lg hover:bg-white/80 transition-colors"
          >
            <div className="text-2xl">{activity.icon}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm">
                <span className="font-semibold">{activity.name}</span>
                {' '}{activity.action}
              </p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
            {activity.season && (
              <Badge variant="primary" className="text-xs whitespace-nowrap">
                {activity.season}
              </Badge>
            )}
          </motion.div>
        ))}
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        {activities.length.toLocaleString()}+ people discovering their colors today
      </p>
    </Card>
  )
}

// Mock data generators
const names = ['Sarah', 'Emma', 'Olivia', 'Ava', 'Sophia', 'Isabella', 'Mia', 'Charlotte', 'Amelia', 'Harper', 'James', 'John', 'Robert', 'Michael', 'David', 'William']
const seasons = ['Light Spring', 'Warm Spring', 'Clear Spring', 'Light Summer', 'Cool Summer', 'Soft Summer', 'Soft Autumn', 'Warm Autumn', 'Deep Autumn', 'Deep Winter', 'Cool Winter', 'Clear Winter']
const actions = [
  { text: 'just discovered they\'re a', icon: '✨', includeSeason: true },
  { text: 'created a stunning makeup look', icon: '💄', includeSeason: false },
  { text: 'unlocked a new achievement', icon: '🏆', includeSeason: false },
  { text: 'shared their color analysis', icon: '📱', includeSeason: false },
  { text: 'found their perfect colors', icon: '🎨', includeSeason: true },
  { text: 'joined GlowMatch', icon: '👋', includeSeason: false }
]

const generateRandomActivity = () => {
  const name = names[Math.floor(Math.random() * names.length)]
  const action = actions[Math.floor(Math.random() * actions.length)]
  const season = action.includeSeason ? seasons[Math.floor(Math.random() * seasons.length)] : null
  const minutesAgo = Math.floor(Math.random() * 60)

  return {
    id: Date.now() + Math.random(),
    name,
    action: action.text,
    icon: action.icon,
    season,
    time: minutesAgo === 0 ? 'Just now' : `${minutesAgo}m ago`
  }
}

const generateMockActivities = (count) => {
  return Array.from({ length: count }, (_, i) => {
    const activity = generateRandomActivity()
    // Stagger the times
    const minutesAgo = i * 5
    activity.time = minutesAgo === 0 ? 'Just now' : `${minutesAgo}m ago`
    activity.id = Date.now() - i
    return activity
  })
}

export default SocialFeed
