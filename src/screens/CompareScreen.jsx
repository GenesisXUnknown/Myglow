import { useState } from 'react'
import { motion } from 'framer-motion'
import { Container, Button, Card, PageHeader, LoadingSpinner, Badge, ColorSwatch } from '../components/UI'
import useStore from '../store'
import { analyzeImage } from '../utils/colorAnalysis'

const CompareScreen = () => {
  const {
    getCurrentSeasonData,
    userPhoto,
    userName,
    saveFriendComparison,
    unlockAchievement,
    getAllSeasons
  } = useStore()

  const userSeasonData = getCurrentSeasonData()
  const [friendPhoto, setFriendPhoto] = useState(null)
  const [friendPhotoPreview, setFriendPhotoPreview] = useState(null)
  const [friendName, setFriendName] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [friendSeason, setFriendSeason] = useState(null)
  const [showComparison, setShowComparison] = useState(false)

  const handleFriendPhotoSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setFriendPhoto(file)

      const reader = new FileReader()
      reader.onload = (e) => {
        setFriendPhotoPreview(e.target?.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAnalyzeFriend = async () => {
    if (!friendPhotoPreview) return

    setAnalyzing(true)

    try {
      const result = await analyzeImage(friendPhotoPreview)
      const allSeasons = getAllSeasons()
      const seasonData = allSeasons.find(s => s.id === result.season)

      setFriendSeason(seasonData)
      setShowComparison(true)

      // Save comparison
      saveFriendComparison({
        friendName: friendName || 'Friend',
        friendSeason: result.season,
        userSeason: userSeasonData.id,
        date: new Date().toISOString()
      })

      // Unlock achievement
      unlockAchievement('friend-compare')
    } catch (error) {
      alert('Failed to analyze friend photo. Please try again.')
    } finally {
      setAnalyzing(false)
    }
  }

  const getCompatibleColors = () => {
    if (!userSeasonData || !friendSeason) return []

    // Find colors that appear in both palettes
    const userColors = new Set(userSeasonData.bestColors)
    const friendColors = friendSeason.bestColors

    return friendColors.filter(color => userColors.has(color))
  }

  const getComplementaryPairs = () => {
    if (!userSeasonData || !friendSeason) return []

    // Suggest makeup combinations
    return [
      {
        category: 'Lips',
        userColor: userSeasonData.makeup.lips[0],
        friendColor: friendSeason.makeup.lips[0],
        compatible: userSeasonData.undertone === friendSeason.undertone
      },
      {
        category: 'Eyes',
        userColor: userSeasonData.makeup.eyes[0],
        friendColor: friendSeason.makeup.eyes[0],
        compatible: userSeasonData.season === friendSeason.season
      }
    ]
  }

  if (!userSeasonData) {
    return (
      <div className="min-h-screen pb-24 flex items-center justify-center">
        <Container className="text-center">
          <div className="text-6xl mb-4">📸</div>
          <h2 className="text-2xl font-bold mb-4">Analyze Your Colors First</h2>
          <p className="text-gray-600 mb-6">
            You need to complete your own analysis before comparing with friends
          </p>
        </Container>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-24">
      <Container className="py-8">
        <PageHeader
          title="Compare with Friends"
          subtitle="Discover your color compatibility"
        />

        {/* Upload Section */}
        {!showComparison && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card glass className="mb-6">
              <h3 className="font-bold text-lg mb-4">Your Friend's Photo</h3>

              {/* Name Input */}
              <input
                type="text"
                placeholder="Friend's name (optional)"
                value={friendName}
                onChange={(e) => setFriendName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 outline-none mb-4"
              />

              {!friendPhotoPreview ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">👥</div>
                  <h3 className="text-xl font-bold mb-2">Upload Friend's Selfie</h3>
                  <p className="text-gray-600 mb-6">
                    We'll analyze their color season and show you compatibility
                  </p>

                  <label htmlFor="friend-upload">
                    <input
                      id="friend-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFriendPhotoSelect}
                      className="hidden"
                    />
                    <Button variant="primary" as="span" className="cursor-pointer">
                      Choose Photo
                    </Button>
                  </label>
                </div>
              ) : (
                <div>
                  <img
                    src={friendPhotoPreview}
                    alt="Friend preview"
                    className="w-full rounded-lg mb-4"
                  />

                  {analyzing ? (
                    <div className="text-center py-4">
                      <LoadingSpinner size="lg" className="mx-auto mb-4" />
                      <p className="text-gray-600">Analyzing friend's colors...</p>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <Button
                        onClick={handleAnalyzeFriend}
                        variant="primary"
                        className="flex-1"
                      >
                        Analyze & Compare
                      </Button>
                      <Button
                        onClick={() => {
                          setFriendPhotoPreview(null)
                          setFriendPhoto(null)
                        }}
                        variant="outline"
                      >
                        Change Photo
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </motion.div>
        )}

        {/* Comparison Results */}
        {showComparison && friendSeason && (
          <div className="space-y-6">
            {/* Side by Side */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="grid grid-cols-2 gap-4">
                {/* User */}
                <Card glass className="text-center">
                  {userPhoto && (
                    <img
                      src={userPhoto}
                      alt="You"
                      className="w-full h-48 object-cover rounded-lg mb-3"
                    />
                  )}
                  <h3 className="font-bold text-lg">{userName || 'You'}</h3>
                  <p className="text-primary-600 font-semibold">{userSeasonData.name}</p>
                  <Badge variant="primary" className="mt-2">
                    {userSeasonData.undertone}
                  </Badge>
                </Card>

                {/* Friend */}
                <Card glass className="text-center">
                  {friendPhotoPreview && (
                    <img
                      src={friendPhotoPreview}
                      alt="Friend"
                      className="w-full h-48 object-cover rounded-lg mb-3"
                    />
                  )}
                  <h3 className="font-bold text-lg">{friendName || 'Friend'}</h3>
                  <p className="text-secondary-600 font-semibold">{friendSeason.name}</p>
                  <Badge variant="secondary" className="mt-2">
                    {friendSeason.undertone}
                  </Badge>
                </Card>
              </div>
            </motion.div>

            {/* Compatibility Score */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white text-center">
                <div className="text-6xl mb-4">
                  {userSeasonData.undertone === friendSeason.undertone ? '💝' : '🌈'}
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  {userSeasonData.id === friendSeason.id
                    ? 'Perfect Twins!'
                    : userSeasonData.undertone === friendSeason.undertone
                    ? 'Great Match!'
                    : 'Complementary Duo!'}
                </h3>
                <p className="opacity-90">
                  {userSeasonData.id === friendSeason.id
                    ? 'You share the exact same color season!'
                    : userSeasonData.undertone === friendSeason.undertone
                    ? 'You have the same undertone - share makeup tips!'
                    : 'Your different undertones create beautiful contrast!'}
                </p>
              </Card>
            </motion.div>

            {/* Shared Colors */}
            {getCompatibleColors().length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card glass>
                  <h3 className="font-bold text-lg mb-4">Colors You Can Share 🎨</h3>
                  <div className="flex flex-wrap gap-4 justify-center">
                    {getCompatibleColors().map((color, idx) => (
                      <ColorSwatch
                        key={idx}
                        color={color}
                        size="lg"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-4 text-center">
                    These colors look great on both of you!
                  </p>
                </Card>
              </motion.div>
            )}

            {/* Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card glass>
                <h3 className="font-bold text-lg mb-4">Makeup Pairing Ideas 💄</h3>
                <div className="space-y-4">
                  {getComplementaryPairs().map((pair, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-3">{pair.category}</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-2">{userName || 'You'}</p>
                          <div className="flex items-center gap-3">
                            <div
                              className="w-12 h-12 rounded-full border-2 border-white shadow"
                              style={{ backgroundColor: pair.userColor.hex }}
                            />
                            <span className="text-sm font-medium">{pair.userColor.name}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-2">{friendName || 'Friend'}</p>
                          <div className="flex items-center gap-3">
                            <div
                              className="w-12 h-12 rounded-full border-2 border-white shadow"
                              style={{ backgroundColor: pair.friendColor.hex }}
                            />
                            <span className="text-sm font-medium">{pair.friendColor.name}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    setShowComparison(false)
                    setFriendPhotoPreview(null)
                    setFriendSeason(null)
                    setFriendName('')
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Compare Another Friend
                </Button>
                <Button
                  variant="secondary"
                  className="flex-1"
                >
                  📱 Share Comparison
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </Container>
    </div>
  )
}

export default CompareScreen
