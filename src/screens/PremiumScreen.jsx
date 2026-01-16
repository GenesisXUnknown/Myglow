import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container, Card, PageHeader, Button, Badge } from '../components/UI'
import useStore from '../store'

const features = [
  {
    icon: '🎨',
    title: 'Unlimited Virtual Try-Ons',
    description: 'Try on as many colors as you want without any limits'
  },
  {
    icon: '✨',
    title: 'Exclusive Makeup Looks',
    description: 'Access premium curated looks designed by professional makeup artists'
  },
  {
    icon: '🌈',
    title: 'Advanced Color Analysis',
    description: 'Get deeper insights into your color profile with extended analysis'
  },
  {
    icon: '💄',
    title: 'Product Recommendations',
    description: 'Personalized makeup product suggestions from top brands'
  },
  {
    icon: '📸',
    title: 'Multiple Photo Storage',
    description: 'Save and analyze multiple photos to track your color journey'
  },
  {
    icon: '👥',
    title: 'Share Your Looks',
    description: 'Share your favorite looks with friends and get their feedback'
  },
  {
    icon: '🎯',
    title: 'Seasonal Updates',
    description: 'Get new looks and recommendations every season'
  },
  {
    icon: '🆘',
    title: 'Priority Support',
    description: 'Get help from our color experts whenever you need it'
  }
]

const plans = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: 9.99,
    period: 'month',
    savings: null,
    popular: false
  },
  {
    id: 'yearly',
    name: 'Yearly',
    price: 79.99,
    period: 'year',
    savings: 'Save 33%',
    popular: true
  }
]

const PremiumScreen = () => {
  const navigate = useNavigate()
  const { isPremium, upgradeToPremium } = useStore()
  const [selectedPlan, setSelectedPlan] = useState('yearly')

  const handleUpgrade = () => {
    // In a real app, this would integrate with a payment processor
    upgradeToPremium()
    navigate('/profile')
  }

  if (isPremium) {
    return (
      <div className="min-h-screen pb-24">
        <Container className="py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <Card glass className="text-center py-12">
              <div className="text-7xl mb-6">✨</div>
              <h1 className="text-4xl font-bold gradient-text mb-4">
                You're Premium!
              </h1>
              <p className="text-gray-600 text-lg mb-8">
                Enjoy unlimited access to all GlowMatch features
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => navigate('/try-on')} variant="primary">
                  Try On Colors
                </Button>
                <Button onClick={() => navigate('/looks')} variant="secondary">
                  Browse Looks
                </Button>
              </div>
            </Card>
          </motion.div>
        </Container>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-24">
      <Container className="py-8">
        <PageHeader
          title="Upgrade to Premium"
          subtitle="Unlock the full GlowMatch experience"
        />

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="text-6xl mb-4">✨</div>
          <h2 className="text-3xl font-bold gradient-text mb-4">
            Elevate Your Beauty Journey
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get unlimited access to personalized color recommendations, exclusive looks, and advanced features
          </p>
        </motion.div>

        {/* Pricing Plans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge variant="success" className="px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <Card
                  glass={!plan.popular}
                  className={`
                    cursor-pointer border-2 transition-all
                    ${selectedPlan === plan.id
                      ? 'border-primary-500 bg-primary-50'
                      : plan.popular
                        ? 'border-primary-400 bg-gradient-to-br from-primary-50 to-secondary-50'
                        : 'border-gray-200'
                    }
                  `}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    {plan.savings && (
                      <Badge variant="success" className="mb-4">
                        {plan.savings}
                      </Badge>
                    )}
                    <div className="mb-6">
                      <span className="text-5xl font-bold gradient-text">
                        ${plan.price}
                      </span>
                      <span className="text-gray-600">/{plan.period}</span>
                    </div>
                    {selectedPlan === plan.id && (
                      <div className="flex items-center justify-center gap-2 text-primary-600 font-semibold">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Selected
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-center mb-8">
            Everything You Get
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.05 }}
              >
                <Card glass className="h-full text-center hover:scale-105 transition-transform">
                  <div className="text-4xl mb-3">{feature.icon}</div>
                  <h4 className="font-bold mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white text-center py-8">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Glow?
            </h3>
            <p className="text-lg opacity-90 mb-6">
              Join thousands of users who discovered their perfect colors
            </p>
            <div className="space-y-3">
              <Button
                onClick={handleUpgrade}
                variant="outline"
                className="bg-white text-primary-600 hover:bg-gray-50 text-lg px-8 py-4 w-full sm:w-auto"
              >
                Upgrade to Premium - ${plans.find(p => p.id === selectedPlan)?.price}/{plans.find(p => p.id === selectedPlan)?.period}
              </Button>
              <p className="text-sm opacity-75">
                Cancel anytime • 30-day money-back guarantee
              </p>
            </div>
          </Card>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 max-w-2xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-center mb-6">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            <Card glass>
              <h4 className="font-bold mb-2">Can I cancel anytime?</h4>
              <p className="text-gray-600 text-sm">
                Yes! You can cancel your subscription at any time. No questions asked.
              </p>
            </Card>
            <Card glass>
              <h4 className="font-bold mb-2">Is there a free trial?</h4>
              <p className="text-gray-600 text-sm">
                You get 5 free virtual try-ons to test the app. Premium unlocks unlimited access.
              </p>
            </Card>
            <Card glass>
              <h4 className="font-bold mb-2">What payment methods do you accept?</h4>
              <p className="text-gray-600 text-sm">
                We accept all major credit cards, PayPal, and Apple Pay.
              </p>
            </Card>
          </div>
        </motion.div>
      </Container>
    </div>
  )
}

export default PremiumScreen
