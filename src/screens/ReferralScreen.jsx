import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Container, Button, Card, PageHeader, Badge } from '../components/UI'
import useStore from '../store'
import { copyShareLink } from '../utils/sharing'

const ReferralScreen = () => {
  const { referralCode, generateReferralCode, referralCount, achievements } = useStore()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!referralCode) {
      generateReferralCode()
    }
  }, [referralCode, generateReferralCode])

  const handleCopy = async () => {
    const success = await copyShareLink(referralCode)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const rewards = [
    { count: 1, reward: '5 bonus try-ons', unlocked: referralCount >= 1 },
    { count: 3, reward: '1 week premium free', unlocked: referralCount >= 3 },
    { count: 5, reward: '2 weeks premium free', unlocked: referralCount >= 5 },
    { count: 10, reward: '1 month premium free', unlocked: referralCount >= 10 }
  ]

  return (
    <div className="min-h-screen pb-24">
      <Container className="py-8">
        <PageHeader
          title="Invite Friends"
          subtitle="Share GlowMatch and earn rewards"
        />

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white text-center py-8">
            <div className="text-6xl mb-4">👥</div>
            <div className="text-5xl font-bold mb-2">{referralCount}</div>
            <p className="text-lg opacity-90">Friends Referred</p>
          </Card>
        </motion.div>

        {/* Referral Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card glass>
            <h3 className="font-bold text-lg mb-4">Your Referral Link</h3>
            <div className="flex gap-2 mb-4">
              <div className="flex-1 bg-gray-100 rounded-lg px-4 py-3 font-mono text-sm overflow-x-auto">
                https://glowmatch.app?ref={referralCode}
              </div>
              <Button onClick={handleCopy} variant={copied ? 'secondary' : 'primary'}>
                {copied ? '✓' : '📋'}
              </Button>
            </div>
            <p className="text-sm text-gray-600">
              Share this link with friends. When they sign up, you both get rewarded!
            </p>
          </Card>
        </motion.div>

        {/* Rewards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h3 className="text-2xl font-bold mb-4">Referral Rewards</h3>
          <div className="space-y-3">
            {rewards.map((r, idx) => (
              <Card key={idx} glass className={r.unlocked ? 'border-2 border-green-500' : ''}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{r.unlocked ? '✅' : '🎁'}</div>
                    <div>
                      <p className="font-bold">Refer {r.count} friend{r.count > 1 ? 's' : ''}</p>
                      <p className="text-sm text-gray-600">{r.reward}</p>
                    </div>
                  </div>
                  {r.unlocked && <Badge variant="success">Unlocked!</Badge>}
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* How it Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card glass>
            <h3 className="font-bold text-lg mb-4">How It Works</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="text-2xl">1️⃣</span>
                <div>
                  <p className="font-semibold">Share your link</p>
                  <p className="text-sm text-gray-600">Send your referral link to friends via social media, text, or email</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">2️⃣</span>
                <div>
                  <p className="font-semibold">They join GlowMatch</p>
                  <p className="text-sm text-gray-600">When they sign up using your link, they get a bonus too!</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">3️⃣</span>
                <div>
                  <p className="font-semibold">You both get rewards</p>
                  <p className="text-sm text-gray-600">Earn bonus try-ons and premium access as you refer more friends</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </Container>
    </div>
  )
}

export default ReferralScreen
