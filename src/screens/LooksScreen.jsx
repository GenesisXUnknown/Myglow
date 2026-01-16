import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container, Card, PageHeader, Badge, ColorSwatch, Button } from '../components/UI'
import useStore from '../store'

const curatedLooks = {
  'light-spring': [
    {
      id: 1,
      name: 'Fresh & Natural',
      description: 'Soft peach tones for everyday',
      lips: { name: 'Peachy Nude', hex: '#FFDAB9' },
      eyes: { name: 'Champagne', hex: '#F7E7CE' },
      cheeks: { name: 'Peachy Glow', hex: '#FFDAB9' },
    },
    {
      id: 2,
      name: 'Coral Dream',
      description: 'Bright and vibrant',
      lips: { name: 'Coral Pink', hex: '#FF7F7F' },
      eyes: { name: 'Warm Taupe', hex: '#B38B6D' },
      cheeks: { name: 'Coral Blush', hex: '#FF7F50' },
    },
  ],
  'warm-spring': [
    {
      id: 1,
      name: 'Golden Hour',
      description: 'Warm, glowing elegance',
      lips: { name: 'Warm Red', hex: '#FF4500' },
      eyes: { name: 'Gold', hex: '#FFD700' },
      cheeks: { name: 'Coral Glow', hex: '#FF7F50' },
    },
    {
      id: 2,
      name: 'Sunset Glow',
      description: 'Terracotta warmth',
      lips: { name: 'Terracotta', hex: '#E27B58' },
      eyes: { name: 'Copper', hex: '#B87333' },
      cheeks: { name: 'Warm Apricot', hex: '#FBCEB1' },
    },
  ],
  'clear-spring': [
    {
      id: 1,
      name: 'Bold & Bright',
      description: 'High-impact color',
      lips: { name: 'True Red', hex: '#FF0000' },
      eyes: { name: 'Bright Gold', hex: '#FFD700' },
      cheeks: { name: 'Bright Coral', hex: '#FF6F61' },
    },
    {
      id: 2,
      name: 'Pink Power',
      description: 'Vibrant and fun',
      lips: { name: 'Hot Pink', hex: '#FF69B4' },
      eyes: { name: 'Emerald', hex: '#50C878' },
      cheeks: { name: 'Clear Pink', hex: '#FF1493' },
    },
  ],
}

// Add default looks for all seasons
const defaultLooks = [
  {
    id: 1,
    name: 'Everyday Glow',
    description: 'Perfect for daily wear',
    lips: { name: 'Natural', hex: '#DDBEA9' },
    eyes: { name: 'Neutral', hex: '#B8A396' },
    cheeks: { name: 'Soft', hex: '#E9CFC8' },
  },
  {
    id: 2,
    name: 'Evening Elegance',
    description: 'Sophisticated and polished',
    lips: { name: 'Deep Rose', hex: '#B85C5C' },
    eyes: { name: 'Smokey', hex: '#6B5D5D' },
    cheeks: { name: 'Glow', hex: '#D4A5A5' },
  },
]

const LooksScreen = () => {
  const navigate = useNavigate()
  const { getCurrentSeasonData } = useStore()
  const seasonData = getCurrentSeasonData()
  const [selectedLook, setSelectedLook] = useState(null)

  if (!seasonData) {
    return (
      <div className="min-h-screen pb-24 flex items-center justify-center">
        <Container className="text-center">
          <div className="text-6xl mb-4">🎨</div>
          <h2 className="text-2xl font-bold mb-4">Discover Your Season First</h2>
          <p className="text-gray-600 mb-6">
            Get personalized makeup looks tailored to your color season
          </p>
          <Button onClick={() => navigate('/analyze')}>
            Analyze Now
          </Button>
        </Container>
      </div>
    )
  }

  const looks = curatedLooks[seasonData.id] || defaultLooks

  return (
    <div className="min-h-screen pb-24">
      <Container className="py-8">
        <PageHeader
          title="Curated Looks"
          subtitle={`Makeup looks designed for ${seasonData.name}`}
        />

        {/* Season Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex justify-center"
        >
          <Badge variant="primary" className="text-lg px-6 py-2">
            {seasonData.name} Collection
          </Badge>
        </motion.div>

        {/* Looks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {looks.map((look, idx) => (
            <motion.div
              key={look.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card
                glass
                onClick={() => setSelectedLook(look)}
                className="cursor-pointer hover:scale-105"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold gradient-text mb-1">
                    {look.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{look.description}</p>
                </div>

                <div className="space-y-4">
                  {/* Lips */}
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💋</span>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">Lips</p>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-full border-2 border-white shadow"
                          style={{ backgroundColor: look.lips.hex }}
                        />
                        <span className="font-medium text-sm">{look.lips.name}</span>
                      </div>
                    </div>
                  </div>

                  {/* Eyes */}
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">👁️</span>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">Eyes</p>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-full border-2 border-white shadow"
                          style={{ backgroundColor: look.eyes.hex }}
                        />
                        <span className="font-medium text-sm">{look.eyes.name}</span>
                      </div>
                    </div>
                  </div>

                  {/* Cheeks */}
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">✨</span>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">Cheeks</p>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-full border-2 border-white shadow"
                          style={{ backgroundColor: look.cheeks.hex }}
                        />
                        <span className="font-medium text-sm">{look.cheeks.name}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Button variant="secondary" className="w-full" size="sm">
                    Try This Look
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* All Season Colors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card glass>
            <h3 className="text-xl font-bold mb-4">Your Color Palette</h3>
            <p className="text-gray-600 mb-4">
              Mix and match these colors to create your own unique looks
            </p>

            <div className="space-y-6">
              {/* Lips */}
              <div>
                <h4 className="font-semibold text-primary-700 mb-3 flex items-center gap-2">
                  <span>💋</span> Lip Colors
                </h4>
                <div className="flex flex-wrap gap-3">
                  {seasonData.makeup.lips.map((item, idx) => (
                    <ColorSwatch
                      key={idx}
                      color={item.hex}
                      name={item.name}
                    />
                  ))}
                </div>
              </div>

              {/* Eyes */}
              <div>
                <h4 className="font-semibold text-primary-700 mb-3 flex items-center gap-2">
                  <span>👁️</span> Eye Colors
                </h4>
                <div className="flex flex-wrap gap-3">
                  {seasonData.makeup.eyes.map((item, idx) => (
                    <ColorSwatch
                      key={idx}
                      color={item.hex}
                      name={item.name}
                    />
                  ))}
                </div>
              </div>

              {/* Cheeks */}
              <div>
                <h4 className="font-semibold text-primary-700 mb-3 flex items-center gap-2">
                  <span>✨</span> Cheek Colors
                </h4>
                <div className="flex flex-wrap gap-3">
                  {seasonData.makeup.cheeks.map((item, idx) => (
                    <ColorSwatch
                      key={idx}
                      color={item.hex}
                      name={item.name}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button
                onClick={() => navigate('/try-on')}
                variant="primary"
                className="w-full"
              >
                Create Your Own Look
              </Button>
            </div>
          </Card>
        </motion.div>
      </Container>
    </div>
  )
}

export default LooksScreen
