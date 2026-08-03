import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { initTracker } from './tracker'
import './index.css'

import Navigation from './components/Navigation'
import Footer from './components/Footer'
import GhibliCompanion from './components/GhibliCompanion'
import Home from './pages/Home'
import About from './pages/About'
import Blog from './pages/Blog'

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('/data.json')
      .then(r => r.json())
      .then(d => {
        setData(d)
        if (d.tracker) initTracker(d.tracker)
        if (d.personal?.avatar) {
          const link = document.querySelector("link[rel~='icon']")
          if (link) link.href = d.personal.avatar
        }
      })
      .catch(console.error)
  }, [])

  if (!data) return null

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
        <GhibliCompanion />
        <Navigation />
        
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home data={data} />} />
            <Route path="/about" element={<About data={data} />} />
            <Route path="/blog" element={<Blog data={data} />} />
          </Routes>
        </div>

        <Footer personal={data.personal} />
      </div>
    </Router>
  )
}

export default App
