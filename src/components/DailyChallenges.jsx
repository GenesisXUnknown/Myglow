import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, Button, Badge, ProgressBar } from './UI'
import useStore from '../store'
import { generateDailyChallenges, getChallengeMotivation, getStreakBonus } from '../utils/challenges'

/**
 * DailyChallenges Component
 * Displays and manages daily makeup challenges
 */
const DailyChallenges = () => {
  const {
    getCurrentSeasonData,
    dailyChallenges,
    setDailyChallenges,
    completeChallenge,
    challengeStreak,
    unlockAchievement
  } = useStore()

  const seasonData = getCurrentSeasonData()

  useEffect(() => {
    // Generate challenges if needed
    if (seasonData && dailyChallenges.length === 0) {
      const challenges = generateDailyChallenges(seasonData, 3)
      setDailyChallenges(challenges)
    }
  }, [seasonData, dailyChallenges.length, setDailyChallenges])

  const handleCompleteChallenge = (challengeId) => {
    completeChallenge(challengeId)
    unlockAchievement('first-challenge')
  }

  const completedCount = dailyChallenges.filter(c => c.completed).length
  const totalCount = dailyChallenges.length
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0
  const motivation = getChallengeMotivation(completedCount, totalCount)
  const streakBonus = getStreakBonus(challengeStreak)

  if (!seasonData || dailyChallenges.length === 0) {
    return null
  }

  return (
    <Card glass>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg">Today's Challenges</h3>
          <p className="text-sm text-gray-600">{motivation}</p>
        </div>
        {challengeStreak > 0 && (
          <Badge variant="warning">
            🔥 {challengeStreak} day{challengeStreak !== 1 ? 's' : ''}
          </Badge>
        )}
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">Progress</span>
          <span className="font-semibold">{completedCount}/{totalCount}</span>
        </div>
        <ProgressBar progress={progress} />
      </div>

      {/* Challenges */}
      <div className="space-y-3 mb-4">
        {dailyChallenges.map((challenge, idx) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`
              p-4 rounded-lg border-2 transition-all
              ${challenge.completed
                ? 'bg-green-50 border-green-500'
                : 'bg-white border-gray-200'
              }
            `}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">{challenge.icon}</div>
              <div className="flex-1">
                <p className={`font-semibold ${challenge.completed ? 'line-through text-gray-500' : ''}`}>
                  {challenge.text}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="info" className="text-xs">
                    {challenge.category}
                  </Badge>
                  <span className="text-xs text-gray-500">+{challenge.points} pts</span>
                </div>
              </div>
              {!challenge.completed && (
                <Button
                  onClick={() => handleCompleteChallenge(challenge.id)}
                  variant="outline"
                  className="text-xs px-3 py-1"
                >
                  Done
                </Button>
              )}
              {challenge.completed && (
                <span className="text-green-500 text-2xl">✓</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Streak Bonus */}
      {streakBonus.message && (
        <div className="p-3 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg text-center">
          <p className="font-bold text-sm">{streakBonus.message}</p>
          <p className="text-xs text-gray-600">Bonus: {streakBonus.bonus} points</p>
        </div>
      )}
    </Card>
  )
}

export default DailyChallenges
