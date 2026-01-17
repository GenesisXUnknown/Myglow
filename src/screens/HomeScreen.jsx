import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container, Button, Card, Badge } from '../components/UI'
import SocialFeed from '../components/SocialFeed'
import DailyChallenges from '../components/DailyChallenges'
import useStore from '../store'

const HomeScreen = () => {
  const navigate = useNavigate()
  const { currentSeason, getCurrentSeasonData, isPremium } = useStore()
  const seasonData = getCurrentSeasonData()

  return (
    <div className="min-h-screen pb-24">
      <Container className="py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl sm:text-6xl font-bold gradient-text mb-4">
            GlowMatch
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Your Personal Makeup Color Guide
          </p>
          <p className="text-gray-500">
            Discover your perfect makeup colors with AI-powered seasonal color analysis
          </p>
        </motion.div>

        {/* Current Season Card */}
        {seasonData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <Card glass className="text-center">
              <Badge variant="primary" className="mb-4">
                Your Color Season
              </Badge>
              <h2 className="text-3xl font-bold gradient-text mb-2">
                {seasonData.name}
              </h2>
              <p className="text-gray-600 mb-4">
                {seasonData.description}
              </p>
              <div className="flex gap-2 justify-center flex-wrap mb-4">
                {seasonData.bestColors.slice(0, 6).map((color, idx) => (
                  <div
                    key={idx}
                    className="w-10 h-10 rounded-full shadow-md border-2 border-white"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <Button onClick={() => navigate('/results')} variant="secondary">
                View Full Results
              </Button>
            </Card>
          </motion.div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card
              glass
              onClick={() => navigate('/analyze')}
              className="text-center cursor-pointer hover:scale-105"
            >
              <div className="text-4xl mb-2">📸</div>
              <h3 className="text-sm font-bold">
                {currentSeason ? 'Analyze Again' : 'Find Colors'}
              </h3>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Card
              glass
              onClick={() => navigate('/compare')}
              className="text-center cursor-pointer hover:scale-105"
            >
              <div className="text-4xl mb-2">👥</div>
              <h3 className="text-sm font-bold">Compare</h3>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card
              glass
              onClick={() => navigate('/look-builder')}
              className="text-center cursor-pointer hover:scale-105"
            >
              <div className="text-4xl mb-2">🎨</div>
              <h3 className="text-sm font-bold">Create Look</h3>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Card
              glass
              onClick={() => navigate('/share')}
              className="text-center cursor-pointer hover:scale-105"
            >
              <div className="text-4xl mb-2">📱</div>
              <h3 className="text-sm font-bold">Share</h3>
            </Card>
          </motion.div>
        </div>

        {/* Daily Challenges */}
        {currentSeason && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <DailyChallenges />
          </motion.div>
        )}

        {/* Social Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-8"
        >
          <SocialFeed limit={6} />
        </motion.div>

        {/* Referral CTA */}
        {currentSeason && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <Card
              glass
              onClick={() => navigate('/referral')}
              className="cursor-pointer hover:scale-102 transition-transform"
            >
              <div className="flex items-center gap-4">
                <div className="text-5xl">🎁</div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">Invite Friends, Get Rewards!</h3>
                  <p className="text-sm text-gray-600">
                    Share GlowMatch and unlock bonus try-ons & premium access
                  </p>
                </div>
                <Badge variant="success">Free rewards!</Badge>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            Why GlowMatch?
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <Card glass>
              <div className="flex items-start gap-4">
                <div className="text-3xl">🎨</div>
                <div>
                  <h3 className="font-bold mb-1">Personalized Color Analysis</h3>
                  <p className="text-sm text-gray-600">
                    AI-powered analysis determines your unique seasonal color type from 12 distinct palettes
                  </p>
                </div>
              </div>
            </Card>

            <Card glass>
              <div className="flex items-start gap-4">
                <div className="text-3xl">✨</div>
                <div>
                  <h3 className="font-bold mb-1">Expert Makeup Recommendations</h3>
                  <p className="text-sm text-gray-600">
                    Get customized makeup color suggestions for lips, eyes, cheeks, and more
                  </p>
                </div>
              </div>
            </Card>

            <Card glass>
              <div className="flex items-start gap-4">
                <div className="text-3xl">👁️</div>
                <div>
                  <h3 className="font-bold mb-1">Virtual Try-On</h3>
                  <p className="text-sm text-gray-600">
                    See how different colors look on you before buying
                  </p>
                </div>
              </div>
            </Card>

            <Card glass>
              <div className="flex items-start gap-4">
                <div className="text-3xl">📚</div>
                <div>
                  <h3 className="font-bold mb-1">Curated Makeup Looks</h3>
                  <p className="text-sm text-gray-600">
                    Browse complete makeup looks tailored to your color season
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Premium CTA */}
        {!isPremium && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <Card className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white text-center">
              <h3 className="text-2xl font-bold mb-2">Unlock Premium</h3>
              <p className="mb-4 opacity-90">
                Unlimited try-ons, exclusive looks, and personalized recommendations
              </p>
              <Button
                variant="outline"
                onClick={() => navigate('/premium')}
                className="bg-white text-primary-600 hover:bg-gray-50"
              >
                Learn More
              </Button>
            </Card>
          </motion.div>
        )}

        {/* CTA */}
        {!currentSeason && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <Button
              onClick={() => navigate('/analyze')}
              variant="primary"
              className="text-lg px-8 py-4"
            >
              Get Started - It's Free!
            </Button>
          </motion.div>
        )}
      </Container>
    </div>
  )
}

export default HomeScreen
