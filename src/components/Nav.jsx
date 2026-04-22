import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styles from './Nav.module.css'

const links = [
  { to: '/', label: '首页' },
  { to: '/ai', label: 'AI 咨询' },
  { to: '/resources', label: '资讯中心' },
  { to: '/services', label: '服务指南' },
  { to: '/about', label: '关于我们' },
]

export default function Nav() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav className={styles.nav}>
        <Link to="/" className={styles.logo}>
          <div className={styles.logoMark}>+</div>
          <div>
            <div className={styles.logoName}>Medical Travel to China</div>
            <div className={styles.logoSub}>CONCIERGE SERVICE</div>
          </div>
        </Link>

        <ul className={styles.links}>
          {links.map(l => (
            <li key={l.to}>
              <Link to={l.to} className={`${styles.link} ${pathname === l.to ? styles.active : ''}`}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link to="/ai" className={`${styles.cta} ${styles.ctaDesktop}`}>免费 AI 咨询 →</Link>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
          aria-expanded={menuOpen}
        >
          <span className={`${styles.bar} ${menuOpen ? styles.barTop : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barMid : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barBot : ''}`} />
        </button>
      </nav>

      {/* Mobile drawer overlay */}
      {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)} />}

      <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`}>
        <ul className={styles.drawerLinks}>
          {links.map(l => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={`${styles.drawerLink} ${pathname === l.to ? styles.drawerActive : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/ai" className={styles.drawerCta} onClick={() => setMenuOpen(false)}>
          免费 AI 咨询 →
        </Link>
      </div>
    </>
  )
}
