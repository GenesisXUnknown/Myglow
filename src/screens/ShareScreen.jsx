import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container, Button, Card, PageHeader, LoadingSpinner, Badge } from '../components/UI'
import useStore from '../store'
import {
  generateResultCard,
  generateBeforeAfterCard,
  shareToSocial,
  downloadImage,
  generateShareText,
  copyShareLink,
  shareToFacebook,
  shareToTwitter,
  shareToWhatsApp,
  shareViaEmail
} from '../utils/sharing'

const ShareScreen = () => {
  const navigate = useNavigate()
  const {
    getCurrentSeasonData,
    userPhoto,
    userName,
    incrementShareCount,
    getRemainingTryOns,
    referralCode,
    generateReferralCode,
    unlockAchievement
  } = useStore()

  const seasonData = getCurrentSeasonData()
  const [generating, setGenerating] = useState(false)
  const [shareCard, setShareCard] = useState(null)
  const [beforeAfterCard, setBeforeAfterCard] = useState(null)
  const [selectedCardType, setSelectedCardType] = useState('result')
  const [shareTexts, setShareTexts] = useState([])
  const [selectedTextIndex, setSelectedTextIndex] = useState(0)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!seasonData) {
      navigate('/analyze')
      return
    }

    // Generate share texts
    const texts = generateShareText(seasonData, userName)
    setShareTexts(texts)

    // Ensure user has referral code
    if (!referralCode) {
      generateReferralCode()
    }
  }, [seasonData, userName, navigate, referralCode, generateReferralCode])

  const handleGenerateCard = async (type) => {
    setGenerating(true)
    setSelectedCardType(type)

    try {
      if (type === 'result') {
        const card = await generateResultCard(seasonData, userPhoto, userName)
        setShareCard(card)
      } else if (type === 'before-after') {
        const card = await generateBeforeAfterCard(userPhoto, userPhoto, seasonData)
        setBeforeAfterCard(card)
      }
    } catch (error) {
      console.error('Failed to generate card:', error)
    } finally {
      setGenerating(false)
    }
  }

  const handleShare = async () => {
    const card = selectedCardType === 'result' ? shareCard : beforeAfterCard
    if (!card) return

    const success = await shareToSocial(
      card,
      shareTexts[selectedTextIndex],
      `https://glowmatch.app?ref=${referralCode}`
    )

    if (success) {
      incrementShareCount()
      unlockAchievement('first-share')

      // Show reward notification
      const remaining = getRemainingTryOns()
      if (remaining < 5) {
        alert('🎉 You unlocked 5 bonus try-ons for sharing!')
      }
    }
  }

  const handleDownload = () => {
    const card = selectedCardType === 'result' ? shareCard : beforeAfterCard
    if (card) {
      downloadImage(card, `glowmatch-${selectedCardType}.png`)
    }
  }

  const handleCopyLink = async () => {
    const success = await copyShareLink(referralCode)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!seasonData) {
    return null
  }

  return (
    <div className="min-h-screen pb-24">
      <Container className="py-8">
        <PageHeader
          title="Share Your Glow"
          subtitle="Show off your perfect colors"
        />

        {/* Card Type Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex gap-3 overflow-x-auto pb-2">
            <Button
              onClick={() => handleGenerateCard('result')}
              variant={selectedCardType === 'result' ? 'primary' : 'outline'}
              disabled={generating}
              className="whitespace-nowrap"
            >
              📊 Result Card
            </Button>
            <Button
              onClick={() => handleGenerateCard('before-after')}
              variant={selectedCardType === 'before-after' ? 'primary' : 'outline'}
              disabled={generating}
              className="whitespace-nowrap"
            >
              ✨ Before & After
            </Button>
          </div>
        </motion.div>

        {/* Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card glass>
            {generating ? (
              <div className="flex flex-col items-center justify-center py-20">
                <LoadingSpinner size="lg" className="mb-4" />
                <p className="text-gray-600">Creating your share card...</p>
              </div>
            ) : (shareCard || beforeAfterCard) ? (
              <div>
                <img
                  src={selectedCardType === 'result' ? shareCard : beforeAfterCard}
                  alt="Share card preview"
                  className="w-full rounded-lg shadow-lg"
                />
                <div className="mt-4 flex gap-3">
                  <Button
                    onClick={handleShare}
                    variant="primary"
                    className="flex-1"
                  >
                    📱 Share
                  </Button>
                  <Button
                    onClick={handleDownload}
                    variant="secondary"
                    className="flex-1"
                  >
                    💾 Download
                  </Button>
                </div>

                {/* Social Share Buttons */}
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-3 font-medium">Or share directly to:</p>
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      onClick={() => shareToFacebook(`https://glowmatch.app?ref=${referralCode}`, shareTexts[selectedTextIndex])}
                      className="flex flex-col items-center gap-1 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                      title="Share to Facebook"
                    >
                      <span className="text-2xl">📘</span>
                      <span className="text-xs text-blue-700">Facebook</span>
                    </button>
                    <button
                      onClick={() => shareToTwitter(`https://glowmatch.app?ref=${referralCode}`, shareTexts[selectedTextIndex])}
                      className="flex flex-col items-center gap-1 p-3 rounded-lg bg-sky-50 hover:bg-sky-100 transition-colors"
                      title="Share to Twitter"
                    >
                      <span className="text-2xl">🐦</span>
                      <span className="text-xs text-sky-700">Twitter</span>
                    </button>
                    <button
                      onClick={() => shareToWhatsApp(shareTexts[selectedTextIndex], `https://glowmatch.app?ref=${referralCode}`)}
                      className="flex flex-col items-center gap-1 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors"
                      title="Share to WhatsApp"
                    >
                      <span className="text-2xl">💬</span>
                      <span className="text-xs text-green-700">WhatsApp</span>
                    </button>
                    <button
                      onClick={() => shareViaEmail('Check out my GlowMatch results!', shareTexts[selectedTextIndex], `https://glowmatch.app?ref=${referralCode}`)}
                      className="flex flex-col items-center gap-1 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                      title="Share via Email"
                    >
                      <span className="text-2xl">✉️</span>
                      <span className="text-xs text-gray-700">Email</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎨</div>
                <h3 className="text-xl font-bold mb-2">Choose a Card Style</h3>
                <p className="text-gray-600 mb-6">
                  Select a template above to generate your shareable card
                </p>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Share Text Options */}
        {(shareCard || beforeAfterCard) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <Card glass>
              <h3 className="font-bold text-lg mb-4">Choose Your Caption</h3>
              <div className="space-y-3">
                {shareTexts.map((text, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedTextIndex(idx)}
                    className={`
                      w-full text-left p-4 rounded-lg border-2 transition-all
                      ${selectedTextIndex === idx
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                      }
                    `}
                  >
                    <p className="text-sm">{text}</p>
                  </button>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Referral Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card glass>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-lg">Your Referral Link</h3>
              <Badge variant="success">Earn rewards!</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Invite friends and get 5 bonus try-ons for each friend who joins!
            </p>
            <div className="flex gap-2">
              <div className="flex-1 bg-gray-100 rounded-lg px-4 py-3 font-mono text-sm overflow-x-auto">
                glowmatch.app?ref={referralCode}
              </div>
              <Button
                onClick={handleCopyLink}
                variant={copied ? 'secondary' : 'primary'}
              >
                {copied ? '✓ Copied!' : '📋 Copy'}
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6"
        >
          <Card className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white">
            <h3 className="text-2xl font-bold mb-4">Share & Unlock Rewards!</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎁</span>
                <div>
                  <p className="font-semibold">Share once</p>
                  <p className="text-sm opacity-90">Get 5 bonus try-ons</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">👥</span>
                <div>
                  <p className="font-semibold">Refer 3 friends</p>
                  <p className="text-sm opacity-90">Unlock unlimited try-ons for a week</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">👑</span>
                <div>
                  <p className="font-semibold">Refer 10 friends</p>
                  <p className="text-sm opacity-90">Get 1 month of Premium free</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </Container>
    </div>
  )
}

export default ShareScreen
