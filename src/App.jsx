import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import HomeScreen from './screens/HomeScreen'
import AnalyzeScreen from './screens/AnalyzeScreen'
import ResultsScreen from './screens/ResultsScreen'
import TryOnScreen from './screens/TryOnScreen'
import LooksScreen from './screens/LooksScreen'
import ProfileScreen from './screens/ProfileScreen'
import PremiumScreen from './screens/PremiumScreen'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 pb-20">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/analyze" element={<AnalyzeScreen />} />
          <Route path="/results" element={<ResultsScreen />} />
          <Route path="/try-on" element={<TryOnScreen />} />
          <Route path="/looks" element={<LooksScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/premium" element={<PremiumScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  )
}

export default App
