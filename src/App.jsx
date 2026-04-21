import { Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import BackBar from './components/BackBar'
import Home from './pages/Home'
import AI from './pages/AI'
import Resources from './pages/Resources'
import Services from './pages/Services'
import About from './pages/About'

function Layout({ children }) {
  const { pathname } = useLocation()
  const hasBack = pathname !== '/'
  return (
    <div style={{ paddingTop: hasBack ? 98 : 60 }}>
      {children}
    </div>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <BackBar />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ai" element={<AI />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </>
  )
}
