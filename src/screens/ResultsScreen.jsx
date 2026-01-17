import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container, Button, Card, PageHeader, Badge, ColorSwatch } from '../components/UI'
import useStore from '../store'

const ResultsScreen = () => {
  const navigate = useNavigate()
  const { getCurrentSeasonData } = useStore()
  const seasonData = getCurrentSeasonData()

  if (!seasonData) {
    return (
      <div className="min-h-screen pb-24 flex items-center justify-center">
        <Container className="text-center">
          <div className="text-6xl mb-4">🎨</div>
          <h2 className="text-2xl font-bold mb-4">No Analysis Yet</h2>
          <p className="text-gray-600 mb-6">
            Upload a selfie to discover your seasonal color type
          </p>
          <Button onClick={() => navigate('/analyze')}>
            Analyze Now
          </Button>
        </Container>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-24">
      <Container className="py-8">
        <PageHeader
          title="Your Color Analysis"
          subtitle="Personalized recommendations for your unique coloring"
          action={
            <Button onClick={() => navigate('/share')} variant="secondary" className="text-sm">
              📱 Share
            </Button>
          }
        />

        {/* Season Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card glass className="text-center">
            <Badge variant="primary" className="mb-4">
              Your Color Season
            </Badge>
            <h2 className="text-4xl font-bold gradient-text mb-3">
              {seasonData.name}
            </h2>
            <p className="text-gray-600 mb-4 text-lg">
              {seasonData.description}
            </p>
            <div className="inline-block px-4 py-2 bg-primary-50 rounded-full">
              <span className="text-sm font-semibold text-primary-700">
                {seasonData.undertone.charAt(0).toUpperCase() + seasonData.undertone.slice(1)} Undertone
              </span>
            </div>
          </Card>
        </motion.div>

        {/* Characteristics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card glass>
            <h3 className="text-xl font-bold mb-4">Your Characteristics</h3>
            <ul className="space-y-3">
              {seasonData.characteristics.map((char, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-primary-500 text-xl">•</span>
                  <span className="text-gray-700">{char}</span>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>

        {/* Best Colors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Card glass>
            <h3 className="text-xl font-bold mb-4">Your Best Colors</h3>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
              {seasonData.bestColors.map((color, idx) => (
                <ColorSwatch
                  key={idx}
                  color={color}
                  size="lg"
                />
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Makeup Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <Card glass>
            <h3 className="text-xl font-bold mb-4">Makeup Recommendations</h3>

            <div className="space-y-6">
              {/* Lips */}
              <div>
                <h4 className="font-semibold text-primary-700 mb-3 flex items-center gap-2">
                  <span>💋</span> Lips
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {seasonData.makeup.lips.map((item, idx) => (
                    <div key={idx} className="text-center">
                      <ColorSwatch color={item.hex} name={item.name} />
                      <Badge variant="secondary" className="mt-2 text-xs">
                        {item.finish}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Eyes */}
              <div>
                <h4 className="font-semibold text-primary-700 mb-3 flex items-center gap-2">
                  <span>👁️</span> Eyes
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {seasonData.makeup.eyes.map((item, idx) => (
                    <div key={idx} className="text-center">
                      <ColorSwatch color={item.hex} name={item.name} />
                      <Badge variant="secondary" className="mt-2 text-xs">
                        {item.finish}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cheeks */}
              <div>
                <h4 className="font-semibold text-primary-700 mb-3 flex items-center gap-2">
                  <span>✨</span> Cheeks
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {seasonData.makeup.cheeks.map((item, idx) => (
                    <div key={idx} className="text-center">
                      <ColorSwatch color={item.hex} name={item.name} />
                      <Badge variant="secondary" className="mt-2 text-xs">
                        {item.finish}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Celebrity Inspiration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <Card glass>
            <h3 className="text-xl font-bold mb-4">Celebrity Inspiration</h3>
            <p className="text-gray-600 mb-3">
              These celebrities share your color season:
            </p>
            <div className="flex flex-wrap gap-2">
              {seasonData.celebrities.map((celeb, idx) => (
                <Badge key={idx} variant="primary">
                  {celeb}
                </Badge>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button
            onClick={() => navigate('/try-on')}
            variant="primary"
            className="flex-1"
          >
            Try On Colors
          </Button>
          <Button
            onClick={() => navigate('/looks')}
            variant="secondary"
            className="flex-1"
          >
            Browse Looks
          </Button>
        </motion.div>
      </Container>
    </div>
  )
}

export default ResultsScreen
