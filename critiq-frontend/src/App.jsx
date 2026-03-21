import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import MovieDetail from './pages/MovieDetail'
import Search from './pages/Search'
import Discover from './pages/Discover'
import DubbingDemo from './pages/DubbingDemo'
import TrailerTranslation from './pages/TrailerTranslation'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-critiq-dark">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/discover/:section" element={<Discover />} />
          <Route path="/dubbing-demo" element={<DubbingDemo />} />
          <Route path="/trailer-translation" element={<TrailerTranslation />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
