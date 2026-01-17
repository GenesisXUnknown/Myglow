import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container, Button, Card, PageHeader, ColorSwatch, Badge } from '../components/UI'
import useStore from '../store'
import { generateLookCard, shareToSocial } from '../utils/sharing'

const LookBuilderScreen = () => {
  const navigate = useNavigate()
  const {
    getCurrentSeasonData,
    saveCreatedLook,
    createdLooks,
    deleteCreatedLook,
    userName,
    unlockAchievement
  } = useStore()

  const seasonData = getCurrentSeasonData()
  const [lookName, setLookName] = useState('')
  const [selectedLips, setSelectedLips] = useState(null)
  const [selectedEyes, setSelectedEyes] = useState(null)
  const [selectedCheeks, setSelectedCheeks] = useState(null)
  const [showSaved, setShowSaved] = useState(false)

  const handleSaveLook = () => {
    if (!selectedLips || !selectedEyes || !selectedCheeks) {
      alert('Please select all three colors to complete your look')
      return
    }

    const look = {
      name: lookName || `Look ${createdLooks.length + 1}`,
      lips: selectedLips,
      eyes: selectedEyes,
      cheeks: selectedCheeks,
      season: seasonData.id
    }

    saveCreatedLook(look)
    unlockAchievement('first-look')

    // Reset
    setLookName('')
    setSelectedLips(null)
    setSelectedEyes(null)
    setSelectedCheeks(null)
    setShowSaved(true)
    setTimeout(() => setShowSaved(false), 2000)
  }

  const handleShareLook = async (look) => {
    const card = await generateLookCard(look, seasonData, userName)
    await shareToSocial(card, `Check out my ${look.name}! Created on GlowMatch ✨`)
  }

  if (!seasonData) {
    return (
      <div className="min-h-screen pb-24 flex items-center justify-center">
        <Container className="text-center">
          <div className="text-6xl mb-4">🎨</div>
          <h2 className="text-2xl font-bold mb-4">Analyze Your Colors First</h2>
          <Button onClick={() => navigate('/analyze')}>Get Started</Button>
        </Container>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-24">
      <Container className="py-8">
        <PageHeader
          title="Look Builder"
          subtitle="Create your perfect makeup look"
        />

        {/* Look Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card glass>
            <input
              type="text"
              placeholder="Name your look (e.g., Date Night Glam)"
              value={lookName}
              onChange={(e) => setLookName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 outline-none text-lg font-semibold"
            />
          </Card>
        </motion.div>

        {/* Color Selection */}
        <div className="space-y-6 mb-6">
          {/* Lips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card glass>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">💋 Lips</h3>
                {selectedLips && <Badge variant="success">Selected</Badge>}
              </div>
              <div className="grid grid-cols-4 gap-3">
                {seasonData.makeup.lips.map((color, idx) => (
                  <div key={idx} onClick={() => setSelectedLips(color)}>
                    <ColorSwatch
                      color={color.hex}
                      name={color.name}
                      selected={selectedLips?.hex === color.hex}
                      size="md"
                    />
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Eyes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card glass>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">👁️ Eyes</h3>
                {selectedEyes && <Badge variant="success">Selected</Badge>}
              </div>
              <div className="grid grid-cols-4 gap-3">
                {seasonData.makeup.eyes.slice(0, 8).map((color, idx) => (
                  <div key={idx} onClick={() => setSelectedEyes(color)}>
                    <ColorSwatch
                      color={color.hex}
                      name={color.name}
                      selected={selectedEyes?.hex === color.hex}
                      size="md"
                    />
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Cheeks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card glass>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">✨ Cheeks</h3>
                {selectedCheeks && <Badge variant="success">Selected</Badge>}
              </div>
              <div className="grid grid-cols-3 gap-3">
                {seasonData.makeup.cheeks.map((color, idx) => (
                  <div key={idx} onClick={() => setSelectedCheeks(color)}>
                    <ColorSwatch
                      color={color.hex}
                      name={color.name}
                      selected={selectedCheeks?.hex === color.hex}
                      size="md"
                    />
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Preview & Save */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white">
            <h3 className="text-xl font-bold mb-4 text-center">Your Look Preview</h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-2 rounded-full border-4 border-white shadow-lg" style={{ backgroundColor: selectedLips?.hex || '#ddd' }} />
                <p className="text-sm font-semibold">{selectedLips?.name || 'Select Lips'}</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-2 rounded-full border-4 border-white shadow-lg" style={{ backgroundColor: selectedEyes?.hex || '#ddd' }} />
                <p className="text-sm font-semibold">{selectedEyes?.name || 'Select Eyes'}</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-2 rounded-full border-4 border-white shadow-lg" style={{ backgroundColor: selectedCheeks?.hex || '#ddd' }} />
                <p className="text-sm font-semibold">{selectedCheeks?.name || 'Select Cheeks'}</p>
              </div>
            </div>
            <Button
              onClick={handleSaveLook}
              disabled={!selectedLips || !selectedEyes || !selectedCheeks}
              variant="outline"
              className="bg-white text-primary-600 hover:bg-gray-50 w-full"
            >
              💾 Save This Look
            </Button>
          </Card>
        </motion.div>

        {/* Saved Looks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-4">Your Created Looks ({createdLooks.length})</h3>
          {createdLooks.length === 0 ? (
            <Card glass className="text-center py-12">
              <div className="text-6xl mb-4">🎨</div>
              <p className="text-gray-600">No looks created yet. Start building!</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {createdLooks.map((look) => (
                <Card key={look.id} glass>
                  <h4 className="font-bold text-lg mb-3">{look.name}</h4>
                  <div className="flex gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full border-2 border-white shadow" style={{ backgroundColor: look.lips.hex }} />
                    <div className="w-12 h-12 rounded-full border-2 border-white shadow" style={{ backgroundColor: look.eyes.hex }} />
                    <div className="w-12 h-12 rounded-full border-2 border-white shadow" style={{ backgroundColor: look.cheeks.hex }} />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handleShareLook(look)} variant="secondary" className="flex-1 text-sm">
                      Share
                    </Button>
                    <Button onClick={() => deleteCreatedLook(look.id)} variant="outline" className="flex-1 text-sm">
                      Delete
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </motion.div>

        {/* Save Notification */}
        {showSaved && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg z-50"
          >
            ✓ Look saved successfully!
          </motion.div>
        )}
      </Container>
    </div>
  )
}

export default LookBuilderScreen
