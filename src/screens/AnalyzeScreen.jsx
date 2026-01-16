import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Container, Button, Card, PageHeader, LoadingSpinner, ProgressBar } from '../components/UI'
import { analyzeImage } from '../utils/colorAnalysis'
import useStore from '../store'

const AnalyzeScreen = () => {
  const navigate = useNavigate()
  const { setCurrentSeason, setUserPhoto } = useStore()

  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      setError(null)

      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAnalyze = async () => {
    if (!selectedImage || !imagePreview) return

    setAnalyzing(true)
    setProgress(0)
    setError(null)

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      // Perform analysis
      const result = await analyzeImage(imagePreview)

      clearInterval(progressInterval)
      setProgress(100)

      // Save results
      setCurrentSeason(result.season)
      setUserPhoto(imagePreview)

      // Navigate to results
      setTimeout(() => {
        navigate('/results')
      }, 500)
    } catch (err) {
      setError(err.message || 'Failed to analyze image. Please try again.')
      setAnalyzing(false)
      setProgress(0)
    }
  }

  const tips = [
    'Use natural lighting for best results',
    'Face the camera directly',
    'Remove any makeup if possible',
    'Show your face clearly without shadows',
    'Avoid filters or heavy editing'
  ]

  return (
    <div className="min-h-screen pb-24">
      <Container className="py-8">
        <PageHeader
          title="Analyze Your Colors"
          subtitle="Upload a selfie to discover your seasonal color type"
        />

        <div className="max-w-2xl mx-auto">
          {/* Upload Section */}
          <Card glass className="mb-6">
            <AnimatePresence mode="wait">
              {!imagePreview ? (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12"
                >
                  <div className="text-6xl mb-4">📸</div>
                  <h3 className="text-xl font-bold mb-2">Upload Your Selfie</h3>
                  <p className="text-gray-600 mb-6">
                    Choose a clear photo of your face in natural lighting
                  </p>

                  <label htmlFor="image-upload">
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                    <Button variant="primary" as="span" className="cursor-pointer">
                      Choose Photo
                    </Button>
                  </label>
                </motion.div>
              ) : (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full rounded-lg mb-4"
                    />
                    {!analyzing && (
                      <button
                        onClick={() => {
                          setImagePreview(null)
                          setSelectedImage(null)
                          setError(null)
                        }}
                        className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {analyzing && (
                    <div className="space-y-4">
                      <div className="text-center">
                        <LoadingSpinner size="lg" className="mx-auto mb-4" />
                        <p className="text-gray-600 font-medium">Analyzing your colors...</p>
                      </div>
                      <ProgressBar progress={progress} />
                    </div>
                  )}

                  {!analyzing && (
                    <Button
                      onClick={handleAnalyze}
                      variant="primary"
                      className="w-full"
                    >
                      Analyze My Colors
                    </Button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
              >
                {error}
              </motion.div>
            )}
          </Card>

          {/* Tips */}
          <Card glass>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span>💡</span>
              Tips for Best Results
            </h3>
            <ul className="space-y-2">
              {tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-primary-500 font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Container>
    </div>
  )
}

export default AnalyzeScreen
