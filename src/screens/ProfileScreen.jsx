import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container, Card, PageHeader, Badge, Button, EmptyState } from '../components/UI'
import useStore from '../store'

const ProfileScreen = () => {
  const navigate = useNavigate()
  const {
    getCurrentSeasonData,
    savedLooks,
    deleteLook,
    isPremium,
    tryOnCount,
    getRemainingTryOns
  } = useStore()

  const seasonData = getCurrentSeasonData()
  const remainingTryOns = getRemainingTryOns()

  return (
    <div className="min-h-screen pb-24">
      <Container className="py-8">
        <PageHeader
          title="Profile"
          subtitle="Your personalized makeup journey"
        />

        {/* User Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card glass className="text-center">
            <div className="text-6xl mb-4">👤</div>

            {seasonData ? (
              <>
                <h2 className="text-2xl font-bold mb-2">
                  Your Color Season
                </h2>
                <h3 className="text-3xl font-bold gradient-text mb-4">
                  {seasonData.name}
                </h3>
                <div className="flex justify-center gap-2 mb-4">
                  <Badge variant="primary">
                    {seasonData.undertone} undertone
                  </Badge>
                  {isPremium && (
                    <Badge variant="success">
                      ✨ Premium Member
                    </Badge>
                  )}
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4">
                  Discover Your Colors
                </h2>
                <Button onClick={() => navigate('/analyze')}>
                  Analyze Now
                </Button>
              </>
            )}
          </Card>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-4 mb-6"
        >
          <Card glass className="text-center">
            <div className="text-3xl font-bold gradient-text mb-1">
              {savedLooks.length}
            </div>
            <p className="text-gray-600 text-sm">Saved Looks</p>
          </Card>

          <Card glass className="text-center">
            {isPremium ? (
              <>
                <div className="text-3xl font-bold gradient-text mb-1">∞</div>
                <p className="text-gray-600 text-sm">Try-Ons Available</p>
              </>
            ) : (
              <>
                <div className="text-3xl font-bold gradient-text mb-1">
                  {remainingTryOns}
                </div>
                <p className="text-gray-600 text-sm">Free Try-Ons Left</p>
              </>
            )}
          </Card>
        </motion.div>

        {/* Premium Section */}
        {!isPremium && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <Card className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white">
              <div className="text-center">
                <div className="text-5xl mb-3">✨</div>
                <h3 className="text-2xl font-bold mb-2">Upgrade to Premium</h3>
                <p className="mb-4 opacity-90">
                  Unlimited try-ons, exclusive looks, and more!
                </p>
                <Button
                  onClick={() => navigate('/premium')}
                  variant="outline"
                  className="bg-white text-primary-600 hover:bg-gray-50"
                >
                  Upgrade Now
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Saved Looks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold mb-4">Saved Looks</h3>

          {savedLooks.length === 0 ? (
            <Card glass>
              <EmptyState
                icon="💄"
                title="No saved looks yet"
                description="Try on some colors and save your favorite combinations"
                action={
                  <Button onClick={() => navigate('/try-on')}>
                    Try On Colors
                  </Button>
                }
              />
            </Card>
          ) : (
            <div className="space-y-4">
              {savedLooks.map((look) => (
                <motion.div
                  key={look.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Card glass>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                          style={{ backgroundColor: look.color.hex }}
                        />
                        <div>
                          <h4 className="font-bold">{look.color.name}</h4>
                          <p className="text-sm text-gray-600 capitalize">
                            {look.category}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(look.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteLook(look.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button
              onClick={() => navigate('/analyze')}
              variant="outline"
              className="w-full justify-between"
            >
              <span>Retake Analysis</span>
              <span>📸</span>
            </Button>
            <Button
              onClick={() => navigate('/results')}
              variant="outline"
              className="w-full justify-between"
            >
              <span>View Color Results</span>
              <span>🎨</span>
            </Button>
            <Button
              onClick={() => navigate('/looks')}
              variant="outline"
              className="w-full justify-between"
            >
              <span>Browse Curated Looks</span>
              <span>✨</span>
            </Button>
          </div>
        </motion.div>
      </Container>
    </div>
  )
}

export default ProfileScreen
