import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container, Button, Card, PageHeader, ColorSwatch, Badge, Modal } from '../components/UI'
import useStore from '../store'

const TryOnScreen = () => {
  const navigate = useNavigate()
  const {
    getCurrentSeasonData,
    canTryOn,
    incrementTryOnCount,
    getRemainingTryOns,
    isPremium,
    userPhoto,
    saveLook
  } = useStore()

  const seasonData = getCurrentSeasonData()
  const [selectedCategory, setSelectedCategory] = useState('lips')
  const [selectedColor, setSelectedColor] = useState(null)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [savedNotification, setSavedNotification] = useState(false)

  const categories = [
    { id: 'lips', name: 'Lips', icon: '💋' },
    { id: 'eyes', name: 'Eyes', icon: '👁️' },
    { id: 'cheeks', name: 'Cheeks', icon: '✨' },
  ]

  const handleTryOn = (color) => {
    if (!canTryOn()) {
      setShowUpgradeModal(true)
      return
    }

    setSelectedColor(color)
    incrementTryOnCount()
  }

  const handleSaveLook = () => {
    if (selectedColor) {
      saveLook({
        category: selectedCategory,
        color: selectedColor,
        timestamp: new Date().toISOString()
      })
      setSavedNotification(true)
      setTimeout(() => setSavedNotification(false), 2000)
    }
  }

  const remainingTryOns = getRemainingTryOns()

  if (!seasonData) {
    return (
      <div className="min-h-screen pb-24 flex items-center justify-center">
        <Container className="text-center">
          <div className="text-6xl mb-4">📸</div>
          <h2 className="text-2xl font-bold mb-4">Analyze Your Colors First</h2>
          <p className="text-gray-600 mb-6">
            Upload a selfie to get personalized color recommendations
          </p>
          <Button onClick={() => navigate('/analyze')}>
            Analyze Now
          </Button>
        </Container>
      </div>
    )
  }

  const currentColors = seasonData.makeup[selectedCategory] || []

  return (
    <div className="min-h-screen pb-24">
      <Container className="py-8">
        <PageHeader
          title="Virtual Try-On"
          subtitle="See how different colors look on you"
          action={
            !isPremium && (
              <Badge variant={remainingTryOns > 0 ? 'info' : 'warning'}>
                {remainingTryOns} free {remainingTryOns === 1 ? 'try-on' : 'try-ons'} left
              </Badge>
            )
          }
        />

        {/* Virtual Try-On Canvas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card glass className="relative">
            {userPhoto ? (
              <div className="relative">
                <img
                  src={userPhoto}
                  alt="Your photo"
                  className="w-full rounded-lg"
                />
                {selectedColor && (
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full border-2 border-white shadow"
                        style={{ backgroundColor: selectedColor.hex }}
                      />
                      <span className="font-semibold text-sm">{selectedColor.name}</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-16 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg">
                <div className="text-6xl mb-4">👤</div>
                <p className="text-gray-600 mb-4">No photo available</p>
                <Button onClick={() => navigate('/analyze')} variant="outline">
                  Upload Photo
                </Button>
              </div>
            )}

            {selectedColor && userPhoto && (
              <div className="mt-4 flex gap-3">
                <Button onClick={handleSaveLook} variant="secondary" className="flex-1">
                  Save Look
                </Button>
                <Button onClick={() => setSelectedColor(null)} variant="outline" className="flex-1">
                  Clear
                </Button>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id)
                  setSelectedColor(null)
                }}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-full font-semibold whitespace-nowrap
                  transition-all duration-300
                  ${selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                  }
                `}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Color Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card glass>
            <h3 className="text-lg font-bold mb-4">
              Choose a Color
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {currentColors.map((color, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleTryOn(color)}
                  className={`
                    cursor-pointer p-4 rounded-xl border-2 transition-all
                    ${selectedColor?.hex === color.hex
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                    }
                  `}
                >
                  <ColorSwatch
                    color={color.hex}
                    name={color.name}
                    size="lg"
                  />
                  <div className="text-center mt-2">
                    <Badge variant="secondary" className="text-xs">
                      {color.finish}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Upgrade Modal */}
        <Modal
          isOpen={showUpgradeModal}
          onClose={() => setShowUpgradeModal(false)}
          title="Upgrade to Premium"
        >
          <div className="text-center">
            <div className="text-6xl mb-4">✨</div>
            <h3 className="text-xl font-bold mb-3">You've used all your free try-ons!</h3>
            <p className="text-gray-600 mb-6">
              Upgrade to Premium for unlimited virtual try-ons and exclusive features
            </p>
            <div className="space-y-3">
              <Button
                onClick={() => {
                  setShowUpgradeModal(false)
                  navigate('/premium')
                }}
                variant="primary"
                className="w-full"
              >
                Upgrade Now
              </Button>
              <Button
                onClick={() => setShowUpgradeModal(false)}
                variant="outline"
                className="w-full"
              >
                Maybe Later
              </Button>
            </div>
          </div>
        </Modal>

        {/* Save Notification */}
        {savedNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg z-50"
          >
            ✓ Look saved to your profile!
          </motion.div>
        )}
      </Container>
    </div>
  )
}

export default TryOnScreen
